// = modules =
import express from 'express';
import * as socketServer from './socketServer';

// = server config =
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('dist/public'));

// start http server
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// start socket connection
socketServer.listen(server);
