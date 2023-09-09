import express from "express";
import { handleWatchVideo, getUpload, postUpload, getEdit, postEdit, handleVideoDelete } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", getUpload)
videoRouter.post("/upload", postUpload)
videoRouter.get("/:id([0-9a-f]{24})", handleWatchVideo)
videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit)
videoRouter.post("/:id([0-9a-f]{24})/edit", postEdit)
videoRouter.get("/:id([0-9a-f]{24})/delete", handleVideoDelete)

export default videoRouter