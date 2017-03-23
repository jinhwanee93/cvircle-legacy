let initialState = {
//message_sent: false
messages: [
  'hello'
]
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'MESSAGE_SUBMITTED':
      return Object.assign({}, state, {
        messages: action.payload,
        //message_sent: true,
    })
  }
  return state;
}