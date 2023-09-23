import express from "express";
import { handleLogout, getEdit, postEdit, startGithubLogin, finshGithubLogin, getChangePassword, postChangepassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, handleLogout)
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit)
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finshGithubLogin)
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangepassword)

export default userRouter