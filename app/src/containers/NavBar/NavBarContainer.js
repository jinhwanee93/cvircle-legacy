import { connect } from 'react-redux'
import { loginRequest, logoutSuccess, handleSearch, handleSearchInput } from '../../actions/auth'
import { NavBar } from '../../components'
import { hashHistory } from 'react-router'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error, searchterm } = state.auth
  console.log(searchterm)
  console.log('&&&&&&&')
  return {
    isAuthenticated,
    profile,
    error,
    searchterm
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
    }
  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer