import { FastifyInstance } from "fastify";
import { Clientes } from "./clientes";
import { Lancamentos } from "./lancamentos";
import { Oportunidades } from "./oportunidades";
import { Produtos } from "./produtos";

export default async function routes(app: FastifyInstance) {

    app.register(Clientes);
    app.register(Lancamentos);
    app.register(Oportunidades);
    app.register(Produtos);

}