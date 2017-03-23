let initialState = {
message_sent: false;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'MESSAGE_SUBMITTED':
      return Object.assign({}, state, {
        message: action.payload,
        message_sent: true,
    });
