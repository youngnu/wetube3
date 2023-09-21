import "dotenv/config"
import "./db"
import "./models/Video"
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import {localMiddleware} from "./middlewares"
import MongoStore from "connect-mongo";

const PORT = 4000;

const app = express();
const logger = morgan("dev")

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use(logger);
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: process.env.DB_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube3"})
    })
);
app.use(localMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => {
    console.log(`✅ Server listening My port on http://localhost:${PORT} 🌙`)
};
app.listen(PORT, handleListening); 