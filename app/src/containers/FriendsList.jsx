import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FriendEntry from '../components/FriendEntry.jsx';
import FriendSearch from '../components/FriendSearch.jsx';

class FriendsList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        arr: []
    }
}

componentWillReceiveProps() {
    axios.get(`/friends?userid=${this.props.myID}`)
      .then((res) => {
          this.setState({
              arr: res.data
          })
      })
}

render() {
    console.log(this.state.arr)
    return(
        <div className='friendsList'>
            <div>
              <h3>Friends</h3>
              <FriendSearch />
            </div>
            {this.state.arr.map((friend) => (<FriendEntry ffn={friend.ffn} fln={friend.fln} />))}
        </div>
    )
}
}

export default FriendsList;