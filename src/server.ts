import server from './app';

// start server
server.start(
  {
    cors: {
      origin: true,
      credentials: true,
    },
    port: process.env.PORT || 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
  },
  (opt) => console.log(`⚡ running on port ${opt.port}`)
);
