import { type Request, type Response, type NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { type JwtPayload } from 'jsonwebtoken';
import { AppError } from './error.js';

function requireAuth(req:Request,res:Response, next:NextFunction) {
    
    const authHeader = req.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({message: "Token absent."})
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = jwt.verify(token as any, process.env.JWT_SECRET!) as JwtPayload

        req.user = {
            id: (payload.sub) as string,
            role: payload.role
        }
        next()
    } catch(error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new AppError(401, 'AUTHENTICATION_ERROR','Branchez-vous à votre compte pour accéder à cette ressource.'));
        } else if(error instanceof jwt.JsonWebTokenError) {
            return next(new AppError(500, 'UNKNOWN_ERROR', 'Une erreur inconnue est survenue.'));
        }
    }    
}


function requireRole(role:String) {
    return (req:Request,res:Response, next:NextFunction) => {
        if (req.user!.role !== role) {
            return next(new AppError(403, 'AUTHORIZATION_ERROR', 'Des permissions sont requises pour cette ressource.'));
        }
        next()
    }
}

export { requireAuth, requireRole }