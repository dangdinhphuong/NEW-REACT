import mongoose, { Schema } from "mongoose"

const productDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    original_price: {
      type: Number,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    imgUrl: [
      {
        type: String,
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    size_id: {
        type: Schema.Types.ObjectId,
        ref: "Size",
      },
      color_id: {
        type: Schema.Types.ObjectId,
        ref: "Color",
      },
 
    quantity: Number,
    views: {
      type: Number,
      default: 0,
    },
    inventory_number: Number, // số lượng tồn kho
    quantity_sold: Number, // số lượng đã bán
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.model("ProductDetails", productDetailsSchema)
