import express from "express";
import { handleLogout, handleUserEdit, startGithubLogin, finshGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout)
userRouter.get("/edit", handleUserEdit)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finshGithubLogin)

export default userRouter