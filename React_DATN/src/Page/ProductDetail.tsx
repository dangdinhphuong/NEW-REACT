import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { useParams } from "react-router-dom";
import {
  useGetOneProductQuery,
  useGetAllProductQuery,
} from "../Services/Api_Product";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAddToCartMutation, useGetCartQuery } from "../Services/Api_cart";
import { ProductItem } from "../Models/interfaces";
import { useGetAllSizeQuery } from "./../Services/Api_Size"
import { Button, Modal, message } from "antd"
import Loading from "../Component/Loading";
import { useCreateCommentMutation, useDeleteCommentByAdminMutation, useDeleteCommentByIdUserMutation, useGetCommentsByProductIdQuery, useUpdateCommentByIdMutation } from "../Services/Api_Comment";
import { useGetUserOrdersQuery } from "../Services/Api_Order";
import { MdDeleteForever } from "react-icons/md";
import { FaTools } from "react-icons/fa";


type Variant = {
  color_id: {
    unicode: string;
  };
  size_id: {
    name: string;
  };
  // Other properties of your variant
}

const ProductDetail = () => {
  // state Swiper
  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);
  const [indexSlider, setIndexSlider]: any = useState(0);
  const [getQuantityBuy, setQuantityBuy]: any = useState(1);
  const [getSizeByColor, setSizeByColor]: any = useState([]);
  const [getColor, setColor]: any = useState("");
  const [getSize, setSize]: any = useState("");
  const { id } = useParams();
  const { data: allProducts }: any = useGetAllProductQuery();
  const { data: productDataOne, isLoading: isLoadingProduct }: any = useGetOneProductQuery(id || "");
  const [addToCart] = useAddToCartMutation()
  const { data: cartData, error } = useGetCartQuery()
  const { data: getAllSize } = useGetAllSizeQuery()
  const [imgUrl, setImgUrl] = useState<any[]>([]);


  
  useEffect(() => {
    let arrSize = [];
    arrSize = productDataOne?.variants.map((variant: any) => {
      if(variant.color_id.unicode === getColor){
        return variant.size_id.name;
      }
    });

    setSizeByColor(arrSize);
  }, [getColor]);

  let arrayPR: any = [];
  const arrayRelate = productDataOne?.categoryId.products;
  if (arrayRelate) {
    for (let i = 0; i < arrayRelate.length; i++) {
      allProducts?.map((product: any) => {
        if (product._id == arrayRelate[i]) {
          arrayPR.push(product);
        };
      });
    };
  };
  arrayPR = arrayPR.filter((item: any) => item._id != id);

  const ChooseColor = (color: any, indColor: number) => {
    setColor(color);
    setIndexSlider(indColor);
  
    // Find the corresponding image URL for the selected color
    const selectedVariant = productDataOne?.variants.find(
      (variant: any) => variant.color_id.unicode === color
    );
    const selectedImgUrl = selectedVariant ? selectedVariant.imgUrl : "";
  
    setImgUrl(selectedImgUrl);
    
    const sizesForColor = productDataOne?.variants
      .filter((variant: any) => variant.color_id.unicode === color)
      .map((variant: any) => variant.size_id.name);
  
    setSizeByColor(sizesForColor);
  };


  const ChooseSize = (size: any) => {
    setSize(size);
  };

  const Minus = () => {
    getQuantityBuy > 1 && setQuantityBuy(getQuantityBuy - 1)
  };
  const Plus = () => {
    setQuantityBuy(getQuantityBuy + 1)
  };


  const handleAddToCart = () => {
    if (!productDataOne || getQuantityBuy < 1 || !getColor || !getSize) {
      message.error("Vui lòng chọn đầy đủ thông tin sản phẩm");
      return;
    }

    const selectedVariant = productDataOne?.variants.find(
      (variant:Variant) => variant.color_id.unicode === getColor && variant.size_id.name === getSize
    );
  
    if (!selectedVariant) {
      message.error("Không tìm thấy biến thể phù hợp. Vui lòng kiểm tra lại.");
      return;
    }
  
    const totalAvailableQuantity = selectedVariant.quantity;
  
    if (getQuantityBuy < 1 || getQuantityBuy > totalAvailableQuantity) {
      message.error(`Số lượng không được vượt quá ${totalAvailableQuantity}`);
      return;
    }

    //Kiểm tra token
    const isAuthenticated = localStorage.getItem("token");

    if (isAuthenticated) {

      // thực hiện lần đầu tiên kiểm tra khi tài khoản chưa thêm vào giỏ hàng thực hiện thêm mới
      if (cartData === undefined || cartData?.products.length === 0) {
         addToCart({
          productId: productDataOne._id,
          imgUrl: imgUrl,
          color: getColor,
          size: getSize,
          quantity: getQuantityBuy,
          price: productDataOne.price * getQuantityBuy
        })

        message.success("Đã thêm sản phẩm vào giỏ hàng")
      } else {
        const productItemIndex = cartData.products.findIndex((product: any) => product.productId._id == productDataOne._id && product.color == getColor && product.size == getSize);
        console.log(productItemIndex);

        const productItem = cartData.products[productItemIndex];
        if (productItemIndex !== -1) {
          const updatedProductItem = { ...productItem }; // Tạo bản sao của productItem
          addToCart({
            productId: updatedProductItem.productId._id,
            imgUrl: imgUrl,
            color: updatedProductItem.color,
            size: updatedProductItem.size,
            quantity: getQuantityBuy,
            price: productDataOne.price
          });
          message.success("Đã thêm sản phẩm vào giỏ hàng")
        } else {
          addToCart({
            productId: productDataOne._id,
            imgUrl: imgUrl,
            color: getColor,
            size: getSize,
            quantity: getQuantityBuy,
            price: productDataOne.price * getQuantityBuy
          })
          message.success("Đã thêm sản phẩm vào giỏ hàng")
        }
      }
    } else {
      // Xử lý khi chưa đăng nhập, tương tự như trước
      const existingCartJSON = localStorage.getItem('cart');
      const existingCart = existingCartJSON ? JSON.parse(existingCartJSON) : [];
      console.log(existingCart);


      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingProductIndex = existingCart.findIndex(
        (item: any) =>
          item.productId === productDataOne._id &&
          item.color === getColor &&
          item.size === getSize
      );

      const maxId = existingCart.reduce((max: any, item: any) => (item.id > max ? item.id : max), 0);
      const newId = maxId + 1;

      if (existingProductIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng với cùng productId, color và size
        // Chỉ cập nhật giá trị quantity cho sản phẩm này
        existingCart[existingProductIndex].quantity += getQuantityBuy;
        existingCart[existingProductIndex].price += existingCart[existingProductIndex].priceItem *getQuantityBuy;

      } else {
        // Nếu sản phẩm không tồn tại trong giỏ hàng, tạo sản phẩm mới và thêm vào mảng giỏ hàng
        existingCart.unshift({
          id: newId,
          productId: productDataOne._id,
          name: productDataOne.name,
          imgUrl: imgUrl,
          quantity: getQuantityBuy,
          color: getColor,
          size: getSize,
          price: productDataOne.price*getQuantityBuy,
          priceItem: productDataOne.price
        });
      }

      // Cập nhật localStorage với giỏ hàng mới
      localStorage.setItem('cart', JSON.stringify(existingCart));
      message.success("Sản phẩm đã được thêm vào giỏ hàng của bạn (chưa đăng nhập).");
    }
  };


  const uniqueColorIds: string[] = [];

  const uniqueColorButtons = productDataOne?.variants.reduce(
    (buttons: any, variant: any, indColor: number) => {
      const colorId = variant.color_id?.unicode;

      if (colorId && Array.isArray(uniqueColorIds) && !uniqueColorIds.includes(colorId)) {
        uniqueColorIds.push(colorId);

        buttons.push(
          <button
            key={colorId}
            onClick={() => ChooseColor(colorId, indColor + 1)}
            className={`w-8 h-8 rounded-full border ${getColor === colorId ? 'border-solid border-3 border-red' : ''
              }`}
            style={{ background: variant.color_id?.unicode}}
          ></button>
        );

      }

      return buttons;
    }, []);


    // nhập số lượng
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseInt(e.target.value, 10);
      
      // Kiểm tra xem inputValue có phải là số hợp lệ và nằm trong phạm vi cho phép không
      if (!isNaN(inputValue) && inputValue >= 1) {
        setQuantityBuy(inputValue);
      }
    };


     // comment
  // console.log("productId", id);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const userObj = JSON.parse(storedUser);

      setCurrentUser(userObj)
    }
  }, []);

  // console.log("currentUser", currentUser);





  const [content, setContent] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [messagecm, setMessagecm] = useState('');
  const [isLoadingcm, setIsLoadingcm] = useState(false);
  const { data: comments, refetch } = useGetCommentsByProductIdQuery(id);
  const [deleteCommentById] = useDeleteCommentByAdminMutation(); //delete của admin

  // console.log("comments", comments)

  const { data: order } = useGetUserOrdersQuery();
  // console.log("data_", order);

  

  const hasPurchased = order?.some((order: any) => {
    
    return (
      order.userId?._id === currentUser?._id &&
      order.products.some((product: any) => product.productId?._id === id)
    );
  });
  // console.log("hasPurchased", hasPurchased);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasPurchased) {
      const purchasedOrder = order?.find((order: any) => {
        return (
          order.userId?._id === currentUser?._id &&
          order.products.some((product: any) => product.productId?._id === id)
        );
      });

      if (purchasedOrder) {
        // setMessagecm('Người dùng đã đặt mua sản phẩm này');
        const orderId = purchasedOrder._id;
        // setMessagecm(`OrderId của đơn hàng đã mua: ${orderId}`);

        // Gửi yêu cầu tạo bình luận với orderId
        createComment({ userId: currentUser?._id, productId: id, orderId, content })
          .unwrap()
          .then((response) => {
            // Xử lý phản hồi thành công
            console.log('Bình luận đã được tạo:', response);
            // Cập nhật danh sách bình luận hiển thị
            refetch();
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error('Đã xảy ra lỗi khi tạo bình luận:', error);
            setMessagecm(error.data.message)
          });
      } else {
        setMessagecm('Không tìm thấy thông tin đơn hàng đã mua');
      }
    } else {
      setMessagecm('Bạn chưa mua sản phẩm này. Hãy mua sản phẩm để có thể bình luận!');
    }

    // Đặt lại nội dung bình luận
    setContent('');
  };

  // xóa comment cho admin 
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const handleDeleteComment = (commentId: any) => {
    setDeletingCommentId(commentId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      deleteCommentById(deletingCommentId)
        .unwrap()
        .then(() => {
          message.success("Xóa thành công")
          // Cập nhật danh sách bình luận hiển thị
          refetch();
        })
        .catch((error) => {
          console.error('Lỗi khi xóa bình luận:', error);
        });
    }

    setIsDeleteModalVisible(false);
  };

  // cập nhật + xóa bình luận cho user
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteCommentUserModalVisible, setIsDeleteCommentUserModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const [updateCommentByIdMutation] = useUpdateCommentByIdMutation();
  const [deleteCommentByIdUserMutation] = useDeleteCommentByIdUserMutation();

  const handleDeleteCommentUser = (commentId: any) => {
    setSelectedComment(commentId);
    setIsDeleteCommentUserModalVisible(true);
  };

  const handleUpdateComment = (comment: any) => {
    setSelectedComment(comment);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateConfirmation = (commentId: any, content: string) => {
    // console.log("content", content);

    updateCommentByIdMutation({ id: commentId, content, userId: currentUser?._id })
      .unwrap()
      .then(() => {
        setIsUpdateModalVisible(false);
        message.success("Cập nhật bình luận thành công");
        refetch();
      })
      .catch((error) => {
        console.error('Failed to update comment:', error);
      });
  };

  const handleDeleteCommentUserConfirmation = (confirmDelete: any) => {
    if (confirmDelete) {
      deleteCommentByIdUserMutation(selectedComment)
        .unwrap()
        .then(() => {
          setIsDeleteCommentUserModalVisible(false);
          message.success("Xóa bình luận thành công");
          refetch();
        })
        .catch((error) => {
          console.error('Failed to delete comment:', error);
        });
    } else {
      setIsDeleteCommentUserModalVisible(false);
    }
  };

  const [updatedContent, setUpdatedContent] = useState('');
  return (
    <div>
      {isLoadingProduct ? <Loading /> : <div className="w-[90vw] mx-auto mt-36 relative">
        <div className="Single-product-location home2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="location">
                  <ul>
                    <li>
                      <a href="index.html" title="go to homepage">
                        Home<span>/</span>
                      </a>{" "}
                    </li>
                    <li>
                      <strong>{productDataOne?.name}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* detail */}
        <div className="single-product-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="single-product-img tab-content">
                  <Swiper
                    key={indexSlider}
                    style={
                      {
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      } as React.CSSProperties
                    }
                    spaceBetween={5}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                    initialSlide={indexSlider}
                  >
                    {productDataOne?.imgUrl.map((itemImg: any, index: any) => (
                      <SwiperSlide key={index} >
                        <img src={productDataOne?.imgUrl[index]} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="nav product-page-slider">
                  <Swiper
                    onSwiper={(swiper) => {
                      setThumbsSwiper(swiper)
                    }}
                    spaceBetween={5}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {productDataOne?.imgUrl.map((itemImg: any, index: any) => (
                      <SwiperSlide key={index}>
                        <img src={productDataOne?.imgUrl[index]} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="single-product-details">
                  <p className="product-name">{productDataOne?.name}</p>
                  <div className="list-product-info">
                    <div className="price-rating">
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <a href="#" className="review">
                          <p>Số lượt truy cập: {productDataOne?.views}</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="avalable">
                    <p>
                      Tình trạng: <span> {productDataOne?.quantity > 0 ? "còn hàng" : "hết hàng"}</span>
                    </p>
                    <p>
                      Số lượng: <span className="text-gray-600"> {productDataOne?.inventory}</span>
                    </p>
                  </div>
                  <div className="item-price flex space-x-2">
                    <span>{productDataOne?.price.toLocaleString()} (VND)</span>
                    <p className="text-red-500 text-xs">{productDataOne?.original_price > productDataOne?.price && productDataOne?.original_price > 0 ? "Đại hạ giá" : "Sản phẩm đang hot"}</p>
                    {productDataOne?.original_price > 0 && <p className="text-xs"><del>{productDataOne?.original_price.toLocaleString()} (VND)</del></p>}
                  </div>
                  <div className="single-product-info">
                    <p>{productDataOne?.description}</p>
                    <div className="share">
                      <img src="img/product/share.png" alt="" />
                    </div>
                  </div>


                  <h3 className="-mt-4">Chọn màu:</h3>
                  <div className="flex space-x-2 my-4">{uniqueColorButtons}</div>


                  <div className="select-catagory">
                    <div>
                      <h3 className="mt-3">Chọn kích cỡ:</h3>
                      <div className="mb-3 space-x-3 flex">
                        {getAllSize ? (
                          getAllSize?.map((size: any) => (
                            <button
                              disabled={!getColor || !getSizeByColor.includes(size.name)}
                              style={{ marginRight: 10 }}
                              onClick={() => ChooseSize(size.name)}
                              className={`w-14 h-7 cursor-pointer relative border-[1px] text-center ${
                                getSize === size.name ? 'border-green-600' : '' 
                              } ${
                                  getColor && getSizeByColor.includes(size.name) ?  'bg-transparent' : 'bg-slate-300'
                              }`}
                            >
                              <p>{size.name}</p>
                              {getSize === size.name && (
                                <img
                                  className="absolute top-[-7px] right-[-5px] w-3 h-3"
                                  src="../../img/icons/correct.png"
                                  alt=""
                                />
                              )}
                            </button>
                          ))
                        ) : (
                          <p>Loading...</p>
                        )}
                        {/* {productDataOne?.variants
                      .filter((variant: any) => variant.color_id.unicode === getColor)
                      .map((filteredVariant: any) => (
                        <div className="flex" key={filteredVariant._id}>
                          {filteredVariant.size_id._id  && (
                            <div
                              style={{ marginRight: 10 }}
                              onClick={() => ChooseSize(filteredVariant.size_id.name)}
                              className={`w-14 h-7 cursor-pointer relative border-[1px] text-center ${
                                getSize === filteredVariant.size_id.name ? 'border-green-600' : ''
                              }`}
                            >
                              <p>{filteredVariant.size_id.name}</p>
                              {getSize === filteredVariant.size_id.name && (
                                <img
                                  className="absolute top-[-7px] right-[-5px] w-3 h-3"
                                  src="../../img/icons/correct.png"
                                  alt=""
                                />
                              )}
                            </div>
                          )}
                        </div>
                      ))} */}
                      </div>
                    </div>
                  </div>



                  <div className="cart-item">
                    <div className="price-box">
                      {/* <span>
                      Price: <span></span>
                    </span> */}
                    </div>
                    <div className="single-cart">
                      <div className="cart-plus-minus">
                        <div className="quantity-cart">
                          <span style={{ fontSize: "16px" }}>Số lượng: </span>
                          <div className="inp_group">
                            <button>
                              <MinusOutlined className="borderQuantity p-[3px] mt-1 border" onClick={() => Minus()} />
                            </button>
                            <input
                              className="cart-plus-minus-box outline-0 h-10"
                              type="text"
                              name="qtybutton"
                              // readOnly
                              id="quanityBuy"
                              value={getQuantityBuy}
                              // max={productDataOne?.quantity}
                              min={1}
                              onChange={(e) => handleQuantityChange(e)}
                            />
                            <button>
                              <PlusOutlined className="borderQuantity p-[3px] mt-1 border" onClick={() => Plus()} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button className="cart-btn" onClick={handleAddToCart}>Thêm vào giỏ</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mô tả + đánh giá + comment */}
         {/* mô tả + đánh giá + comment */}
         <div className="single-product-tab-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="single-product-tab">
                  <ul
                    className="nav single-product-tab-navigation"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        className="active"
                        href="#tab1"
                        aria-controls="tab1"
                        role="tab"
                        data-bs-toggle="tab"
                      >
                        Product Description
                      </a>
                    </li>
                  </ul>

                  {/* <!-- Tab panes --> */}
                  <div className="tab-content single-product-page">
                    <div
                      role="tabpanel"
                      className="tab-pane fade show active"
                      id="tab1"
                    >
                      <div className="single-p-tab-content">
                        <p>
                          Nunc facilisis sagittis ullamcorper. Proin lectus ipsum,
                          gravida et mattis vulputate, tristique ut lectus. Sed et
                          lorem nunc. Vestibulum ante ipsum primis in faucibus
                          orci luctus et ultrices posuere cubilia Curae; Aenean
                          eleifend laoreet congue. Vivamus adipiscing nisl ut
                          dolor dignissim semper. Nulla luctus malesuada
                          tincidunt. Class aptent taciti sociosqu ad litora
                          torquent per conubia nostra, per inceptos himenaeos.
                          Integer enim purus, posuere at ultricies eu, placerat a
                          felis. Suspendisse aliquet urna pretium eros convallis
                          interdum. Quisque in arcu id dui vulputate mollis eget
                          non arcu. Aenean et nulla purus. Mauris vel tellus non
                          nunc mattis lobortis.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="single-product-tab-area cm">
          <h2 className="cm_title">Comments</h2>

          <div className="comments">
            {comments?.map((comment: any) => (
              <div className="comment_detail" key={comment._id}>
                <div className="comment_detail_header">
                  <div className="user_cm">
                    <img className="user_cm_avt" src={comment.userId.imgUrl} alt="" />
                    <div className="user_cm_inf">
                      <p className="user_cm_name">@ {comment.userId.username}</p>
                      <p className="date_created">{comment.createdAt}</p>
                    </div>
                  </div>
                  {currentUser && currentUser?.role == 'admin' ? (
                    <div className="favorites">
                      <p onClick={() => handleDeleteComment(comment._id)}><MdDeleteForever /> <span>Delete</span></p>
                    </div>
                  ) : (
                    currentUser && currentUser?._id === comment.userId._id && (
                      <div>
                        <div className="favorites">
                          <p style={{ border: 'none' }} onClick={() => handleUpdateComment(comment)}><FaTools style={{ color: '#18a3f4' }} /> <span style={{ color: '#18a3f4' }}>Sửa</span></p>
                        </div>

                        <div className="favorites">
                          <p style={{ border: 'none' }} onClick={() => handleDeleteCommentUser(comment._id)}><MdDeleteForever /> <span>Xóa</span></p>
                        </div>

                        <Modal
                          title="Xác nhận xóa"
                          visible={isDeleteCommentUserModalVisible}
                          onOk={() => handleDeleteCommentUserConfirmation(true)}
                          onCancel={() => handleDeleteCommentUserConfirmation(false)}
                          okText="Xóa"
                          cancelText="Hủy"
                          okButtonProps={{ style: { backgroundColor: 'red' } }}
                        >
                          Bạn có chắc chắn muốn xóa không?
                        </Modal>

                        <Modal
                          title="Cập nhật bình luận"
                          visible={isUpdateModalVisible}
                          onOk={() => handleUpdateConfirmation(comment._id, updatedContent)}
                          onCancel={() => setIsUpdateModalVisible(false)}
                          okText="Cập nhật"
                          cancelText="Hủy"
                          style={{ marginTop: '140px' }}
                        >
                          <textarea
                            style={{ padding: '10px 20px', outline: 'auto', width: '100%' }}
                            value={updatedContent || comment?.content}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                          />
                        </Modal>

                      </div>
                    )
                  )}
                  <Modal
                    title="Xác nhận xóa"
                    visible={isDeleteModalVisible}
                    onOk={() => handleDeleteConfirmation(true)}
                    onCancel={() => handleDeleteConfirmation(false)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ style: { backgroundColor: "red" } }}
                  >
                    Chắc chắn muốn xóa comment của user này không?
                  </Modal>

                </div>
                <div className="comment_content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}

            <div className="comment_form">
              {currentUser?._id ?
                (<form onSubmit={handleSubmit}>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your comment" maxLength={200} cols={110} rows={2} />
                  <button type="submit" disabled={isLoadingcm}>Send</button>
                  {messagecm && <p>{messagecm}</p>}
                </form>) : (<p>Vui lòng đăng nhập để bình luận.</p>)}


            </div>
          </div>

        </div>
        {/* ============================================ khu SP liên quan */}
        <div className="container mb-20 productsRelative text-black">
          <h3 style={{ marginTop: '300px' }}>Sản phẩm liên quan</h3>
          <div className={`productShow mt-4 flex flex-wrap space-x-5 ${arrayPR.length > 3 ? "justify-center" : ""}`}>
            {arrayPR.length ? arrayPR?.map((items: any) => {
              return (
                <div className="border rounded-2xl w-56 m-2 relative" key={items._id}>

                  <Link to={`/product/${items._id}`}><img className="w-56 h-48 rounded-lg hover:scale-110 duration-200" src={items.imgUrl[0]} alt="" /></Link>
                  <p className="ml-2  text-gray-500">{items.name} <span className="float-right mr-2 text-gray-400 text-xs mt-2">SL: {items.quantity}</span></p>
                  <div className="flex space-x-2">
                    <p className="text-xs ml-2">{items.price.toLocaleString()} (VND)</p>
                    {items.original_price > 0 && <p className="text-xs"><del>{items.original_price.toLocaleString()}</del></p>}
                    {
                      items.original_price > items.price ?
                        <img className=" absolute w-10 top-2" src="../../img/IMAGE_CREATED/sale.png" alt="" />
                        :
                        ""
                    }
                  </div>
                </div>
              )
            }) : arrayPR.length > 0 ? "...loading" : <p className="text-center text-red-500">Hiện chưa có sản phẩm cùng loại !</p>}
          </div>
        </div>
      </div>}
    </div >

  );
};

export default ProductDetail;