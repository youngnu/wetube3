import express from "express";

const rootRouter = express.Router();
const handleHoem = (req, res) => {
    return res.send("I'm in Home 😘")
};
rootRouter.get("/", handleHoem)

export default rootRouter