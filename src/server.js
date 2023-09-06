import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev")

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use(logger);
app.use(express.urlencoded({ extended: true }))
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => {
    console.log(`✅Server listening My port on http://localhost:${PORT}`)
};
app.listen(PORT, handleListening);