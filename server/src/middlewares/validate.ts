import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { AppError } from './error.js';

export const validateBody =
    (schema: ZodType): RequestHandler =>
    (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const details = result.error.issues.map((i) => ({
                field: i.path.join('.'),
                message: i.message,
            }));
            return next(new AppError(422, 'VALIDATION_ERROR', 'Donnees invalides.', details));
        }
        req.body = result.data; 
        next();
};