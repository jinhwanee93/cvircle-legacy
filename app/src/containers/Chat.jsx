import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postComment } from '../actions/chatindex.jsx';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const self = this;
    self.setState({
      value: event.target.value,
    });
  }

  handleSubmit() {
    //this.state.value
    console.log('this.props name in handleSumti CHAT', this.props.name);
    this.props.postComment({comment : this.state.value, contributorID: this.props.name, entryID : this.props.id});
    console.log('hanldeSubmit this.props', this.props)
    //this.props.postComment(this.state.value, this.props.contributorID, this.props.id);
    //console.log('this.state.value', this.state.value)
    //this.props.postComment()
  }

  render() {
    return (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text" onChange={this.handleChange.bind(this)}
            />
            <input type="submit" value="comment"/>
          </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
