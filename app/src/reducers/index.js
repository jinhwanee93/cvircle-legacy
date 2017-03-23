import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import messages from './chatreducers.jsx';

const rootReducer = combineReducers({
  routing,
  auth,
  messages
})

export default rootReducer;