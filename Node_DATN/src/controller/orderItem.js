import OrderItem from "../models/orderItem.js";


export const addOrder = async (req, res) => {
    try {
        const order = await OrderItem.create({...req.body})

        return res.status(200).json({
            message: "Tạo đơn thành công",
            order
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await OrderItem.find().sort({ createdAt: -1 })

        return res.status(200).json(order)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
