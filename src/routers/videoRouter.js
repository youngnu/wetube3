import express from "express";
import { handleWatchVideo, getUpload, postUpload, getEdit, postEdit, deleteVideo } from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

//single()은 Multer과 함께 사용되는 메서드로 파일 업로드를 처리하는 역할을 한다.
//fileds()은 Multer과 함께 사용되며, single과 달리 여러 파일을 처리할 때 사용된다.
//videoUpload.fileds()안의 name들은 마음대로 정해지는 것이 아니라. upload.pug에서 input의 name과 연관이 있다.
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.fields([{name: "video", maxCount: 1}, {name: "thumb", maxCount: 1}]), postUpload)
videoRouter.get("/:id([0-9a-f]{24})", handleWatchVideo)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit)
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo)

export default videoRouter