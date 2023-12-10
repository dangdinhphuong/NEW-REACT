import { useState, useEffect } from "react"
import Select from "react-select"
import vietnamData from "../Services/vietnamData"
import { useLocation } from "react-router-dom"
import { message } from "antd"
import { useAddOrderMutation } from "../Services/Api_Order"
import { useAddOrderItemMutation } from "../Services/Api_OrderItem"
import { useCreatePaymentMutation } from "../Services/Api_VNP";
import {
  useGetDiscountsQuery,
  useUpdateDiscountMutation,
} from "../Services/Api_Discount"
import { IDiscount, IUser } from "../Models/interfaces"
import { useGetAllUserQuery, useUpdateUserMutation } from "../Services/Api_User"
import moment from "moment"
import { Modal, Table, Button } from "antd"

const Checkout = () => {
  const { data: users } = useGetAllUserQuery()
  const [updateUser] = useUpdateUserMutation()
  const [updateDiscount] = useUpdateDiscountMutation()
  // kiểm tra ng dùng có chọn sử dụng mã giảm giá không
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  const { selectedProducts } = location.state || {}
  const [addOrder, { error }] = useAddOrderMutation()
  const [messageApi, contexHolder] = message.useMessage()
  const [nameError, setNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [cityError, setCityError] = useState("")
  const [districtError, setDistrictError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const name = (document.getElementById("name") as HTMLInputElement)?.value
  const phone = (document.getElementById("phone") as HTMLInputElement)?.value
  const address = (document.getElementById("address") as HTMLInputElement)
    ?.value
  const [addOrderItem] = useAddOrderItemMutation()
  const [createPayment] = useCreatePaymentMutation()
  const [localCart, setLocalCart] = useState<any[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  )


  //-----  DISCOUNT

  const { data: discounts } = useGetDiscountsQuery()
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<IDiscount | null>(null) // Update initial state value
  const [isModalVisible, setIsModalVisible] = useState(false)
  const enteredDiscount = Array.isArray(discounts) ? discounts?.find((d) => d.code === discountCode):"không có data discount"

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const storedUser = localStorage.getItem("user")
  const emailUser = storedUser ? JSON.parse(storedUser).email : "";

  const currentUser = Array.isArray(users) ? users.find((user) => user.email === emailUser) : null;

  const handleUseDiscount = (selectedDiscount: any) => {
    // Cập nhật giá trị discountCode
    setDiscountCode(selectedDiscount.code)

    // Áp dụng mã giảm giá tự động
    setIsModalVisible(false)
  }

  const handleApplyDiscount = () => {
    if (enteredDiscount) {
      if (moment().isBefore(enteredDiscount?.startDate)) {
        message.warning("Mã giảm giá chưa đến thời gian sử dụng!")
        return
      }
      const isDiscountUsed = currentUser?.discountUsed.includes(discountCode) || false
      if (isDiscountUsed) {
        message.warning("Mã giảm giá đã được sử dụng.")
      } else if (enteredDiscount.quantity > 0) {
        if (totalPrice >= enteredDiscount.minimumOrderAmount) {
          setAppliedDiscount(enteredDiscount)
        } else {
          message.warning(
            `Giá trị đơn hàng tối thiểu phải từ ${enteredDiscount.minimumOrderAmount.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}`
          )
        }
      } else {
        message.warning("Mã giảm giá không hợp lệ!")
      }
    } else {
      message.warning("Mã giảm giá không tồn tại!")
      setAppliedDiscount(null)
    }
  }

  // tổng tiền 
  const calculateTotalPrice = () => {
    let totalPrice = Array.isArray(selectedProducts)
      ? selectedProducts.reduce(
          (acc, product) => acc + product.price,
          0
        )
      : 0

    let discountType = null
    let discountValue = 0

    if (appliedDiscount) {
      if (appliedDiscount.percentage > 0) {
        discountType = "percentage"
        discountValue = appliedDiscount.percentage
      } else if (appliedDiscount.amountDiscount > 0) {
        discountType = "amountDiscount"
        discountValue = appliedDiscount.amountDiscount
      }
    }

    if (discountType === "percentage") {
      const promotionAmount = totalPrice * (discountValue / 100)
      totalPrice -= promotionAmount
    } else if (discountType === "amountDiscount") {
      totalPrice -= discountValue
    }

    return totalPrice
  }

  const totalPrice = calculateTotalPrice()

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null)
    setDiscountCode("")
  }

  const columns = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "Mã Giảm Giá",
      dataIndex: "code",
      render: (code: string) => <p style={{}}>{code}</p>,
    },
    {
      title: "Phần trăm giảm giá",
      dataIndex: "percentage",
      render: (percentage: number) => <p style={{}}>{percentage}%</p>,
    },
    {
      title: "Số tiền giảm giá",
      dataIndex: "amountDiscount",
      render: (amountDiscount: number) => (
        <p style={{}}>
          {" "}
          {amountDiscount
            ? amountDiscount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : "0 ₫"}
        </p>
      ),
    },
    {
      title: "Giá trị tổi thiếu",
      dataIndex: "minimumOrderAmount",
      render: (minimumOrderAmount: number) => (
        <p style={{}}>
          Giá trị đơn hàng tối thiểu có thể áp dụng:{" "}
          {minimumOrderAmount
            ? minimumOrderAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : "0₫"}
        </p>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity: number) => <p style={{}}>{quantity}</p>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      render: (startDate: string) => (
        <p style={{}}>
          {moment(startDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("HH:mm A YYYY-MM-DD ")}
        </p>
      ),
    },
    {
      title: "Thời hạn sử dụng",
      dataIndex: "expiresAt",
      render: (expiresAt: string) => (
        <p style={{}}>
          {moment(expiresAt)
            .tz("Asia/Ho_Chi_Minh")
            .format("HH:mm A YYYY-MM-DD ")}
        </p>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (discount: any) => {
        return (
          <div className="">
            <button
              className="bg-[#1677ff] text-white w-[60%] h-[30px] rounded"
              onClick={() => handleUseDiscount(discount)}
            >
              Use
            </button>
          </div>
        )
      },
    },
  ]

  const dataDiscounts = Array.isArray(discounts)
    ? discounts.filter((item: IDiscount) => moment().isAfter(item.startDate))
    : []

  const subtotal = Array.isArray(selectedProducts)
    ? selectedProducts.reduce((acc, product) => acc + product.quantity, 0)
    : 0

  const handleLabelClick = () => {
    setIsVisible(!isVisible)
  }

  // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
  const getDistricts = () => {
    if (selectedCity) {
      const city = vietnamData.find((item) => item.value === selectedCity.value);
      if (city) {
        return city.districts;
      }
    }
    return null; // Hoặc trả về một mảng trống hoặc xử lý phù hợp
  };
  
  

  //validate khi người dùng nhập dữ liệu từ bàn phím
  const handleInputChange = (field: any, value: any) => {
    switch (field) {
      case "name":
        if (!value) {
          setNameError("Họ và tên không được để trống.")
        } else {
          setNameError("")
        }
        break
      case "phone":
        if (!value) {
          setPhoneError("Số điện thoại không để trống")
        } else if (!validatePhoneNumber(value)) {
          setPhoneError("Số điện thoại không hợp lệ")
        } else {
          setPhoneError("")
        }
        break
      case "address":
        if (!value) {
          setAddressError("Địa chỉ không được để trống")
        } else {
          setAddressError("")
        }
        break

      default:
        break
    }
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^0[0-9]{9}$/
    return phoneRegex.test(phoneNumber)
  }

  //validate khi người dùng click ra ngoài
  const handleInputBlur = (field: any, value: any) => {
    // Validate the field on blur
    switch (field) {
      case "name":
        if (!value) {
          setNameError("Họ và tên không được để trống.")
        } else {
          setNameError("")
        }
        break
      case "phone":
        if (!value) {
          setPhoneError("Số điện thoại không để trống")
        } else {
          setPhoneError("")
        }
        break
      case "city":
        if (!value) {
          setCityError("Vui lòng chọn tỉnh/thành phố")
        } else {
          setCityError("")
        }
        break
      case "district":
        if (!value) {
          setDistrictError("Vui lòng chọn quận/huyện")
        } else {
          setDistrictError("")
        }
        break
      case "address":
        if (!value) {
          setAddressError("Địa chỉ không được bỏ trống")
        } else {
          setAddressError("")
        }
        break
      default:
        break
    }
  }

  //handleCityChange thực hiện onChange validate kết hợp chọn select
  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption)
    setSelectedDistrict(null) // Reset lựa chọn quận/huyện khi thay đổi tỉnh/thành phố
    handleInputBlur("city", selectedOption)
  }

  //handleDistrictChange thực hiện onChange validate kết hợp chọn select
  const handleDistrictChange = (selectedOption: any) => {
    setSelectedDistrict(selectedOption)
    handleInputChange("district", selectedOption)
    handleInputBlur("district", selectedOption)
  }

  console.log(selectedProducts);
  
  // Sử lý tạo đơn hàng
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const cartId = selectedProducts.map((product: any) => product.key)
        const productId = selectedProducts.map(
          (product: any) => product.productId
        )
        const quantity = selectedProducts.map(
          (product: any) => product.quantity
        )

        if (!name || !phone || !selectedCity || !selectedDistrict || !address) {
          message.error("Vui lòng điền đầy đủ thông tin")
          return
        }

        const orderData = {
            cartId: cartId,
            products: productId.map((id: string, index: number) => ({
            productId: id,
            quantity: quantity[index],
            price: selectedProducts[index].price,
            color: selectedProducts[index].color,
            size: selectedProducts[index].size,
          })),
          name:
            (document.getElementById("name") as HTMLInputElement)?.value || "",
          phone:
            (document.getElementById("phone") as HTMLInputElement)?.value || "",
          address: {
            city: selectedCity?.label || "",
            district: selectedDistrict?.label || "",
            location:
              (document.getElementById("address") as HTMLInputElement)?.value ||
              "",
          },
          note:
            (document.getElementById("note") as HTMLTextAreaElement)?.value ||
            "",
          totalPrice: totalPrice,
        }
        if (selectedMethod == 'transfer') {
          const urlPay =  await createPayment(orderData);
          console.log('urlPay',urlPay.data.data)
          window.location.href = urlPay.data.data;
        }
        if(selectedMethod !== 'transfer'){

        await addOrder(orderData)
        if (currentUser) {
          if (discountCode) {
            updateUser({
              _id: currentUser._id,
              username: currentUser.username,
              password: currentUser.password,
              email: currentUser.email,
              discountUsed: [...currentUser.discountUsed, String(discountCode)],
            });
          }
        }
        if (enteredDiscount) {
          await updateDiscount({
            _id: enteredDiscount._id,
            percentage: enteredDiscount.percentage,
            amountDiscount: enteredDiscount.amountDiscount,
            minimumOrderAmount: enteredDiscount.minimumOrderAmount,
            quantity: enteredDiscount.quantity - 1,
          })
        }
        message.success("Đặt hàng thành công")
                  
      }
      } else {
        const cartId = selectedProducts.map((product: any) => product.key)
        const productId = selectedProducts.map(
          (product: any) => product.productId
        )
        const quantity = selectedProducts.map(
          (product: any) => product.quantity
        )

        if (!name || !phone || !selectedCity || !selectedDistrict || !address) {
          message.error("Vui lòng điền đầy đủ thông tin")
          return
        }

        const orderItemData = {
            cartId: cartId,
          products: productId.map((id: string|number, index: number) => ({
            productId: id,
            quantity: quantity[index],
            price: selectedProducts[index].price,
            color: selectedProducts[index].color,
            size: selectedProducts[index].size,
          })),
          name:
            (document.getElementById("name") as HTMLInputElement)?.value || "",
          phone:
            (document.getElementById("phone") as HTMLInputElement)?.value || "",
          address: {
            city: selectedCity?.label || "",
            district: selectedDistrict?.label || "",
            location:
              (document.getElementById("address") as HTMLInputElement)?.value ||
              "",
          },
          note:
            (document.getElementById("note") as HTMLTextAreaElement)?.value ||
            "",
          totalPrice: productId.reduce(
            (total: number, id: string, index: number) => {
              const productPrice = selectedProducts[index].price
              const productQuantity = quantity[index]
              return total + productPrice * productQuantity
            },
            0
          ),
        }
        // await addOrderItem(orderItemData)
        await addOrder(orderItemData)

        message.success("Đặt hàng thành công")
        const updatedLocalCart = localCart.filter(
          (item) => !cartId.includes(item.id)
        )
        localStorage.setItem("cart", JSON.stringify(updatedLocalCart))
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra xin vui lòng thử lại")
    }
  }

  // lựa chọn hình thức tt
  const [selectedMethod, setSelectedMethod] = useState("cod")

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value)
  }

  return (
    <div className="w-[90vw] mx-auto mt-44">
      {contexHolder}
      <div className="checkout-area">
        <div className="container">
          <h2 className="checkout_title">Checkout</h2>
          <div className="box_shadow">
            <div className="checkout_content">
              {selectedProducts &&
                Array.isArray(selectedProducts) &&
                selectedProducts.map((product: any) => (
                  <div className="checkout_products">
                    <div className="product_thumbnail">
                      <img
                        className="product_thumbnail-img"
                        src={product.imgUrl}
                        alt="product_name"
                      />
                    </div>
                    <div className="product_name">
                      <p>{product.name}</p>
                      <div className="prduct_variation">
                        <span className="product_size">
                          Size: {product.size}
                        </span>
                        <div style={{ display: "flex" }}>
                          <span>Color:</span>
                          <p
                            className="product_color"
                            style={{
                              backgroundColor: product.color,
                              width: "4%",
                              height: "15px",
                              borderRadius: "50%",
                              marginTop: 3,
                              marginLeft: 7,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div className="product_quantity">
                      <span>
                        {product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <div className="quantity" style={{ border: "none" }}>
                        <p>x{product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="coupon">
                <label htmlFor="" onClick={handleLabelClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path
                      d="M47,21a1,1,0,0,0,1-1V12a3,3,0,0,0-3-3H18a1,1,0,0,0-1,1,2,2,0,0,1-4,0,1,1,0,0,0-1-1H3a3,3,0,0,0-3,3v8a1,1,0,0,0,1,1,3,3,0,0,1,0,6,1,1,0,0,0-1,1v8a3,3,0,0,0,3,3h9a1,1,0,0,0,1-1,2,2,0,0,1,4,0,1,1,0,0,0,1,1H45a3,3,0,0,0,3-3V28a1,1,0,0,0-1-1,3,3,0,0,1,0-6Zm-1,7.9V36a1,1,0,0,1-1,1H18.87a4,4,0,0,0-7.74,0H3a1,1,0,0,1-1-1V28.9a5,5,0,0,0,0-9.8V12a1,1,0,0,1,1-1h8.13a4,4,0,0,0,7.74,0H45a1,1,0,0,1,1,1v7.1A5,5,0,0,0,46,28.9Z"
                      fill="#00ccff"
                    />
                    <path
                      d="M14 17v2a1 1 0 0 0 2 0V17A1 1 0 0 0 14 17zM14 23v2a1 1 0 0 0 2 0V23A1 1 0 0 0 14 23zM14 29v2a1 1 0 0 0 2 0V29A1 1 0 0 0 14 29zM36.29 16.29l-14 14A1 1 0 0 0 23 32c.59 0-.53.94 14.71-14.29A1 1 0 0 0 36.29 16.29zM35 25a4 4 0 1 0 4 4A4 4 0 0 0 35 25zm0 6a2 2 0 1 1 2-2A2 2 0 0 1 35 31zM25 23a4 4 0 1 0-4-4A4 4 0 0 0 25 23zm0-6a2 2 0 1 1-2 2A2 2 0 0 1 25 17z"
                      fill="#00ccff"
                    />
                  </svg>
                  Sử dụng mã giảm giá
                </label>
                {isVisible && (
                  <div className="coupon_inp">
                    <div>
                      <input
                        type="text"
                        placeholder="Mã giảm giá"
                        value={discountCode}
                        onChange={(e) => {
                          setDiscountCode(e.target.value)
                        }}
                      />
                      <button type="button" onClick={handleApplyDiscount}>
                        Áp dụng
                      </button>
                    </div>
                    <a onClick={showModal} className="cursor-pointer">
                      Danh sách mã
                    </a>
                    {appliedDiscount && (
                      <div className="py-1">
                        Mã giảm giá: {appliedDiscount.code} (
                        {appliedDiscount.percentage > 0
                          ? `Bạn được giảm ${appliedDiscount.percentage}%`
                          : appliedDiscount.amountDiscount > 0
                          ? `Bạn được giảm ${appliedDiscount.amountDiscount.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}`
                          : "Không xác định"}
                        )
                        <button onClick={handleRemoveDiscount} className="ml-2">
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="total_review">
                  <span>Tạm tính ({subtotal} sản phẩm)</span>
                  <div>
                    <span>Tổng tiền: </span>
                    <span className="text-[#f30c28] font-bold text-base">
                      {totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <form action="" className="form_checkout">
              <h3>THANH TOÁN VÀ GIAO HÀNG</h3>
              <label htmlFor="name">
                Họ và tên{" "}
                <abbr className="required" title="bắt buộc">
                  &#8727;
                </abbr>
              </label>
              <input
                className="form_checkout-inp"
                type="text"
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleInputBlur("name", name)}
                id="name"
                placeholder="Họ tên của bạn"
              />
              <p style={{ color: "red" }}>{nameError}</p>

              <label htmlFor="phone">
                Số điện thoại{" "}
                <abbr className="required" title="bắt buộc">
                  &#8727;
                </abbr>
              </label>
              <input
                className="form_checkout-inp"
                type="text"
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => handleInputBlur("phone", phone)}
                id="phone"
                placeholder="Số điện thoại của bạn"
              />
              <p style={{ color: "red" }}>{phoneError}</p>

              <div className="selections">
                <div className="selection">
                  <label htmlFor="">
                    Tỉnh/Thành phố{" "}
                    <abbr className="required" title="bắt buộc">
                      &#8727;
                    </abbr>
                  </label>
                  <Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={vietnamData}
                    placeholder="Chọn tỉnh thành phố"
                    onBlur={() => handleInputBlur("city", selectedCity)}
                  />
                </div>
                <div className="selection">
                  <label htmlFor="">
                    Quận/Huyện{" "}
                    <abbr className="required" title="bắt buộc">
                      &#8727;
                    </abbr>
                  </label>
                  <Select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    options={getDistricts() || []}
                    placeholder="Chọn quận huyện"
                    isDisabled={!selectedCity}
                    onBlur={() => handleInputBlur("district", selectedDistrict)}
                  />
                </div>
              </div>
              <p style={{ color: "red" }}>{cityError}</p>
              <p style={{ color: "red" }}>{districtError}</p>

              <label htmlFor="address">
                Địa chỉ{" "}
                <abbr className="required" title="bắt buộc">
                  &#8727;
                </abbr>
              </label>
              <input
                className="form_checkout-inp"
                type="text"
                onChange={(e) => handleInputChange("address", e.target.value)}
                onBlur={() => handleInputBlur("address", address)}
                id="address"
                placeholder="Ví dụ: Số 20, ngõ 20"
              />
              <p style={{ color: "red" }}>{addressError}</p>

              <label htmlFor="note">Ghi chú đơn hàng (tuỳ chọn)</label>
              <textarea
                id="note"
                cols={5}
                rows={2}
                placeholder="Không bắt buộc"
              ></textarea>
            </form>
            <div className="order_reviews">
              <p className="order_cart-subtotal">
                <span>Tạm tính (1 sản phẩm): {subtotal}</span>
                <span>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
              <p className="order_cart-shipping">
                <span>Giao hàng</span>
                <span>Giao hàng miễn phí</span>
              </p>
              <p className="order_cart-total">
                <span>Tổng:</span>
                <span>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
              <div className="select_payment">
                <ul>
                  <li>
                    <input
                      id="cod"
                      type="radio"
                      className="select_payment-inp"
                      name="payment_method-cod"
                      value="cod"
                      checked={selectedMethod === "cod"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="cod">Nhận hàng thanh toán (COD)</label>
                    <div
                      className="cod_extend"
                      style={{
                        display: selectedMethod === "cod" ? "block" : "none",
                      }}
                    >
                      Nhận hàng rồi thanh toán (COD)
                    </div>
                  </li>
                  <li>
                    <input
                      id="transfer"
                      type="radio"
                      className="select_payment-inp"
                      name="payment_method-transfer"
                      value="transfer"
                      checked={selectedMethod === "transfer"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="transfer">Chuyển khoản ngân hàng</label>
                    <div
                      className="transfer_extend"
                      style={{
                        display:
                          selectedMethod === "transfer" ? "block" : "none",
                      }}
                    >
                      <span>Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</span>
                      <div className="qr_code">
                        <img src="../../img/codeqr_.png" alt="" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button onClick={handlePlaceOrder}>Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Danh sách mã giảm giá"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1920}
      >
        <Table
          columns={columns}
          dataSource={dataDiscounts}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  )
}

export default Checkout
