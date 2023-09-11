import express from "express";
import { handleLogout, handleUserEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout)
userRouter.get("/edit", handleUserEdit)

export default userRouter