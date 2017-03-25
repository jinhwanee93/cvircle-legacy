import axios from 'axios';

export function showComments(comments) {
  return {
    type: 'COMMENTS_SUBMITTED',
    payload: comments,
  };
}

export function showNames(names) {
  return {
    type: 'NAMES', 
    payload: names,
  }
}

export function xcomment(item){
  return {
    type: 'COMMENT_DELETED'
  }
}

export function deleteComment(item){
  console.log('item in chatindex', item)
  return () => {
    axios.delete('/comments', item)
    .then((item) => {
      console.log('item in delete', item)
      //dispatch(xcomment(item))
    })
   }
 }

 export function test(val) {
   console.log(val)
 }

export function postComment(data) {
  return (dispatch) => {
    axios.post('/comments', data)
    .then(()=> {
      axios.get('/comments')
      .then((results) => {
    console.log('results from GET', results)
    dispatch(showComments(results.data));
  })
 })
}
}
  // .then(()=> {
  //   axios.get('/usernames', { contributorID : data.contributorID})
  //   .then((results)=> {
  //     console.log('results', results)
  //     results.data.map((item) => console.log('item+++', item.firstName, item.id));
  //     dispatch(showNames(item))
  //   })
  // })


/*export function loadComments() {
  return (dispatch) => {
    axios.get('/comments')
    .then((results) => {
    console.log('results from GET', results)
    dispatch(showComments(results.data));
   })
  }
 }*/

  //this was working before
  /*return {
    type: 'MESSAGE_SUBMITTED',
    payload: [data]*/
  