import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('lancamentos', (table) => {
        table.uuid('id').primary()
        table.string('cliente_nome')
        table.string('cliente_telefone')
        table.string('cliente_cpf_cnpj')
        table.string('valor_venda')
        table.string('valor_resgate')
        table.string('anotacao_venda')
        table.string('item_venda')
        table.datetime('data_lancamento')
        table.string('nome_vendedor')
        table.string('codigo_vendedor')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('lancamentos')
}

