exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('users')

    return await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.unique('email')
        table.string('password')
        table.string('phone')
        table.integer('isAdmin').defaultTo(0)
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('users')
};