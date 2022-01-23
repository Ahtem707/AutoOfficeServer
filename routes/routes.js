// import express
import express from "express";
// myUnit
import { main } from "../controllers/main.js";
import { administrator } from "../controllers/administrator.js";
import { images } from "../controllers/images.js";
import authUser from "../controllers/auth/auth.js"

// init express router
const router = express.Router();

router.post('/', main);
router.post('/administrator', administrator);
router.get('/images/:dir/:imageName', images)
router.post('/authUser/:method', authUser)


const test = (req, res, next) => {

    res.json({ "this is test": "Yoohoo" })
}
router.get('/test', test)

export default router;