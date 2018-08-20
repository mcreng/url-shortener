
exports.up = function(knex, Promise) {
    return knex.schema.createTable('url', function (t) {
        t.increments('id').primary()
        t.string('user_id').notNullable()
        t.string('url').notNullable()
        t.string('surl').notNullable()
        t.timestamps(false, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('url')
};
