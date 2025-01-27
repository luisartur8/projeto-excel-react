import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProdutosSchema } from "../validations";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function Produtos(app: FastifyInstance) {

    app.get('/produtos', async (req: FastifyRequest, reply: FastifyReply) => {
        const produtos = await knex('produtos').select('*');
        reply.status(201).send({ produtos });
    })

    app.post('/produtos', async (req: FastifyRequest, reply: FastifyReply) => {

        const produtos = createProdutosSchema.parse(req.body);

        produtos.map(async (produto) => {
            const { codigo, nome, percentual, validade } = produto;

            await knex('produtos').insert({
                id: randomUUID(),
                codigo,
                nome,
                percentual,
                validade
            })
        })

        reply.status(201).send({ message: 'Produto inserido com sucesso!' });
    })

    app.delete('/produtos', async (req: FastifyRequest, reply: FastifyReply) => {
        const produtos = await knex('produtos').select('*');

        if (!produtos) {
            reply.status(404).send({ error: 'Produto não encontrado!' });
        }

        await knex('produtos').select('*').delete();
        reply.status(200).send({ message: 'Todos os produtos deletado com sucesso!' });
    })

    app.delete('/produtos/:produtoId', async (req: FastifyRequest, reply: FastifyReply) => {
        const paramSchema = z.object({ produtoId: z.string().uuid() })

        const { produtoId } = paramSchema.parse(req.params);

        const produtos = await knex('produtos').where({ id: produtoId });

        if (!produtos) {
            reply.status(404).send({ error: 'Produto não encontrado!' });
        }

        await knex('produtos').where({ id: produtoId }).delete();

        reply.status(200).send({ message: 'Produto deletado com sucesso!' });
    })

}