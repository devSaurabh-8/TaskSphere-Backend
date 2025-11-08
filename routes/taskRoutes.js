import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = Router();
router.use(requireAuth);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
