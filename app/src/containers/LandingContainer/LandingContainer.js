import { connect } from 'react-redux'
import { loginRequest, logoutSuccess, handleSearch, handleSearchInput } from '../../actions/auth'
import { Landing } from '../../components'
import { hashHistory } from 'react-router'
import { checkLogin } from '../../actions/auth'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error, searchInput } = state.auth
  return {
    isAuthenticated,
    profile,
    error,
    searchInput
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
    handleSearch: () => {
      console.log(this.props.searchInput, "this is line 27 landing container")
      dispatch(handleSearch())
    },
    handleSearchInput: (e) => {
      console.log("tag")
      console.log(e);
      console.log(this.props);
      dispatch(handleSearchInput(e.target.value))
    },
    checkLogin: () => {
      dispatch(checkLogin())}
  }
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default LandingContainer
