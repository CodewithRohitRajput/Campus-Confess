import express from "express"
import { getColleges , addCollege , getCollegeName} from "../controllers/collegeCont.ts"
import { Router } from "express"
const router = express.Router();




router.get('/get' , getColleges);
router.get('/getname/:id' , getCollegeName)

// admin only
router.post('/add-college' , addCollege )

export default router;