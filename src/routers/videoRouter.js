import express from "express";
import { handleWatchVideo, handleUpload, handleEditVideo, handleVideoDelete } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", handleUpload)
videoRouter.get("/:id", handleWatchVideo)
videoRouter.get("/:id/edit", handleEditVideo)
videoRouter.get("/:id/delete", handleVideoDelete)

export default videoRouter