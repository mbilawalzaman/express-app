import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/userController.js";
import { validateIdParam, validateNameBody } from "../middleware/validateRequest.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateIdParam, getUserById);
router.post("/", validateNameBody, createUser);
router.put("/:id", validateIdParam, validateNameBody, updateUser);
router.delete("/:id", validateIdParam, deleteUser);

export default router;
