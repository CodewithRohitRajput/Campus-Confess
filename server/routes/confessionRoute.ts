import express from "express"
import { Router } from "express"
import { addConfession , seeConfession } from "../controllers/confessionCont.ts"
const router = express.Router();


router.post('/:collegeId/post' , addConfession);
router.get('/:collegeId/get' , seeConfession);

export default router;