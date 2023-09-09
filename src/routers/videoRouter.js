import express from "express";
import { handleWatchVideo, getUpload, postUpload, getEdit, postEdit, handleVideoDelete } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", getUpload)
videoRouter.post("/upload", postUpload)
videoRouter.get("/:id(\\d+)", handleWatchVideo)
videoRouter.get("/:id(\\d+)/edit", getEdit)
videoRouter.post("/:id(\\d+)/edit", postEdit)
videoRouter.get("/:id(\\d+)/delete", handleVideoDelete)

export default videoRouter