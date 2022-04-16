import { Request, Response, NextFunction } from 'express';

export default function validateSchema(schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body);

		if (validation.error) return res.sendStatus(422)

		next();
	};
}