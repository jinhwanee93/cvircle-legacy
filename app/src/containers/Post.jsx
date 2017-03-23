import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from '../actions/chatindex.jsx';

class Post extends React.Component {
  renderMessages() {
    return this.props.messages.messages.map((item) => (
      <div>{ item }</div>
    ))
  }
  render (){
    console.log('THIS PROPS MESSAGES', this.props.messages)
    return(
      <div>{this.renderMessages()}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ message }, dispatch);
}

export default connect(mapStateToProps)(Post);
