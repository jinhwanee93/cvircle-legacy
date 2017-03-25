import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { NavBarContainer } from '../../containers'
import { Parallax, Background } from 'react-parallax';
import { Col, Grid, Row } from 'react-bootstrap';

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin()    
  }

  render() {
    return (
      <div style={{"marginTop": '29px'}}>
        <Parallax className="parallax-bg-image" bgImage="./images/25806094933_c023fe0036_h.jpg" strength={600}>        
          <div style={{ width: 800, height: 300 }}>
            <Image style={{margin: 'auto', height: 190, width: 680 }} src='./images/cvrcle.png' />
            <div className="parallax-content1 typewriter">
              <h4 style={{ fontWeight: 300, fontSize: 50 }}> Where is your next adventure? </h4>
            </div>
          </div>
        </Parallax>

        <div className="container" style={{ marginTop: 40, marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 40 }}>
            <h3>Crowdsourced Travel Planning </h3>
          </div>
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 40 }}></div>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200 }}> Step 1 </h3>
                  <h4>Create a circle for your itinerary.</h4>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200 }}> Step 2 </h3>
                  <h4>Your circle can contribute to your trip.</h4>
                </div>
              </Col>
              <Col xsHidden md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200 }}> Step 3 </h3>
                  <h4>Have Fun!</h4>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <Parallax className="parallax-bg-image2" bgImage="./images/21689775811_446ed525c0_k.jpg" strength={600}>
          <Col xs={6} md={4}>
            <div style={{ width: 600, height: 500 }}></div>
          </Col>
        </Parallax>

        <div className="container" style={{ marginTop: 40, marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 40 }}>
            <h3>Meet Team Megazord</h3>
          </div>
            <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 40 }}></div>
          <Grid>
            <Row>
              <Col xs={6} md={3}>
                <Image src='https://media.giphy.com/media/kKdgdeuO2M08M/giphy.gif' className="img-circle" />
                <div style={ {textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200}}> Alexandre Kim </h3>
                  <h4>Scrum Lord</h4>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <Image src='http://www.media2.hw-static.com/wp-content/uploads/55025796.jpg' className="img-circle" />
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200}}> Brandon Kleiman </h3>
                  <h4>ex: Scrum Lord</h4>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <Image src='https://m.popkey.co/f03682/MMjqz.gif' className="img-circle" />
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200}}> Sandra Henkel </h3>
                  <h4>Product Owner</h4>
                </div>
              </Col>
              <Col xsHidden md={3}>
                <Image src='https://s-media-cache-ak0.pinimg.com/736x/51/68/59/51685923aaa5e1ae7d0e80ae737befd5.jpg' className="img-circle" />
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 200}}> Emily Yang </h3>
                  <h4>"The Matchy Matchy"</h4>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired,
  checkLogin: React.PropTypes.func.isRequired,
  searchterm: React.PropTypes.func.isRequired
}

export default Landing
