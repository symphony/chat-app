
// = modules =
import express from 'express';
import morgan from 'morgan';
import * as socketServer from './socketServer.js';

// = server config =
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

const httpServer = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}.`);
});

// start socket server
const io = socketServer.listen(httpServer);
