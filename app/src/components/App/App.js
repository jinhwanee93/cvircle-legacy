import React from 'react'
import { NavBarContainer } from '../../containers'

// default view for the app
// see /src/routes for routes for this.props.children

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  render() {
    return(
      // navbar persists throughout the whole app
      <div>
        <NavBarContainer />
        {this.props.children}
      </div>
    )
  }
}

// Type check
App.propTypes = {
  children: React.PropTypes.element.isRequired,
  checkLogin: React.PropTypes.func.isRequired
}

export default App
