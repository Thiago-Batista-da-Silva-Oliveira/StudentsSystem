import express from "express";
import { register,getStudents,StudentGrade,DeleteStudent} from "../controllers/students.js";




const router = express.Router();

router.post('/', register )
router.get('/:studentclass', getStudents)
router.patch('/:id', StudentGrade)
router.delete('/:id', DeleteStudent)

export default router