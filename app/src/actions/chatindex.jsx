export function message(data) {
  return {
    type: 'MESSAGE_SUBMITTED',
    payload: data,
  };
};
