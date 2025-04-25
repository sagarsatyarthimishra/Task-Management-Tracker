const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // ← yeh tumhari fake API data file hai
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// PORT env variable use hoga render ke liye
server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running');
});
