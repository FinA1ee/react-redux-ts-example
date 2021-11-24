/*
 * @Author: your name
 * @Date: 2021-11-24 18:40:04
 * @LastEditTime: 2021-11-24 18:44:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /react-redux-ts-example/my-app/src/common/configStore.ts
 */
import { createStore, applyMiddleware, compose, StoreEnhancerStoreCreator } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { promiseMiddleware } from '@tkit/model';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import history from './history';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [promiseMiddleware, sagaMiddleware, routerMiddleware(history)];

let devToolsExtension: undefined | StoreEnhancerStoreCreator;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { createLogger } = require('redux-logger');

  // const logger = createLogger({ collapsed: true });
  // middlewares.push(logger);

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
  }
}

export type TRootState = ReturnType<typeof configureStore>;

export default function configureStore<S extends {}>(initialState: S) {
  const mids = applyMiddleware(...middlewares);
  const store = createStore(
    rootReducer,
    initialState,
    devToolsExtension ? compose(mids, devToolsExtension) : mids
  );

  sagaMiddleware.run(rootSaga);

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
