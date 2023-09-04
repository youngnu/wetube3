import express from "express";
import { handleHoem, search } from "../controllers/videoController";
import { handleJoin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", handleHoem);
rootRouter.get("/join", handleJoin);
rootRouter.get("/search", search)

export default rootRouter