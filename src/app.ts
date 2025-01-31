import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

export default app;
