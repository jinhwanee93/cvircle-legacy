import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Tabs, Tab, Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import DropZone from "./Dropzone.jsx"
import request from 'superagent';


class myPictureCar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            direction: null,
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    // onDrop(acceptedFiles, rejectedFiles) {
    //   console.log('Accepted files: ', acceptedFiles);
    //   console.log('Rejected files: ', rejectedFiles);

    //     let upload = request.post('https://api.cloudinary.com/v1_1/ddcrxxkge/image/upload')
    //         .field('upload_preset', "ebu1olsj")
    //         .field('file', acceptedFiles[0])

    //     upload.end((err,response) => {
    //         if(err){
    //             console.error(err)
    //         } else {
    //             console.log(response)
    //         }
    //     })

  handleSelect(selectedIndex, e) {
 
    this.setState({
      index: selectedIndex,
      direction: e.direction
    })
  }

// componentDidMount (){
//     console.log("mounted")
//     var picdata = {
//         itinID: this.props.locationBeforeTransitions.query.itinID,
//       }
//     axios.get('/pictures', {params : {picdata}})
//         .then((result) => {
//             this.setState({
//                 pictures: result.data
//             })
//           })
        
//         .catch((err) => {
//           console.log(err)
//         })
// }
 

render() {
// console.log(this.props.locationBeforeTransitions.query.itinID, "this is ITINID")
// console.log(this.state.pictures, "this is state pictures!")
console.log(this.props.pictures, "this is picture array!!!!")
    return (
          <div>
 <Carousel activeIndex={this.state.index} direction={this.props.direction} onSelect={this.handleSelect}>
         {this.props.pictures.length ?
         (this.props.pictures.map((picture, i) => (
        <Carousel.Item>
          <img width="225" height="125" alt="225x125" src={ picture.url }/>
          {/*<Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>*/}
        </Carousel.Item>))):
        <div style={{ 'margin': 'auto' }} className="text-center">No pictures yet!</div>
        }
        
         </Carousel>
      </div>

    )
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

export default myPictureCar = connect(mapStateToProps)(myPictureCar)
