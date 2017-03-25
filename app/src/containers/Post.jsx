import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showComments } from '../actions/chatindex.jsx';
import { Card } from 'semantic-ui-react';
import { Button, Comment } from 'semantic-ui-react';
// import { showComments } from '../actions/chatindex.jsx';
import { deleteComment } from '../actions/chatindex.jsx';
import axios from 'axios';

class Post extends React.Component {


componentWillMount() {
  this.getPosts();
}


  getPosts() {
    var self = this;
    setInterval(() => {
      console.log(this.props.messages.comments)
      axios.get('/comments')
        .then((results) => {
          // console.log(results)
          self.props.showComments(results.data)
    })
  }, 2000)
  }
  renderMessages(){
    //console.log('this.props.messages.comments', this.props.messages.comments)
    // console.log('this.props.messages.names', this.props.messages.names);
    return this.props.messages.comments.map((item) => {
       //console.log('itemEntryID', item.entryID);
       //console.log('item.conributorID', item.contributorID)
       //console.log('this.props.id', this.props.id);
        if (item.entryID === this.props.id){
          return (<p className="ui comments borders"><div><span className="left"><span className='bold'>{item.contributorID}</span>:<span>&nbsp;&nbsp;</span>{ item.comment }</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span onClick={() => deleteComment(item)} className="remove-btn glyphicon glyphicon-remove right"></span></div></p>)
      //return (<div><p>{item.contributorID}:{ item.comment }</p></div>) 
     } 
   })
  }
  
  render (){
    console.log('THIS PROPS MESSAGES', this.props.messages.comments)
    return(
      <div className="commentbox">{this.renderMessages()}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showComments, deleteComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
