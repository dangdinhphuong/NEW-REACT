import React, { useState } from 'react'
import {  useGetHotProductsQuery } from '../../../Services/Api_Product'
import { IProduct } from '../../../Models/interfaces';

const Hot_products = () => {
    const { data: productData, isError, isLoading }: any = useGetHotProductsQuery()
    const [currentIndex, setCurrentIndex] = useState(0);

    if (isLoading) {
        return <div>Đang tải...Sản Phẩm HOT</div>;
    }

    if (isError) {
        return <div>Error.....Sản Phẩm HOT</div>;
    }
    // Sắp xếp sản phẩm theo lượt xem giảm dần (giả sử views là thuộc tính trong đối tượng sản phẩm)
    const hotProducts = productData.slice().sort((a:any, b:any) => b.views - a.views).slice(0, 8); 
    // Số lượng sản phẩm hiển thị mỗi lần
    const itemsPerPage = 4;

    // Tính toán số trang
    const totalPages = Math.ceil(hotProducts.length / itemsPerPage);

    // Xác định chỉ mục bắt đầu và kết thúc cho danh sách sản phẩm
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = (currentIndex + 1) * itemsPerPage;

    const visibleProducts = hotProducts.slice(startIndex, endIndex);


    // Xử lý khi bấm nút "Sang trang trước" và "Sang trang sau"
    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < totalPages - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    
    return (
        <div className="w-[90vw] mx-auto">
            <div className="new-products-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Sản HOT</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="relative">
                            <div className="overflow-hidden">
                                <div className="flex justify-center">
                                    {visibleProducts.map((product: IProduct) => {
                                        return (
                                            <div className='ml-2' key={product._id}>
                                                <a href={`/product/${product._id}`} >
                                                    <div className="single-product">
                                                        <div className="level-pro-new">
                                                            <span>HOT</span>
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
                                                                        <i className="fa fa-search"></i>
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
                                                                <p>Lượt xem: {product.views}</p>
                                                            </div>
                                                            <div className="price-rating">
                                                                <span>
                                                                    {product.price}
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
                            <div className=' text-2xl'>
                                <button
                                    className="absolute top-1/2 transform -translate-y-1/2 hover:bg-gray-300 left-[-20px] rounded-full shadow cursor-pointer"
                                    onClick={handlePrevClick}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="absolute top-1/2 transform -translate-y-1/2  hover:bg-gray-300 right-[-20px] rounded-full shadow cursor-pointer"
                                    onClick={handleNextClick}
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hot_products
