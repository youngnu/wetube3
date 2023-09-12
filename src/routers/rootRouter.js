import express from "express";
import { handleHoem, search } from "../controllers/videoController";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", handleHoem);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin)
rootRouter.get("/search", search)

export default rootRouter