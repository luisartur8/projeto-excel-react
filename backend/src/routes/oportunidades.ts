import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createOportunidadeSchema } from "../validations";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function Oportunidades(app: FastifyInstance) {

    app.get('/oportunidades', async (req: FastifyRequest, reply: FastifyReply) => {
        const oportunidades = await knex('oportunidade').select('*');
        reply.status(201).send({ oportunidades });
    })

    app.post('/oportunidades', async (req: FastifyRequest, reply: FastifyReply) => {

        const oportunidades = createOportunidadeSchema.parse(req.body);

        oportunidades.map(async (oportunidade) => {
            let { nome, telefone, cpf_cnpj, data_nascimento, genero, email, anotacao, bonus_valor, bonus_validade } = oportunidade;

            const dataNascimento = new Date(data_nascimento);

            await knex('oportunidade').insert({
                id: randomUUID(),
                nome,
                telefone,
                cpf_cnpj,
                data_nascimento: dataNascimento,
                genero,
                email,
                anotacao,
                bonus_valor,
                bonus_validade
            })
        })

        reply.status(201).send({ message: 'Oportunidade inserido com sucesso!' });
    })

    app.delete('/oportunidades', async (req: FastifyRequest, reply: FastifyReply) => {
        const oportunidades = await knex('oportunidade').select('*');

        if (!oportunidades) {
            reply.status(404).send({ error: 'Oportunidade não encontrado!' });
        }

        await knex('oportunidade').select('*').delete();
        reply.status(200).send({ message: 'Todas as oportunidades deletado com sucesso!' });
    })

    app.delete('/oportunidades/:oportunidadeId', async (req: FastifyRequest, reply: FastifyReply) => {
        const paramSchema = z.object({ oportunidadeId: z.string().uuid() })

        const { oportunidadeId } = paramSchema.parse(req.params);

        const oportunidades = await knex('oportunidade').where({ id: oportunidadeId });

        if (!oportunidades) {
            reply.status(404).send({ error: 'Oportunidade não encontrada!' });
        }

        await knex('oportunidade').where({ id: oportunidadeId }).delete();

        reply.status(200).send({ message: 'Oportunidade deletado com sucesso!' });
    })

}