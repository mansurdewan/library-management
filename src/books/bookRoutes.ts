import express from "express";
import {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookById,
} from "./bookController";

const router = express.Router();

router.post("/", addBook);
router.get("/", getAllBooks);
router.get("/:bookId", getBookById);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export const bookRoutes = router;
