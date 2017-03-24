
exports.up = function(knex, Promise) {
  return knex.schema
  // It builds the requisite core tables
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('firstName', 255);
      table.string('lastName', 255);
      table.string('email', 25);
      table.string('fbID');
      table.timestamps(true);
    })
    .createTable('itineraries', (table) => {
      table.increments('id').primary();
      table.integer('ownerID').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('itinName', 40);
      table.integer('isActive');
      table.integer('isPublic');
      table.timestamps(true);
    })
    .createTable('entries', (table) => {
      table.increments('id').primary();
      table.string('title', 50);
      table.text('body', 'mediumtext');
      table.decimal('lat', 24, 12);
      table.decimal('lng', 24, 12);
      table.string('name', 255);
      table.string('address', 255);
      table.integer('contributorID').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('itinID').unsigned().references('id').inTable('itineraries').onDelete('CASCADE');
      table.timestamps(true);
    })

    .createTable('comments', (table) => {
      table.increments('id').primary();
      table.string('comment', 255);
      table.integer('contributorID').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('entryID').unsigned().references('id').inTable('entries').onDelete('CASCADE');
      table.timestamps(true);
    })

    .createTable('friends', (table) => {
      table.increments('id').primary();
      table.integer('friendA').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('friendB').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('itineraries')
    .dropTableIfExists('entries')
    .dropTableIfExists('users_itins')
    .dropTableIfExists('entries_itins')
    .dropTableIfExists('comments')
    .dropTableIfExists('friends')
};
