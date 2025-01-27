import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('oportunidade', (table) => {
        table.uuid('id').primary()
        table.string('nome')
        table.string('telefone')
        table.string('cpf_cnpj')
        table.date('data_nascimento')
        table.string('genero')
        table.string('email')
        table.string('anotacao')
        table.string('bonus_valor')
        table.string('bonus_validade')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('oportunidade')
}

