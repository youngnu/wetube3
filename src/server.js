import morgan from "morgan";
import express from "express";

const PORT = 4000;

const app = express();
const logger = morgan("dev")
app.use(logger);

const globalRouter = express.Router();
const handleHoem = (req, res) => {
    return res.send("I'm in Home 😘")
};
globalRouter.get("/", handleHoem)

const userRouter = express.Router();
const handleLogin = (req, res) => {
    return res.send("I'm Login 🤣")
};
userRouter.get("/login", handleLogin)

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => {
    return res.send("Watch video 🤟")
};
videoRouter.get("/watch", handleWatchVideo)

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListening = () => {
    console.log(`✅Server listening My port on http://localhost:${PORT}`)
};
app.listen(PORT, handleListening);