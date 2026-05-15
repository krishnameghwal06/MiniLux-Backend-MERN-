import express from "express";
import {isAuth} from "../middlewares/isAuth.js";
import  {newOrderCod,getAllOrders,getAllAdminOrders,getMyOrder,updateStatus,getStatus}  from "../controllers/order.js";

const router = express.Router();

router.post("/order/new/cod",isAuth,newOrderCod);
router.get("/order/my-orders",isAuth,getAllOrders);
router.get("/order/all-orders",isAuth,getAllAdminOrders);
router.get("/order/stats",isAuth,getStatus);
router.get("/order/:id",isAuth,getMyOrder);
router.post("/order/status/:id",isAuth,updateStatus);








export default router;