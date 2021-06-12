import express from "express";

import snippetRoutes from "./snippet";

const router = express.Router();

router.use("/snippet", snippetRoutes);

export default router;
