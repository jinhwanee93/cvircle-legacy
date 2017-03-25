import { hashHistory } from 'react-router'
import AuthService from '../utils/AuthService'
import _ from 'lodash'
import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const SEARCH_INPUT = 'SEARCH_INPUT'
export const RESET_COMPONENT = 'RESET_COMPONENT'
export const IS_LOADING = 'IS_LOADING'
export const DONE_LOADING = 'DONE_LOADING'
export const RESULT_SELECT = 'RESULT_SELECT'
export const LOAD_ITINS = 'LOAD_ITINS'

// AUTH0_CLIENT_ID=qpfelAKW1EAzyb3RI3pk46SD0deXrJhE
// AUTH0_CLIENT_SECRET=_pps_7k9PizjlAYup6vI6pUqL2NhSNsttwUQ_F64FwPfSqhLUZXV17I-ocLRpAI9
// AUTH0_DOMAIN=cvrcle.auth0.com

const authService = new AuthService('qs5HxWaqQML5N0AckWPuigC490f0R0Q3', 'yangemilym.auth0.com')

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin () {
  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { return dispatch(loginError(error)) }
        AuthService.setToken(authResult.idToken) // static method
        AuthService.setProfile(profile) // static method
        return dispatch(loginSuccess(profile))
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', (error) => dispatch(loginError(error)))
  }
}

export function loginRequest () {
  authService.login()
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess (profile) {
  hashHistory.push('/home')
  location.reload()
  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

export function loginError (error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}
export function handleSearch (term) {
  console.log(term)
  console.log('auth.js 60')
  return {
    type: SEARCH_RESULTS,
    term
  }
}
export function handleSearchInput (input) {
  return {
    type: SEARCH_INPUT,
    input
  }
}
export function resetComponent () {
  return {
    type: RESET_COMPONENT,
    isLoading: false,
    results: [],
    value: ''
  }
}
export function handleResultSelect (result) {
  window.location.href = '/#/itinerary?itinID=' + result.id
  return {
    type: RESULT_SELECT,
    value: result.title
  }
}

export function loadingTrue (val) {
  return {
    type: IS_LOADING,
    value: val
  }
}
export function doneLoadingAndFilter (results) {
  return {
    type: DONE_LOADING,
    results
  }
}

export function handleSearchChange (value, opts) {
  return (dispatch) => {
    dispatch(loadingTrue())
    var source = []
    for (var i = 0; i < opts.length; i++) {
      var tmp = {
        description: opts[i].description,
        image: opts[i].image,
        price: opts[i].price,
        title: opts[i].title,
        id: opts[i].id
      }
      source.push(tmp)
    }
    console.log(source)
    console.log('value:', value)
    setTimeout(() => {
      if (value.length < 1) {
        dispatch(resetComponent())
      }
      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = (result) => re.test(result.title)
      var filteredResults = _.filter(source, isMatch)
      dispatch(doneLoadingAndFilter(filteredResults))
    }, 500)
  }
}
export function updateItins (itins) {
  return {
    type: LOAD_ITINS,
    options: itins
  }
}

export function loadItinsAction () {
  return (dispatch) => {
    dispatch(loadingTrue(''))
    axios.get('/itinsByUser')
      .then((result) => {
        console.log(result)
        console.log('_______')
        var fmtItins = []
        for (var i = 0; i < result.data.length; i++) {
          var tmp = {
            description: result.data[i].firstname + ' ' + result.data[i].lastName,
            image: result.data[i].email,
            price: '',
            title: result.data[i].itinName,
            id: result.data[i].id
          }
          fmtItins.push(tmp);
        }
        dispatch(updateItins(fmtItins))
      })
  }
}
export function logoutSuccess () {
  authService.logout()
  return {
    type: LOGOUT_SUCCESS
  }
}
