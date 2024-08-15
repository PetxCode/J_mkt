import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./router/userRouter";
import productRouter from "./router/productRouter";

export const mainApp = (app: Application) => {
  app.use(cors());
  app.use(express.json());

  app.use(morgan("dev"));
  app.use(helmet());

  app.use("/api/v1", userRouter);
  app.use("/api/v1", productRouter);
  // app.use("/api/v1", storeRouter);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Api live ..............",
      });
    } catch (error) {
      return res.status(404).json({
        message: "server error",
        data: error,
      });
    }
  });
};
