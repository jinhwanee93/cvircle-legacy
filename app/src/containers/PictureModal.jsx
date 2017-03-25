import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import DropZone from "./Dropzone.jsx"
import PictureCar from "./PictureCar.jsx"

const qs = require('qs');

class PictureModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      formTitle: "",
      formAuthor: "",
      formBody: "",
      address: '',
      contributorID: '',
    }
  //   // function binds
    this.close = this.close.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getQueryParams = this.getQueryParams.bind(this);

    this.itinID = Number(this.getQueryParams('itinID'));
  }

  close() {
    this.setState({showModal: false}, () => {
      this.props.resetFlag();
    });
  }
  
  getQueryParams(param) {
    var query = window.location.hash.substring(1);
    var vars = query.split("?");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == param){return pair[1];}
    }
    return(false);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      console.log('asdf')
      var userdata = {
        firstName: this.props.profile.given_name,
        lastName: this.props.profile.family_name,
        fbID: this.props.profile.third_party_id,
      }
      axios.get(`http://localhost:3000/users`, {params : {userdata} })
        .then((res) => {
          console.log('asdfasdfasdfasdfasdf')
          let tmp = res.data[0]["id"]
          console.log('asd f')
          console.log(res.data);
          this.setState({
            contributorID: tmp
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  handleInputchange(e) {
    const name = e.target.name;
    const val = e.target.value;
    
    const obj = {};
    obj[name] = val;
    this.setState((prevState, props) => {
      return obj;
    });
  }

  // functions for location search bar
  onChange = (address) => {
    this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const { address } = { address: this.state.address }

    this.close();
  }

  render() {

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>Picture Time!</Modal.Header>
        <Modal.Body>

      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="View Pictures">View Pictures
          <div>
            <PictureCar/>
            </div>
        </Tab>

        <Tab eventKey={2} title="Upload Pictures">
          <div>
            <DropZone/>
          </div>
          </Tab>

      </Tabs>
        </Modal.Body>
        <Modal.Footer>
          {/*<Button 
            className="btn btn-primary" 
            onClick={this.handleFormSubmit}
          >Save</Button>*/}
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  return {
    isAuthenticated,
    profile
  }
}

export default PictureModal = connect(mapStateToProps)(PictureModal)



