import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from '../actions/chatindex.jsx';

class Post extends React.Component {
  render() {
    return this.props.messages
    
  }
}