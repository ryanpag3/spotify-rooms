import express from "express";
import env from "./utils/env";
import conf from "../config.json";
import homeRoute from './routes/home';

const app = express();
const config = conf[env];

app.set('env', env);
app.set('port', config.port);

app.use('/', homeRoute);

export default app;  