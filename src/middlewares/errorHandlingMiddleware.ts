import { Request, Response, NextFunction } from 'express';

export default function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {
    if (error.type === 'invalid key') return res.send(error.message).status(401);
    if (error.type === 'invalid company') return res.send(error.message).status(404);
    if (error.type === 'invalid employee') return res.send(error.message).status(404);
    if (error.type === 'existent card') return res.send(error.message).status(401);
    if (error.type === 'nonexistent card') return res.send(error.message).status(404);
    if (error.type === 'expired card') return res.send(error.message).status(401);
    if (error.type === 'activated card') return res.send(error.message).status(401);
    if (error.type === 'incorrect CVC') return res.send(error.message).status(401);

    return res.sendStatus(500);
}