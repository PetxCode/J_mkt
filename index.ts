import express, { Application } from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { boundM } from "./config/db";
env.config();

const realPort = parseFloat(process.env.PORTNUMBER!);
const port: number = realPort;
const app: Application = express();

mainApp(app);

const server = app.listen(port, () => {
  console.log("");
  boundM();
  console.log("");
  console.log(`server is listening to port ${port}`);
  console.log("");
});

process.on("uncaughtException", (error: any) => {
  console.log(`server is shutting down due to uncaughtException: ${error}`);
  process.exit(1);
});
process.on("unhandledRejection", (error: any) => {
  console.log(`server is shutting down due to unhandledRejection: ${error}`);
  server.close(() => {
    process.exit(1);
  });
});
