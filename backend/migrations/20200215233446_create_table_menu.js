
exports.up = async function(knex, Promise) {
  await knex.schema.hasTable('menu')

  return await knex.schema.createTable('menu', (table) => {
        table.increments('id')

        table.integer('user_id').unsigned()
        table.foreign('user_id')
            .references('users.id')
            .onUpdate('cascade')
            .onDelete('restrict')

        table.string('title').notNullable()
        table.string('desc')
        table.string('img')
        table.integer('price')
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('menu')
  
};
