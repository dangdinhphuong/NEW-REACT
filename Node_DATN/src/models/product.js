import mongoose, { Schema } from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    imgUrl: [
      {
        type: String,
      },
    ],

    variants: [
      {
        imgUrl: [
          {
            type: String,
          },
        ],
        size_id: {
          type: Schema.Types.ObjectId,
          ref: "Size",
        },
        color_id: {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
        quantity: {
          type: Number,
        },
        inventory: {
          type: Number,
          default: 0
        },
        sell_quantity: {
          type: Number,
          default: 0
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    quantityTotal: Number, // tổng số lượng

    inventoryTotal: Number, // tổng số lượng tồn kho
    categoryId: String,
    price: Number,
    original_price: Number,
    description: String,

    views: {
      type: Number,
      default: 0,
    },

    sell_quantity : Number, // lượt bán ra
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);