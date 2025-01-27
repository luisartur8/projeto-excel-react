import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createClienteSchema } from "../validations";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function Clientes(app: FastifyInstance) {

    app.get('/clientes', async (req: FastifyRequest, reply: FastifyReply) => {
        const clientes = await knex('cliente').select('*');
        reply.status(201).send({ clientes });
    })

    app.post('/clientes', async (req: FastifyRequest, reply: FastifyReply) => {

        const clientes = createClienteSchema.parse(req.body);

        clientes.map(async (cliente) => {
            const { nome, telefone, cpf_cnpj, data_nascimento, genero, email, anotacao } = cliente;

            const dataNascimento = new Date(data_nascimento);

            await knex('cliente').insert({
                id: randomUUID(),
                nome,
                telefone,
                cpf_cnpj,
                data_nascimento: dataNascimento,
                genero,
                email,
                anotacao
            })
        })

        reply.status(201).send({ message: 'Cliente inserido com sucesso!' });
    })

    app.delete('/clientes', async (req: FastifyRequest, reply: FastifyReply) => {
        const clientes = await knex('cliente').select('*');

        if (!clientes) {
            reply.status(404).send({ error: 'Cliente não encontrado!' });
        }

        await knex('cliente').select('*').delete();
        reply.status(200).send({ message: 'Todos os clientes deletado com sucesso!' });
    })

    app.delete('/clientes/:clienteId', async (req: FastifyRequest, reply: FastifyReply) => {
        const paramSchema = z.object({ clienteId: z.string().uuid() })

        const { clienteId } = paramSchema.parse(req.params);

        const cliente = await knex('cliente').where({ id: clienteId });

        if (!cliente) {
            reply.status(404).send({ error: 'Cliente não encontrado!' });
        }

        await knex('cliente').where({ id: clienteId }).delete();

        reply.status(200).send({ message: 'Cliente deletado com sucesso!' });
    })

}