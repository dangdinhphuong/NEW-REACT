import express from "express";
import {addOrder, getOrder} from "../controller/orderItem.js";

const router = express.Router()
router.post("/orderItem",addOrder)
router.get("/orderItem",getOrder)
export default router