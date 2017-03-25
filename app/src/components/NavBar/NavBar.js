import React, { Component } from 'react'
import { Navbar, NavbarHeader, FormGroup, FormControl, Button, Nav } from 'react-bootstrap'
import { Image, Search, Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import faker from 'faker'
import _ from 'lodash'
// props passed down from redux store



const NavBar = ({ isAuthenticated, onLoginClick, onLogoutClick, loadItins, handleSearch, searchterm, options, handleSearchInput, isLoading, handleResultSelect, handleSearchChange, results, value, source }) => {
  handleSearchChange = handleSearchChange.bind(this, options)
  loadItins = loadItins.bind(this, options)
  loadItins()
  return (
  <div>
    <Navbar>
      <Navbar.Header>
        <Link to='/home'>
          <Image className="cvrcle-logo-icon" src='./images/cvrcle-logo-icon.png' />
        </Link>
      </Navbar.Header>
          <Nav>
        {!isAuthenticated
          ? (<button onClick={onLoginClick} className="navbar-links">Login</button>)
          : (<button onClick={onLogoutClick} className="navbar-links">Logout</button>)}
      </Nav>
      <Nav>
        <Grid>
          <Grid.Column width={8}>
            <Search
              loading={isLoading}
              onResultSelect={handleResultSelect}
              onSearchChange={handleSearchChange}
              results={results}
              value={value}
            />
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid>
      </Nav>
    </Navbar>
  </div>
  )
}

NavBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired,
  handleSearch: React.PropTypes.func.isRequired,
  handleSearchInput: React.PropTypes.func.isRequired,
  searchterm: React.PropTypes.func.isRequired,
  results: React.PropTypes.func.isRequired
}

export default NavBar
