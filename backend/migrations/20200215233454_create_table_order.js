
exports.up = async function(knex, Promise) {
  await knex.schema.hasTable('order')

  return await knex.schema.createTable('users', (table) => {
        table.increments('id')
        
        table.integer('user_id').unsigned()
        table.foreign('user_id')
            .references('users.id')
            .onUpdate('cascade')
            .onDelete('restrict')

        table.integer('menu_id').unsigned()
        table.foreign('menu_id')
            .references('menu.id')
            .onUpdate('cascade')
            .onDelete('restrict')

        table.integer('quantity')
        table.integer('price')
        table.string('status')
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('order')
};
