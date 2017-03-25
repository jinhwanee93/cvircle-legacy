import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class myDropzone extends Component {
    constructor (props) {
        super(props)
        this.state = {
            files: []
        }
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
        //  axios
        //     .post('/pictures')
        //     .then((response) => {
        //       locationToDatabase.id = response.data.id;
        //       this.props.newEntryAdded(locationToDatabase);
        //     })
        //     .catch((err) => {
        //       if (err) {console.log(err)}
        //     })

        //     console.log(acceptedFiles[0].preview, "this is file")
        //     console.log(JSON.parse(acceptedFiles[0].preview), "this is file parse")
        // console.log('this.state', this.state)
        // this.setState({
        //     files: this.state.files.concat(acceptedFiles[0])
        // })
        // axios.post('/pictures', {
        //     file: acceptedFiles[0]
            
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });


        let upload = request.post('https://api.cloudinary.com/v1_1/ddcrxxkge/image/upload')
            .field('upload_preset', "ebu1olsj")
            .field('file', acceptedFiles[0])

        upload.end((err,response) => {
            if(err){
                console.error(err)
            } else {
                console.log(response.body.secure_url)
            axios
            .post('/pictures', {
                picItinID: this.props.locationBeforeTransitions.query.itinID,
                picUserID: this.props.profile.third_party_id,
                url: response.body.secure_url
            })
            .then((response) => {
              console.log(response.data, "is this a obj?")
              this.props.addPic(response.data)

            })
            .catch((err) => {
              if (err) {console.log(err)}
            })

            }
        })
    }


render() {
    console.log(this.props.profile, "this is profile")
    console.log(this.props.locationBeforeTransitions.query.itinID, "this is query")


    return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {/*<div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>*/}
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  const { locationBeforeTransitions} = state.routing
  
  return {
    isAuthenticated,
    profile,
    locationBeforeTransitions
  }
}

export default myDropzone = connect(mapStateToProps)(myDropzone)
