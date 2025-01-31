import express from "express";
import { bookRoutes } from "./books/bookRoutes";

export const router = express.Router();

router.use("/api/books", bookRoutes);
