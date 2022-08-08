// = modules =
import express from 'express';
import * as socketServer from './socketServer';

// = server config =
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('dist/public'));


app.get('/404', (req, res) => {
  res.status(404).send('Page Not Found')
});

app.get('/*', (req, res) => {
  res.redirect('/404')
});

app.get('/', (req, res) => {
  res.send('Server Running')
});

// start http server
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// start socket connection
socketServer.listen(server);
