// = modules =
import express from 'express';
import * as socketServer from './socketServer';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config';

// = server config =
const PORT = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(express.static('dist/public'));

// @ts-ignore
app.use(webpackDevMiddleware(compiler, { publicPath: config[1].output.publicPath, }));

// start http server
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// start socket connection
socketServer.listen(server);
