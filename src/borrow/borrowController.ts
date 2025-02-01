import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, memberId } = req.body;

    // Check if book exists
    const book = await prisma.book.findUnique({ where: { bookId } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if book is available
    if (book.availableCopies <= 0) {
      return res
        .status(400)
        .json({ message: "This book is currently unavailable for borrowing." });
    }

    // Check if member exists
    const member = await prisma.member.findUnique({ where: { memberId } });
    if (!member) return res.status(404).json({ message: "Member not found" });

    // Create borrow record
    const borrowRecord = await prisma.borrowRecord.create({
      data: {
        bookId,
        memberId,
      },
    });

    // Decrease available copies
    await prisma.book.update({
      where: { bookId },
      data: { availableCopies: book.availableCopies - 1 },
    });

    return res
      .status(201)
      .json({ message: "Book borrowed successfully", borrowRecord });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Return a book
export const returnBook = async (req: Request, res: Response) => {
  try {
    const { bookId, memberId } = req.body;

    // Find the borrow record
    const borrowRecord = await prisma.borrowRecord.findFirst({
      where: { bookId, memberId, returnDate: null },
    });

    if (!borrowRecord) {
      return res.status(404).json({
        message: "No active borrow record found for this book and member",
      });
    }

    // Update borrow record with return date
    await prisma.borrowRecord.update({
      where: { id: borrowRecord.id },
      data: { returnDate: new Date() },
    });

    // Increase available copies
    const book = await prisma.book.findUnique({ where: { bookId } });
    if (book) {
      await prisma.book.update({
        where: { bookId },
        data: { availableCopies: book.availableCopies + 1 },
      });
    }

    return res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
