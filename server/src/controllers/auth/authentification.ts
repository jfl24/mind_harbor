import dotenv from "dotenv";
import { type Request, type NextFunction, type Response } from "express";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";
import type { User } from "../../../generated/prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
import { AppError } from "../../middlewares/error.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";

async function authInscription(req:Request, res:Response, next: NextFunction) {

    const user = await prisma.user.findUnique({
        where: {email: req.body.email},
    })
    
    if(user) { return next(new AppError(409, 'CONFLICT_ERROR', 'Courriel indisponible.')); }

    try {
    const mdpHash = await bcrypt.hash(req.body.passwordHash, 10);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        passwordHash:mdpHash
      },
    });
    res
      .status(201)
      .json({
        "success":true,
        "data": { id: user.email, role: user.role, cree: user.createdAt },
        "message": "Utilisateur crée!"
         });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
        return next(new AppError(500, 'DATABASE_ERROR', 'Erreur lors de l\'inscription.'))
    }
    return next(new AppError(500, 'UNKNOWN_ERROR', 'Erreur lors de l\'inscription.'))
  }
}

async function authConnexion(req: Request, res: Response) {

}

async function authRafraichir(req: Request, res: Response) {

}

async function authDeconnexion(req: Request, res: Response) {

}

async function authProfileUtilisateur(req: Request, res: Response) {
    /*Ex
        {
  "id": "usr_8f29d10a",
  "email": "alex@example.com",
  "name": "Alex Rivera",
  "role": "editor",
  "permissions": ["create_post", "edit_post"]
        }*/
}

export { authConnexion, authInscription, authDeconnexion, authRafraichir, authProfileUtilisateur }