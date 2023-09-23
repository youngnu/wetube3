import express from "express";
import { handleLogout, getEdit, postEdit, startGithubLogin, finshGithubLogin, getChangePassword, postChangepassword } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout)
userRouter.route("/edit").get(getEdit).post(postEdit)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finshGithubLogin)
userRouter.route("/change-password").get(getChangePassword).post(postChangepassword)

export default userRouter