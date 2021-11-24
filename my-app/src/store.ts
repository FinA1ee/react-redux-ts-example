import configureStore from './common/configStore';

export function createStore<S extends {}>(store: S) {
  return configureStore(store);
}
export default configureStore({});
