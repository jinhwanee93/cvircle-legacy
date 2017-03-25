import * as ActionTypes from '../actions/auth'
import AuthService from '../utils/AuthService'
import { routerReducer as routing } from 'react-router-redux'

export default function authReducer (state = {
  isAuthenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null,
  isLoading: false,
  results: [],
  value: '',
  options: [
    // {
    //   'title': 'Italy',
    //   'description': 'Brandon Kleiman',
    //   'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14021723_10207010275563552_2418957582891831120_n.jpg?oh=a275a34601ddbe83c0a5a5e362ee7e14&oe=5961E92E',
    //   'price': '$8.00'
    // }
  ]
}, action) {
  switch (action.type) {
    case ActionTypes.SEARCH_INPUT:
      return {...state, searchterm: action.input}
    case ActionTypes.LOGIN_REQUEST:
      return {...state, isFetching: true, error: null}
    case ActionTypes.LOAD_ITINS:
      return {...state, isLoading: false, options: action.options}
    case ActionTypes.IS_LOADING:
      return {...state, isLoading: true, value: action.value}
    case ActionTypes.DONE_LOADING:
      return {...state, isLoading: false, results: action.results}
    case ActionTypes.LOGIN_SUCCESS:
      return {...state, isFetching: false, isAuthenticated: true, profile: action.profile}
    case ActionTypes.LOGIN_ERROR:
      return {...state, isFetching: false, isAuthenticated: false, profile: {}, error: action.error}
    case ActionTypes.LOGOUT_SUCCESS:
      return {...state, isAuthenticated: false, profile: {}}
    default:
      return state
  }
}
