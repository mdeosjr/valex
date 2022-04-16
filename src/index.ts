import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import routes from './routers/routes.js'
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
dotenv.config();

const server = express();

server.use(cors());
server.use(json());
server.use(routes);
server.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 5000;
server.listen(PORT);