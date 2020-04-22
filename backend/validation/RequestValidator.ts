import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';

export default class RequestValidator {
    public validateBody(schema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                res.status(400).json({error: result.error.details[0].message});
            } else {
                if (!req['value']) {
                    req['value'] = {};
                }
                if (!req['value']['body']) {
                    req['value']['body'] = {};
                }
                req['value']['body'] = result.value;
                next();
            }
        };
    }
}