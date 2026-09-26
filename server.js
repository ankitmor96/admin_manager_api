

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import adminRoutes from "./routes/adminRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hellofrom server")
});

app.use("/admin", adminRoutes);
app.use("/managers", managerRoutes);

app.use((req, res , next ) => {
  return next(new HttpError("rout not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return(error);
  }
  res.status(error.status || 500).json({
      success: false,
      message: err.message || "Internal server error"
    });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {

    await connectDB();

    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();