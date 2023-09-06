import express from "express";
import { handleWatchVideo, handleUpload, getEdit, postEdit, handleVideoDelete } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", handleUpload)
videoRouter.get("/:id(\\d+)", handleWatchVideo)
videoRouter.get("/:id(\\d+)/edit", getEdit)
videoRouter.post("/:id(\\d+)/edit", postEdit)
videoRouter.get("/:id(\\d+)/delete", handleVideoDelete)

export default videoRouter