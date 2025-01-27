import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('produtos', (table) => {
        table.uuid('id').primary()
        table.string('codigo')
        table.string('nome')
        table.string('percentual')
        table.string('validade')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('produtos')
}

