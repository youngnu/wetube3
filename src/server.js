import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import {localMiddleware} from "./middlewares"
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev")

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use(logger);
//HTTP post 요청의 본문(body)데이터를 해석(parse)하는 역할을 수행. 주로 HTML form 데이터나 URL 쿼리 문자열과 같이 URL 인코딩된 데이터를 해석해서 req.body로 접근할수있도록 해줌
app.use(express.urlencoded({ extended: true }));
//주로 텍스트 데이터를 처리할 때 사용되며, 이 메서든ㄴ 요청 본문의 데이터를 문자열 형태로 추출합니다.
app.use(express.text());
app.use(
    session({
        secret: process.env.DB_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube3"})
    })
);
// app.use(flash())로 req.flash(type, 내용)형태를 써줄 수 있게된다.
app.use(flash());
app.use(localMiddleware);
//express.static -> 폴더의 파일들을 사용하기 위해 사용한다, express.static()미들웨어를 상요하면 애플리케이션에 정적파일을 제공할 수 있다.
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"))
//Url(/assets)과 폴더명("assets")이 같을 필요는 없다.
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
