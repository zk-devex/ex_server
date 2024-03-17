import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import createHttpError from "http-errors";
import initMongoDB from "./helpers/initMongoDB.js";

initMongoDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







//root handler
app.get("/", (req, res) => {
    res.send("Hello World!");
})

// 404 error handler
app.use((req, res, next) => {
    next(createHttpError.NotFound());
    
})

// 500 error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    })
})
const port = process.env.PORT || 4444;

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`);
})