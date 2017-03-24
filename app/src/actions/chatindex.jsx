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

export function postComment(data) {
  //console.log('result in chatindex', data);
  //console.log('data.id', data.entryID)
  return (dispatch) => {
    axios.post('/comments', data)
    .then(() => {
      //console.log('data sent to db')
    })
    .then(()=> {
    axios.get('/comments')
    .then((results) => {
    console.log('results from GET', results)
    dispatch(showComments(results.data));
  })
 })
  // .then(()=> {
  //   axios.get('/usernames', { contributorID : data.contributorID})
  //   .then((results)=> {
  //     console.log('results', results)
  //     results.data.map((item) => console.log('item+++', item.firstName, item.id));
  //     dispatch(showNames(item))
  //   })
  // })
}


  //this was working before
  /*return {
    type: 'MESSAGE_SUBMITTED',
    payload: [data]
  };*/
};
