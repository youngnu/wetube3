import express from "express";
import {registerView, createComment, deleteComment} from "../controllers/videoController"

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
//commentSections(프론트)에서 Fetch를 이용하여 delete요청을 보내주고 있으모로, Router도 post가 아닌 delete라고 설정해야 한다.
apiRouter.delete("/videos/:id([0-9a-f]{24})/comment/delete", deleteComment);
export default apiRouter;