import express from "express";
import { signIn, signUp, getUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get('/getuser/:id', getUser)
export default router;
