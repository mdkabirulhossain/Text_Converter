import express from "express";
import { listPlans, subscribe } from "../controllers/subController.js";

const router = express.Router();

router.get("/plans", listPlans);
router.post("/subscribe", subscribe);

export default router;
