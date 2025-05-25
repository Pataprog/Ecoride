import { Router } from "express";
const router = Router();

import { guestSession } from '../middlewares/user_auth.js';


router.get('/', (req, res,next) => {
if(!req.session.user){
    req.session.user = { role: "guest" };
}
  next();

});
  