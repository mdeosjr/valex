import express, { json, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import routes from './routers/routes.js'
dotenv.config();

const server = express();

server.use(cors());
server.use(json());
server.use(routes);
server.use((error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        if (error.type === 'invalid key') {
            return res.sendStatus(422)
        }
    };

    return res.sendStatus(500);
})

const PORT = process.env.PORT || 5000;
server.listen(PORT);