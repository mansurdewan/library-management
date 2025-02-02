import express, { Request, Response } from "express";
import { bookRoutes } from "./books/bookRoutes";
import { memberRoutes } from "./members/memberRoutes";
import { borrowRoutes } from "./borrow/borrowRoutes";

export const router = express.Router();

router.use("/api/books", bookRoutes);
router.use("/api/members", memberRoutes);
router.use("/api", borrowRoutes);
router.get("/", (res: Response, req: Request) => {
  res
    .status(200)
    .json({ success: true, message: "Well come to library management server" });
});
