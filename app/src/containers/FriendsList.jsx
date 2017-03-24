import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendEntry from '../components/FriendEntry.jsx';

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
              <h1>Friends</h1>
            </div>
            {this.state.arr.map(() => (<FriendEntry />))}
        </div>
    )
}
}

export default FriendsList;