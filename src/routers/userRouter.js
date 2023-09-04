import express from "express";

const userRouter = express.Router();
const handleLogin = (req, res) => {
    return res.send("I'm Login 🤣")
};
userRouter.get("/login", handleLogin)

export default userRouter