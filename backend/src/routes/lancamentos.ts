import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createLancamentosSchema } from "../validations";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function Lancamentos(app: FastifyInstance) {

    app.get('/lancamentos', async (req: FastifyRequest, reply: FastifyReply) => {
        const lancamentos = await knex('lancamentos').select('*');
        reply.status(201).send({ lancamentos });
    })

    app.post('/lancamentos', async (req: FastifyRequest, reply: FastifyReply) => {
        const lancamentos = createLancamentosSchema.parse(req.body);

        lancamentos.map(async (lancamento) => {
            const { nome, telefone, cpf_cnpj, valor_venda, valor_resgate, anotacao_venda, item_venda, data_lancamento, nome_vendedor, codigo_vendedor } = lancamento;
            
            const dataLancamento = new Date(data_lancamento);

            await knex('lancamentos').insert({
                id: randomUUID(),
                cliente_nome: nome,
                cliente_telefone: telefone,
                cliente_cpf_cnpj: cpf_cnpj,
                valor_venda,
                valor_resgate,
                anotacao_venda,
                item_venda,
                data_lancamento: dataLancamento,
                nome_vendedor,
                codigo_vendedor
            })
        })

        reply.status(201).send({ message: 'Lancamento inserido com sucesso!' });
    })

    app.delete('/lancamentos', async (req: FastifyRequest, reply: FastifyReply) => {
        const lancamentos = await knex('lancamentos').select('*');

        if (!lancamentos) {
            reply.status(404).send({ error: 'Lancamento não encontrado!' });
        }

        await knex('lancamentos').select('*').delete();
        reply.status(200).send({ message: 'Todos os lancamentos deletado com sucesso!' });
    })

    app.delete('/lancamentos/:lancamentoId', async (req: FastifyRequest, reply: FastifyReply) => {
        const paramSchema = z.object({ lancamentoId: z.string().uuid() })

        const { lancamentoId } = paramSchema.parse(req.params);

        const lancamentos = await knex('lancamentos').where({ id: lancamentoId });

        if (!lancamentos) {
            reply.status(404).send({ error: 'Lancamento não encontrado!' });
        }

        await knex('lancamentos').where({ id: lancamentoId }).delete();

        reply.status(200).send({ message: 'Lancamento deletado com sucesso!' });
    })

}