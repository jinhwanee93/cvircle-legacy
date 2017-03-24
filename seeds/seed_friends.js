exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([{
        id: 1,
        friendA: '1',
        friendB: '2',
      },
      {
        id: 2,
        friendA: '2',
        friendB: '1',
      },
      {
        id: 3,
        friendA: '3',
        friendB: '4',
      },
      {
        id: 4,
        friendA: '4',
        friendB: '3',
      }
      ]);
    })
};