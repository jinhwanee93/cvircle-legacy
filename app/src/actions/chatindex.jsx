export function message(data) {
  console.log('result in chatindex', data);
  return {
    type: 'MESSAGE_SUBMITTED',
    payload: [data]
  };
};
