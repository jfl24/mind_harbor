import { Router } from "express";

import * as postController from "../controllers/posts/postController.js";

import { requireAuth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";

import * as postZodSchemas from "../schemasZod/post.schema.js";


const postRouter = Router();


postRouter.delete(
    "/:id",
    requireAuth,
    postController.supprimerPost
);


postRouter.post(
    "/:id/comments",
    requireAuth,
    validateBody(postZodSchemas.createCommentSchema),
    postController.creerCommentaire
);


export default postRouter;