import 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        cliente: {
            id: string
            nome: string
            telefone: string
            cpf_cnpj: string
            data_nascimento: Date
            genero: string
            email: string
            anotacao: string
        }

        lancamentos: {
            id: string
            cliente_nome: string
            cliente_telefone: string
            cliente_cpf_cnpj: string
            valor_venda: string
            valor_resgate: string
            anotacao_venda: string
            item_venda: string
            data_lancamento: Date
            nome_vendedor: string
            codigo_vendedor: string
        }

        oportunidade: {
            id: string
            nome: string
            telefone: string
            cpf_cnpj: string
            data_nascimento: Date
            genero: string
            email: string
            anotacao: string
            bonus_valor: string
            bonus_validade: string
        }

        produtos: {
            id: string
            codigo: string
            nome: string
            percentual: string
            validade: string
        }
    }
}