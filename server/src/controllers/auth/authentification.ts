import dotenv from "dotenv";
import { type Request, type Response } from "express";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

async function authInscription(req: Request, res: Response) {
    
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
    res.status(200).json({message:"ok"})
}

export { authConnexion, authInscription, authDeconnexion, authRafraichir, authProfileUtilisateur }