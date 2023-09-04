import express from "express";

const app = express();
const PORT = 4000;


const Middleware = (req, res, next) => {
    console.log("PATH", req.path)
    next()
};

const LoggerMiddle = (req, res, next) => {
    console.log("METHOD", req.method)
    next()
};

const handleHoem = (req, res) => {
    res.send("I'm in Home😘")
};
const handleLogin = (req, res) => {
    res.send("I'm Login🤣")
};

app.use(Middleware, LoggerMiddle);
app.get("/", handleHoem);
app.get("/login", handleLogin);


const handleListening = () => {
    console.log(`✅Server listening My port on http://localhost:${PORT}`)
}
app.listen(PORT, handleListening);