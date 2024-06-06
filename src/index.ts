import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";

export function main() {
  dotenv.config(); // Load environment variables

  // Connect to MongoDB
  const dbconnection = String(process.env.MONGODB_URI);
  mongoose
    .connect(dbconnection, {
      serverSelectionTimeoutMS: 5000,
      autoCreate: true,
      autoIndex: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    // Middleware
    app.use(cors());
    app.use(express.json());
  });
  const port = process.env.PORT || 5000;

  server.build().listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

main();
