// import React from 'react'
// import "../../../../lib/home"

// import { Link } from "react-router-dom";
import { IProduct } from "../../../Models/interfaces";
import { useGetAllProductQuery } from "../../../Services/Api_Product";
import Loading from "../../Loading";

const Featured_products = () => {
    const { data: getProduct, isLoading } = useGetAllProductQuery();

    const numberFormat = (value: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);

    return (
        <div className='w-[90vw] mx-auto'>
            {isLoading ? <Loading /> :
                <div className="features-product-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Sản Phẩm Mới</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row-new">
                            <div className="product-new">
                                {getProduct?.slice(0, 4).map((product: IProduct) => {
                                    return (
                                        <div
                                            // className="col-lg-4 col-md-6"
                                            key={product._id}
                                            style={{margin: 12}}
                                        >
                                            <a href={`/product/${product._id}`}>
                                                <div className="single-product">
                                                    <div className="level-pro-new">
                                                        <span>new</span>
                                                    </div>
                                                    <div className="product-img">
                                                        <div>
                                                            <img
                                                                src={product.imgUrl?.[0]}
                                                                alt=""
                                                                className="primary-img h-[300px] w-[250px]"
                                                            />
                                                            <img
                                                                src={product.imgUrl?.[1]}
                                                                alt=""
                                                                className="secondary-img"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="actions">
                                                        <button
                                                            type="submit"
                                                            className="cart-btn"
                                                            title="Add to cart"
                                                        >
                                                            add to cart
                                                        </button>
                                                        <ul className="add-to-link">
                                                            <li>
                                                                <a
                                                                    className="modal-view"
                                                                    data-target="#productModal"
                                                                    data-bs-toggle="modal"
                                                                    href="#"
                                                                >
                                                                    {" "}
                                                                    <a href={`/product/${product._id}`}><i className="fa fa-search"></i></a>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    {" "}
                                                                    <i className="fa fa-heart-o"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    {" "}
                                                                    <i className="fa fa-refresh"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="product-price">
                                                        <div className="product-name">
                                                            <h1>{product.name}</h1>
                                                        </div>
                                                        <div className="price-rating">
                                                            <span>
                                                                {numberFormat(product.price)}
                                                            </span>
                                                            <div className="ratings">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-half-o"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Featured_products