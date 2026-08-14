import { Router } from "express";
import * as postController from "../controllers/posts/postController.js";

const postRouter = Router();

postRouter.delete(
    "/:id",
    postController.supprimerPost
);

postRouter.post(
    "/:id/comments",
    postController.creerCommentaire
);

export default postRouter;