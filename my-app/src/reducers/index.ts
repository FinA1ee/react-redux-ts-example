/*
 * @file: file description
 * @author: your name
 * @Date: 2021-11-24 18:53:26
 * @LastEditors: your name
 * @LastEditTime: 2021-11-24 18:53:44
 */
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoAppReducers = combineReducers({
  todos,
  visibilityFilter
})

export default todoAppReducers;