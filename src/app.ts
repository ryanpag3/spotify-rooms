import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
import env from "./utils/env";
import conf from "../config.json";
import homeRoute from './routes/home';
import roomRoute from './routes/room';
import queueRoute from './routes/queue';
import slackRoute from './routes/slack';
import spotifyRoute from './routes/spotify';

const app = express();
const config = conf[env];

app.set('env', env);
app.set('port', config.port);
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoute);
app.use('/room', roomRoute);
app.use('/queue', queueRoute);
app.use('/slack', slackRoute);
app.use('/spotify', spotifyRoute);


export default app;  