import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import Navbar from '../components/navbar.jsx';
import {Card} from 'semantic-ui-react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router'

class Logout extends Component {
  constructor() {
    super();

    this.state = {
      itins: []
    }

    this.getUserItineraries = this.getUserItineraries.bind(this);

    //using this fake data until redux state is ready
    this.fakeReduxStateUserId = 1;
  }

  componentDidMount() {
    this.getUserItineraries();
  }

  getUserItineraries() {
    axios.get('http://localhost:3000/itineraries?ownerID='+this.fakeReduxStateUserId)
      .then((res) => this.setState({ itins: res.data } ))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="itin-container">
          {this.state.itins ? this.state.itins.map((itin) => {
            return <Card color="teal" href={`/#/itinerary?itinID=${itin.id}`}>
                <Card.Header>{itin.itinName}</Card.Header>
                <Card.Content extra>Created: {itin.created_at.substring(0, 10)}</Card.Content>
              </Card>
          }) : ""}
        </div>
      </div>
    );
  }
}

export default Logout