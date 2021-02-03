import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
// files
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';

// const pubsub = new PubSub(); // subscription => create permanent websocket conn to server
const prisma = new PrismaClient(); // prisma for context

// actual implementation of the GraphQL schema
// 1. parent/root = result of the previous call
// 2. args = input argument ketika request mutation
// 3. context = An object that gets passed through the resolver chain that each resolver can write to and read from
// 4. info = An AST representation of the query or mutation
const resolvers = {
  Query,
  Mutation,
};

// tells the server what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      // pubsub,
    };
  },
});

// middlewares
server.express.use(morgan('dev')); // dev logging API
// server.express.use(helmet()); // security
// router.use(express.json()); // request application/type === json
// router.use(express.urlencoded({ extended: false })); // form data object, value objectnya berasal dari input attribute name
// router.use(compression()); // Gzip compressing can greatly decrease the size of the response body

export default server;
