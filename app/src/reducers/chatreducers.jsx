let initialState = {
//message_sent: false
comments: [
  'hello'
]
};

export default function (state= initialState, action) {
  switch (action.type) {
    case 'COMMENTS_SUBMITTED':
      return Object.assign({}, state, {
        comments: action.payload,
        //message_sent: true,
    })
    case 'NAMES':
      return Object.assign({}, state, {
        names:action.payload
    })
   case 'COMMENT_DELETED':
    return Object.assign({}, state, {
        
    })
  }
  return state;
}



//this was working before
/*export default function (state = initialState, action) {
  switch (action.type) {
    case 'MESSAGE_SUBMITTED':
      return Object.assign({}, state, {
        messages: action.payload,
        //message_sent: true,
    })
  }
  return state;
}*/