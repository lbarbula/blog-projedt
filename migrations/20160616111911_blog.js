exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(table) {
        table.increments();
        table.string('name')
    }).then(function() {
        return knex.schema.createTable('post', function(table) {
            table.increments();
            table.string('name');
            table.text('body');
            table.string('image');
            table.integer('user_id').unsigned().references('id').inTable('user')
        })
    }).then(function() {
        return knex.schema.createTable('comment', function(table) {
            table.increments();
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('post_id').unsigned().references('id').inTable('post');
            table.text('body');
        })
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comment').then(function () {
        return knex.schema.dropTable('post')
    }).then(function () {
        return knex.schema.dropTable('user')
    })

};
