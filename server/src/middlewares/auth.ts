import dotenv from 'dotenv'
import { type Request, type Response, type NextFunction } from "express";
import jwt from 'jsonwebtoken'

function requireAuth(req:Request,res:Response, next:NextFunction) {
    
}

function requireRole(role:String) {

}