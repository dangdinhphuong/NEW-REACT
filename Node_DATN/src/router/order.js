import express from "express";
import {
    createOrder,
    getAllOrders,
    getOneOrder,
    getOneOrders,
    getUserOrders,
    removeOrder,
    updateOrder
} from "../controller/order.js"
import { checkPermissionOrder } from "../middleware/checkPermissionOrder.js";

const router = express.Router();

router.get("/order/view", checkPermissionOrder,getUserOrders);
router.get("/order",getAllOrders);
router.get("/order/:id",checkPermissionOrder, getOneOrder);
router.get("/orders/:id", getOneOrders);
router.post("/order",checkPermissionOrder, createOrder);
router.delete("/order/:id", removeOrder);
router.patch("/orders/:id/update", updateOrder);
router.put("/order/:id/update", updateOrder);

export default router