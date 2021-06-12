import express from "express";

import { SnippetController } from "../controllers/SnippetController";

const router = express.Router();

router.post("/save", SnippetController.save);
router.post("/get", SnippetController.get);

export default router;
