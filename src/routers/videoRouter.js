import express from "express";
import { handleWatchVideo, handleUpload, handleEditVideo, handleVideoDelete } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", handleUpload)
videoRouter.get("/:id(\\d+)", handleWatchVideo)
videoRouter.get("/:id(\\d+)/edit", handleEditVideo)
videoRouter.get("/:id(\\d+)/delete", handleVideoDelete)

export default videoRouter