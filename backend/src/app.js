import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const app = express();
const dbURI =
  "mongodb+srv://Sabs722334:722334@cluster0.4o31puz.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
    var jsonParser = bodyParser.json();
    app.use(jsonParser);
    app.use(cors());
    app.use("/auth", authRoutes);
    const port = 3001;
    app.get("/", (req, res) => {
      res.send({ msg: "Hello World!" });
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
