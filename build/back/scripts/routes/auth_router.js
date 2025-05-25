import { Router } from "express";
const router = Router();
router.get('/', (req, res, next) => {
    if (!req.session.user) {
        req.session.user = { role: "guest" };
    }
    next();
});
