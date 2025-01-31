import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// **1. Add a New Book**
export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, genre, publishedYear, totalCopies } = req.body;

    const newBook = await prisma.book.create({
      data: {
        title,
        genre,
        publishedYear,
        totalCopies,
        availableCopies: totalCopies, // Initially, all copies are available
      },
    });

    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding book" });
  }
};

// **2. Fetch All Books**
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching books" });
  }
};

// **3. Fetch a Book by ID**
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: { bookId },
    });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching book" });
  }
};

// **4. Update a Book**
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { title, genre, publishedYear, totalCopies } = req.body;

    const updatedBook = await prisma.book.update({
      where: { bookId },
      data: { title, genre, publishedYear, totalCopies },
    });

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating book" });
  }
};

// **5. Delete a Book**
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    await prisma.book.delete({
      where: { bookId },
    });

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting book" });
  }
};
