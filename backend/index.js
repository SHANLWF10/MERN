import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/books.js";
import booksRoute from './routes/bookRoutes.js';
import cors from "cors";

const app = express();

app.use(express.json());

// middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST","PUT", "DELETE"],
    allowedHeaders: ['Content-Type']
}));

app.get("/", (req, res) => {
  return res.status(200).send("Hello, MERN");
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app conected to DB");
    app.listen(PORT, () => {
      console.log("first");
    });
  })
  .catch((error) => {
    console.log(error);
  });
