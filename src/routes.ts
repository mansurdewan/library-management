import express from "express";
import { bookRoutes } from "./books/bookRoutes";
import { memberRoutes } from "./members/memberRoutes";

export const router = express.Router();

router.use("/api/books", bookRoutes);
router.use("/api/members", memberRoutes);
