export interface IProduct {
  _id?: string | number
  name: string
  original_price: number
  price: number
  description?: string
  imgUrl: string[]
  categoryId: string
  variants?: [
    {
      size_id: string[],
      color_id: string[],
      quantity?: number[]
    }
  ]
  inventoryTotal: number // tổng tồn kho
  sell_quantity: number // tổng bán ra
  discount_code_id?: string
  poinId?: string
  views?: number
}

export interface ICategory {
  _id?: number | string
  name: string
  imgUrl?: string
}

export interface IUser {
  _id?: number | string
  username: string
  email?: string
  password: string
  confirmPassword?: string
  gender?: string
  phone?: string
  address?: string
  imgUrl?: string
  discountUsed?: any
}
export interface IColor {
  _id: string
  name: string
  unicode: string
}

export interface ISize {
  _id?: number | string
  name: string
}

export interface ProductItem {
  productId: string;
  imgUrl: string[],
  quantity: number;
  color: string,
  size: string,
  price: number
}

export interface ISlider {
  _id?: string
  id?: string
  titleSlider: string
  contentSlider: string
  imgSlider: string
  productId: string
  quantity: number
  color: string
  size: number
}

export interface Cart {
  products: ProductItem[]
  userId?: string
}

export interface INewSletter {
  _id?: string
  email: string
}
export interface ISlider {
  _id?: string
  id?: string
  titleSlider: string
  contentSlider: string
  imgSlider: string
}
export interface IBlog {
  _id?: number | string
  title: string
  imgUrl: any[]
  description: string
  author: string
  createdAt?: string
  updatedAt?: string
}
// export interface IOrder {
//   _id?: string | number
//   phone: string
//   note?: string
//   status: string
//   discount: string
//   methodPayment: string
//   quantity: number
//   totalPrice: number
//   address: {
//     city: string
//     location: string
//     district: string
//   }
//   userID: string
//   codeID: string
// }
export interface IDiscount {
  _id?: string
  code?: string
  percentage: number
  amountDiscount: number
  minimumOrderAmount: number
  quantity: number
  startDate?: Date
  expiresAt?: Date
}

export interface IOrder {
  _id?: string
  userId?: any
  name: string
  cartId: string[]
  products: {
    productId: {
      _id: string
      name: string
      original_price: number
      price: number
      description: string
      imgUrl: string[]
      categoryId: string
      size_id: string[]
      color_id: string[]
      quantity: number
      createdAt: string
      updatedAt: string
      views: number
    }
    quantity: number
    price: number
    color: string
    size: number
    _id: string
  }[]
  phone: string
  note?: string
  status: string
  address: {
    city: string
    location: string
    district: string
  }
  totalPrice: number
  code_order: string
  createdAt: string
  updatedAt: string
}
