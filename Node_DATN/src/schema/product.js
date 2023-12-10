import joi from "joi"

export const productSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Tên sản phẩm không được để trống",
    "any.required": "Trường tên sản phẩm là bắt buộc",
  }),
  original_price: joi.number().required().messages({
    "number.empty": "Giá gốc không được để trống",
    "any.required": "Trường original_price là bắt buộc",
  }),
  price: joi.number().required().messages({
    "number.empty": "Giá không được để trống",
    "any.required": "Trường price là bắt buộc",
  }),
  imgUrl: joi.array().items(joi.string()),
  description: joi.string(),
  categoryId: joi.string().required().messages({
    "string.empty": "Danh mục không được để trống",
    "any.required": "Trường categoryId là bắt buộc",
  }),
  size_id: joi.array().items(joi.string()).required().messages({
    "string.empty": "Size không được để trống",
    "any.required": "Trường size_id là bắt buộc",
  }),
  color_id: joi.array().items(joi.string()).required().messages({
    "string.empty": "Màu không được để trống",
    "any.required": "Trường color là bắt buộc",
  }),
  quantity: joi.number().required().messages({
    "number.empty": "Số lượng sản phẩm không được để trống",
    "any.required": "Trường quantity là bắt buộc",
  }),
  view: joi.number(),
  arrayColor: joi.array(),
})
