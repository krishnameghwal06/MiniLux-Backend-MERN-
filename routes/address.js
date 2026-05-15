
import express from "express";
import {
    addAddress,
    deleteAddress,
    getAllAddress,
    getSingleAddress,
} from "../controllers/address.js";
import {isAuth} from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/address/add",isAuth,addAddress);
router.get("/address/get",isAuth,getAllAddress);
router.get("/address/get/:id",isAuth,getSingleAddress);
router.delete("/address/delete/:id",isAuth,deleteAddress);

export default router;