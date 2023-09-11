import express from "express";
import { handleHoem, search } from "../controllers/videoController";
import { getJoin, getLogin, postJoin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", handleHoem);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", getLogin)
rootRouter.get("/search", search)

export default rootRouter