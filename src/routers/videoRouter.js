import express from "express";
import { handleWatchVideo, getUpload, postUpload, getEdit, postEdit, deleteVideo } from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload)
videoRouter.get("/:id([0-9a-f]{24})", handleWatchVideo)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit)
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo)

export default videoRouter