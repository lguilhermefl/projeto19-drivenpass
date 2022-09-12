import { Router } from "express";
import authRouter from "./authRouter";
import credentialRouter from "./credentialRouter";
import safeNoteRouter from "./safeNoteRouter";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(safeNoteRouter);

export default router;
