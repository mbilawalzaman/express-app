import { Router } from "express";
import {
  createDevice,
  deleteDevice,
  getDeviceById,
  getDevices,
  updateDevice,
} from "../controller/deviceController.js";
import { validateIdParam, validateNameBody } from "../middleware/validateRequest.js";

const router = Router();

router.get("/", getDevices);
router.get("/:id", validateIdParam, getDeviceById);
router.post("/", validateNameBody, createDevice);
router.put("/:id", validateIdParam, validateNameBody, updateDevice);
router.delete("/:id", validateIdParam, deleteDevice);

export default router;
