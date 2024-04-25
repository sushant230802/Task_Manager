import express from 'express';
import User from '../models/user.js';
import {register,login, getMyprofile,logout} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router=express.Router();


router.get('/', (req, res) => {
    res.send('nice');
})
router.get("/me",isAuthenticated,getMyprofile)
router.post('/new',register)
router.post('/login',login)
router.get('/logout',logout);

export default router;
