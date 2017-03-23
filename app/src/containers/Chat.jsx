import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from '../actions/chatindex.jsx';

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
    this.props.message(this.state.value);
  }

  render() {
    return (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text" onChange={this.handleChange.bind(this)}
            />
            <input type="submit" value="enter"/>
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
  return bindActionCreators({message}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
