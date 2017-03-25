import { connect } from 'react-redux'
import { loginRequest, logoutSuccess, loadItinsAction, handleResultSelect, resetComponent, handleSearchChange, handleSearch, handleSearchInput } from '../../actions/auth'
import { NavBar } from '../../components'
import { hashHistory } from 'react-router'


const mapStateToProps = (state) => {
  const { isAuthenticated, results, profile, options, error, searchterm } = state.auth
  return {
    isAuthenticated,
    profile,
    error,
    results,
    searchterm,
    options
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => {
      dispatch(loginRequest())
    },
    onLogoutClick: () => {
      dispatch(logoutSuccess())
      hashHistory.push('/')
      location.reload()
    },
    handleSearch: (term) => {
      dispatch(handleSearch(term))
    },
    handleSearchInput: (e) => {
      console.log(e.target.value)
      dispatch(handleSearchInput(e.target.value))
    },
    resetComponent: () => {

      dispatch(resetComponent())
    },
    loadItins: (options) => {
      if (options.length === 0) {
        dispatch(loadItinsAction())
      }
    },
    handleResultSelect: (e, result) => {
      dispatch(handleResultSelect(result))
    },

    handleSearchChange: (opts, e, value) => {
      dispatch(handleSearchChange(value, opts))
    }
  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer
