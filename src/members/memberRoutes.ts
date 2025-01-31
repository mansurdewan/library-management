import express from "express";
import {
  addMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "./memberController";

const router = express.Router();

router.post("/", addMember);
router.get("/", getAllMembers);
router.get("/:memberId", getMemberById);
router.put("/:memberId", updateMember);
router.delete("/:memberId", deleteMember);

export const memberRoutes = router;
