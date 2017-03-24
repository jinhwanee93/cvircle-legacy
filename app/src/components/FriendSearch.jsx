import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class FriendSearch extends React.Component {
    constructor(props) {
    super(props)
      this.searchFriend = this.searchFriend.bind(this);
    }

searchFriend() {
    axios.get('localhost:3000/FriendSearch')
    .then(data => {
        this.setState({
            searchFriends: data 
        })
    })
}

  render() {
      return (
        <div>
            <input type='search' placeholder='Search Friends'/>
            <button onSubmit={this.searchFriend} type='submit'>Submit</button>
        </div>
      )
  }
}

export default FriendSearch;
