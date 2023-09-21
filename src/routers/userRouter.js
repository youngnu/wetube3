import express from "express";
import { handleLogout, handleUserEdit, startGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout)
userRouter.get("/edit", handleUserEdit)
userRouter.get("/github/start", startGithubLogin)

export default userRouter