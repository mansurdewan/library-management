import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addMember = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const newMember = await prisma.member.create({
      data: { name, email, phone },
    });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: "Failed to add member" });
  }
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const member = await prisma.member.findUnique({
      where: { memberId },
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch member" });
  }
};

/**  Update Member */
export const updateMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const { name, email, phone } = req.body;

    const updatedMember = await prisma.member.update({
      where: { memberId },
      data: { name, email, phone },
    });

    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ error: "Failed to update member" });
  }
};

/**  Delete Member */
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    await prisma.member.delete({
      where: { memberId },
    });

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete member" });
  }
};
