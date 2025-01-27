import { z } from "zod";

export const createClienteSchema =
    z.array(
        z.object({
            nome: z.string(),
            telefone: z.string(),
            cpf_cnpj: z.string(),
            data_nascimento: z.string(),
            genero: z.string(),
            email: z.string(),
            anotacao: z.string()
        })
    );

export const createLancamentosSchema =
    z.array(
        z.object({
            nome: z.string(),
            telefone: z.string(),
            cpf_cnpj: z.string(),
            valor_venda: z.string(),
            valor_resgate: z.string(),
            anotacao_venda: z.string(),
            item_venda: z.string(),
            data_lancamento: z.string(),
            nome_vendedor: z.string(),
            codigo_vendedor: z.string()
        })
    );

export const createOportunidadeSchema =
    z.array(
        z.object({
            nome: z.string(),
            telefone: z.string(),
            cpf_cnpj: z.string(),
            data_nascimento: z.string(),
            genero: z.string(),
            email: z.string(),
            anotacao: z.string(),
            bonus_valor: z.string(),
            bonus_validade: z.string()
        })
    );

export const createProdutosSchema =
    z.array(
        z.object({
            codigo: z.string(),
            nome: z.string(),
            percentual: z.string(),
            validade: z.string()
        })
    );