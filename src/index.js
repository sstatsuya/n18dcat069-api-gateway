const express = require("express"); // import thư viện express đã cài ở trên
const app = express(); // app ở đây đại diện cho cái dự án nodejs mà mình sẽ làm việc xuyên suốt

const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const { ApolloServer } = require("apollo-server-express");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // console.log(req.socket.remotePort)
      // console.log(req.headers.authorization);
      return req;
    },
  });
  await server.start();
  const app = express();
  server.applyMiddleware({
    app,
    path: "/",
  });
  const PORT = process.env.PORT || 6999;
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 API Gateway ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}
startApolloServer(typeDefs, resolvers);
