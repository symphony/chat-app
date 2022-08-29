// = modules =
import express from 'express';
import * as socketServer from './server';

// = server config =
const PORT = process.env.PORT || 3001;
const app = express();

// start http server
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// start socket server
socketServer.listen(server);
