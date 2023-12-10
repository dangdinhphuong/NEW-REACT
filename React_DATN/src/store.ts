import { configureStore } from "@reduxjs/toolkit"
import productApi from "./Services/Api_Product"
import categoryApi from "./Services/Api_Category"
import userApi from "./Services/Api_User"
import sizeApi from "./Services/Api_Size"
import { colorApi } from "./Services/Api_Color"
import cartApi from "./Services/Api_cart"
import slideApi from "./Services/Api_Slide"
import blogApi from "./Services/Api_Blogs"
import newSletterApi from "./Services/Api_newSletter"
import orderApi from "./Services/Api_Order"
import orderItemApi from "./Services/Api_OrderItem"
import commentApi from "./Services/Api_Comment"
import discountApi from "./Services/Api_Discount"

export const store = configureStore({
  reducer: {
    products: productApi.reducer,
    category: categoryApi.reducer,
    user: userApi.reducer,
    size: sizeApi.reducer,
    colorApi: colorApi.reducer,
    cart: cartApi.reducer,
    slide: slideApi.reducer,
    order: orderApi.reducer,
    blogs: blogApi.reducer,
    newSletterApi: newSletterApi.reducer,
    orderItem: orderItemApi.reducer,
    comments: commentApi.reducer,
    discountApi: discountApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(userApi.middleware)
      .concat(sizeApi.middleware)
      .concat(colorApi.middleware)
      .concat(cartApi.middleware)
      .concat(slideApi.middleware)
      .concat(orderApi.middleware)
      .concat(newSletterApi.middleware)
      .concat(blogApi.middleware)
      .concat(orderItemApi.middleware)
      .concat(commentApi.middleware)
      .concat(discountApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
