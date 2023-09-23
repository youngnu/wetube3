import express from "express";
import { handleHoem, search } from "../controllers/videoController";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", handleHoem);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin)
rootRouter.get("/search", search)

export default rootRouter