import React, { Component } from 'react'
import { Navbar, NavbarHeader, FormGroup, FormControl, Button, Nav } from 'react-bootstrap'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// props passed down from redux store

const NavBar = ({ isAuthenticated, onLoginClick, onLogoutClick, handleSearch, searchterm, handleSearchInput }) => {
  return (
  <div>
    <Navbar>
      <Navbar.Header>
        <Link to='/home'>
          <Image className="cvrcle-logo-icon" src='./images/cvrcle-logo-icon.png' />
        </Link>
      </Navbar.Header>
      <Nav>
        <form onSubmit={() => handleSearch(searchterm)}>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" onChange={handleSearchInput} />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
          </form>
          </Nav>
          <Nav>
        {!isAuthenticated
          ? (<button onClick={onLoginClick} className="navbar-links">Login</button>)
          : (<button onClick={onLogoutClick} className="navbar-links">Logout</button>)}
      </Nav>
    </Navbar>
  </div >
  )
}

NavBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired,
  handleSearch: React.PropTypes.func.isRequired,
  handleSearchInput: React.PropTypes.func.isRequired,
  searchterm: React.PropTypes.func.isRequired
}

export default NavBar
