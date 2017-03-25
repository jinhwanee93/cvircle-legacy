import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showComments } from '../actions/chatindex.jsx';
import { Card } from 'semantic-ui-react';
import { Button, Comment } from 'semantic-ui-react';
import { loadComments } from '../actions/chatindex.jsx';

class Post extends React.Component {
componentWillMount(){
  console.log('post 11')
 loadComments();
};

  renderMessages(){
    //console.log('this.props.messages.comments', this.props.messages.comments)
    console.log('this.props.messages.names', this.props.messages.names);
    return this.props.messages.comments.map((item) => {
      console.log('ITEM in POST', item)
       //console.log('itemEntryID', item.entryID);
       //console.log('item.conributorID', item.contributorID)
       //console.log('this.props.id', this.props.id);
        if (item.entryID === this.props.id){
          return (<div className="ui comments inline"><div><p className="bold">{item.contributorID}</p>{ item.comment }</div></div>)
      //return (<div><p>{item.contributorID}:{ item.comment }</p></div>) 
     } 
   })
  }
  
  render (){
    //console.log('THIS PROPS MESSAGES', this.props.comments)
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
  return bindActionCreators({ showComments, showNames, loadComments }, dispatch);
}

export default connect(mapStateToProps)(Post);
