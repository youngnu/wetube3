import express from "express";

const app = express();
const PORT = 4000;
const handleListening = () => {
    console.log(`✅this is our server http://localhost:${PORT}`)
}
app.listen(PORT, handleListening);