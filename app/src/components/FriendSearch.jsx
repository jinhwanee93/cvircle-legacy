import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FriendSearch extends React.Component {
    constructor(props) {
    super(props)
      this.state = {
        value: '',
        showModal: false,
        searchedFriends: '',
        addFriend: ''
      }
      this.searchFriend = this.searchFriend.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.close = this.close.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.addFriend = this.addFriend.bind(this);
    }

 close() {
    this.setState({showModal: false});
  }

searchFriend() {
    this.setState({
        showModal: true
    })
    const self = this;
    var names = self.state.value.split(' ');
    var firstName = names[0]
    var lastName = names[1] || '';
    axios.get(`/friendSearch?firstName=${firstName}&lastName=${lastName}`)
    .then(result => {
        console.log("what is result? ", result.data)
        this.setState({
            searchedFriends: result.data
        })
    })
}

handleChange(e) {
    const self = this;
    console.log(`what is this? ${self.state.value}`)
    self.setState({
        value: e.target.value
    })
}

toggleModal() {
    this.setState({
      showModal: true
    })
}

addFriend() {
    this.setState({
      addFriend: this.state.searchedFriends
    })
}

  render() {
      console.log(this.state.showModal);
      console.log(this.state.addFriend);
      return (
        <div>
        <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header>Searched Friends</Modal.Header>
            <Modal.Body>
            <form>
                {this.state.searchedFriends ? (this.state.searchedFriends.map(item => (<div style={{ cursor: 'pointer'}} onClick={this.addFriend}>{item.firstName} {item.lastName}</div>))) : (<div>NOPE</div>)}
            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button 
                className="btn btn-primary" 
                onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
            
            <form onSubmit={this.searchFriend}>
            <input type='search' placeholder='Search for Friends' onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
            </form>
        </div>
      )
  }
}

export default FriendSearch;
