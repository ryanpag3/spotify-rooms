import express from "express";
import env from "./utils/env";
import conf from "../config.json";

const app = express();
const config = conf[env];

app.set('env', env);
app.set('port', config.port);

export default app;  