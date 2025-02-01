import express from "express";
import { borrowBook, returnBook } from "./borrowController";

const router = express.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);

export const borrowRoutes = router;
