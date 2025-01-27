import fastify from "fastify";
import routes from "./routes/routes"

const app = fastify();

// Habilitar CORS
app.addHook('onRequest', (request, reply, done) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    reply.header('Access-Control-Allow-Headers', 'Content-Type');
    
    if (request.method === 'OPTIONS') {
      reply.status(200).send();
    } else {
      done();
    }
  });

app.register(routes);

app.listen({
    port: 4444
}).then(() => {
    console.log("HTTP Server Running!");
})