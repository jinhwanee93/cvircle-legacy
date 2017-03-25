import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendEntry from '../components/FriendEntry.jsx';
import FriendSearch from '../components/FriendSearch.jsx';

class FriendsList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        arr: [1, 2, 3, 4],
    }
}
render() {
    return(
        <div>
            <div>
              <h3>Your Friends</h3>
              <FriendSearch />
            </div>
            {this.state.arr.map(() => (<FriendEntry />))}
        </div>
    )
}
}

export default FriendsList;