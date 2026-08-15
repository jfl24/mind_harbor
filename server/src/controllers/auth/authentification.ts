import dotenv from "dotenv";
import { type Request, type NextFunction, type Response } from "express";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";
import type { User } from "../../../generated/prisma/client.js";
import bcrypt from "bcryptjs";
import jwt, { type JsonWebTokenError, type JwtPayload } from "jsonwebtoken";
dotenv.config();
import { AppError } from "../../middlewares/error.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";

async function authInscription(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (user) {
    return next(new AppError(409, "CONFLICT_ERROR", "Courriel indisponible."));
  }

  try {
    const mdpHash = await bcrypt.hash(req.body.passwordHash, 10);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        passwordHash: mdpHash,
      },
    });

    res.status(201).json({
      success: true,
      data: { id: user.email, role: user.role, cree: user.createdAt },
      message: "Utilisateur crée!",
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(
        new AppError(500, "DATABASE_ERROR", "Erreur lors de l'inscription."),
      );
    }
    return next(
      new AppError(500, "UNKNOWN_ERROR", "Erreur lors de l'inscription."),
    );
  }
}

async function authConnexion(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return next(new AppError(401, "LOGIN_ERROR", "La connexion a échouée."));
    }

    const passwdCheck = await bcrypt.compare(
      req.body.passwordHash,
      user!.passwordHash,
    );

    if (!passwdCheck) {
      return next(new AppError(401, "LOGIN_ERROR", "La connexion a échouée."));
    }

    const tokenAcces = jwt.sign(
      { sub: user!.id, role: user!.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    const tokenRefresh = jwt.sign(
      { sub: user!.id, role: user!.role },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    const expiration = new Date();
    expiration.setHours(0, 0, 0, 0);
    expiration.setDate(expiration.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        userId: user!.id,
        expiresAt: expiration,
        token: tokenRefresh,
      },
    });

    return res.status(201).json({
      succes: true,
      data: { tokenAcces: tokenAcces, tokenRefresh: tokenRefresh },
      message: "Authentification réussi!.",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(`Prisma error - code: ${error.code}`);
        return next(
          new AppError(500, "DATABASE_ERROR", "Erreur lors de la connexion."),
        );
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      console.log(`Prisma error - validation error`);
      return next(
        new AppError(500, "UNKNOWN_ERROR", "Erreur lors de la connexion."),
      );
    }
  }
}

async function authRafraichir(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenExistant = await prisma.refreshToken.findUnique({
      where: { token: req.body.refreshToken },
    });

    if (!tokenExistant) {
      return next(
        new AppError(
          404,
          "LOGIN_ERROR",
          "Échec de d'authentification.  Token introuvable.",
        ),
      );
    }

    jwt.verify(req.body.refreshToken, process.env.JWT_REFRESH_SECRET!);

    const user = await prisma.user.findUnique({
      where: { id: tokenExistant.userId },
    });

    const tokenAcces = jwt.sign(
      { sub: user!.id, role: user!.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    const tokenRefresh = jwt.sign(
      { sub: user!.id, role: user!.role },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    const expiration = new Date();
    expiration.setHours(0, 0, 0, 0);
    expiration.setDate(expiration.getDate() + 7);

    await prisma.$transaction([
      prisma.refreshToken.delete({ where: { token: req.body.refreshToken } }),
      prisma.refreshToken.create({
        data: { userId: user!.id, expiresAt: expiration, token: tokenRefresh },
      }),
    ]);

    return res.status(200).json({
      succes: true,
      data: { tokenAcces: tokenAcces, tokenRefresh: tokenRefresh },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(
        new AppError(500, "DATABASE_ERROR", "Une erreur interne est survenue."),
      );
    }
    return next(
      new AppError(
        400,
        "LOGIN_ERROR",
        "Échec de connexion.  Veuillez vous reconnecter.",
      ),
    );
  }
}

async function authDeconnexion(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshPayload = jwt.verify(
      req.body.refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as JwtPayload;

    if (refreshPayload.sub) {
      if (req.user!.id !== refreshPayload.sub) {
        return next(new AppError(403, "LOGIN_ERROR", "Échec de déconnexion."));
      }
    }

    await prisma.refreshToken.delete({
      where: { token: req.body.refreshToken },
    });
    return res.status(200).json({
      succes: true,
      data: [],
      message: "Déconnexion réussi.",
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new AppError(401, "LOGIN_ERROR", "Échec de déconnexion."));
    }
    return next(
      new AppError(500, "UNKNOWN_ERROR", "Une erreur interne est survenue."),
    );
  }
}

async function authProfileUtilisateur(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      omit: { passwordHash: true },
    });

    return res.status(200).json({
      succes: true,
      data: user,
      message: `User id ${user?.id} récupéré avec succès.`,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return next(new AppError(404, "LOGIN_ERROR", "User introuvable."));
      } else {
        return next(
          new AppError(
            500,
            "DATABASE_ERROR",
            "Une erreur interne est survenue.",
          ),
        );
      }
    }
    return next(
      new AppError(500, "UNKNOWN_ERROR", "Une erreur interne est survenue."),
    );
  }
}

export {
  authConnexion,
  authInscription,
  authDeconnexion,
  authRafraichir,
  authProfileUtilisateur,
};
