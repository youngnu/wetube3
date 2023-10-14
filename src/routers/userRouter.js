import express from "express";
import { handleLogout, getEdit, postEdit, startGithubLogin, finshGithubLogin, getChangePassword, postChangepassword, see } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, handleLogout)
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit)
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finshGithubLogin)
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangepassword)
userRouter.route("/:id").get(see)


export default userRouter