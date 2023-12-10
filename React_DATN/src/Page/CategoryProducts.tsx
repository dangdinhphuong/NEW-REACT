import React, { useState } from 'react';
import { useGetAllCategoryQuery, useGetProductsByCategoryQuery } from '../Services/Api_Category';
import { ICategory, IProduct } from '../Models/interfaces';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const ProductsCategory = () => {
  const { id } = useParams();
  const { data: ProductsCategoty, isLoading, isError } = useGetProductsByCategoryQuery(id);
    
  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    error: errorCategory
  } = useGetAllCategoryQuery();
  
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  if (isLoadingCategory) {
    return <div>Loading...</div>;
  }
  if (errorCategory) {
    return <div>Error loading products.</div>;
  }

   // Kiểm tra nếu không có sản phẩm theo category
   if (!ProductsCategoty || ProductsCategoty.length === 0) {
    return <div>Không có Sản Phẩm Theo Danh Mục</div>;
  }

  return (
    <div className="w-[90vw] mx-auto mt-36">
      <div className="product-banner">
        <img src="img/product/banner.jpg" alt="" />
      </div>
      <div className="product-main-items">
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
                    <strong> shop</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Danh mục  */}
          <div className="row">
            <div className="col-lg-3">
              <div className="product-sidebar">
                <div className="sidebar-title">
                  <h2>Danh mục sản phẩm</h2>
                </div>
                <div className="single-sidebar">
                  <div className="single-sidebar-title">
                    <h3>Sản Phảm</h3>
                  </div>
                  {/*Load dữ liệu Category */}
                  <div className="single-sidebar-content">
                    {categoryData?.map((category: ICategory) => {
                      return (
                        <ul>
                          <li key={category._id}>
                            <Link to={`/category/${category._id}/products`}>{category.name}</Link>
                          </li>
                        </ul>
                      )
                    })}
                  </div>
                </div>
                <div className="single-sidebar">
                  <div className="single-sidebar-title">
                    <h3>Màu Sắc</h3>
                  </div>
                  <div className="single-sidebar-content">
                    <ul>
                      <li>
                        <a href="#">Đen (2)</a>
                      </li>
                      <li>
                        <a href="#">Xanh (2)</a>
                      </li>
                      <li>
                        <a href="#">Đỏ (4)</a>
                      </li>
                      <li>
                        <a href="#">Trắng (2)</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-sidebar price">
                  <div className="single-sidebar-title">
                    <h3>Giá Tiền</h3>
                  </div>
                  <div className="single-sidebar-content">
                    <div className="price-range">
                      <div className="price-filter">
                        <div id="slider-range"></div>
                        <div className="price-slider-amount">
                          <input
                            type="text"
                            id="amount"
                            name="price"
                            placeholder="Nhập Giá Bạn Muốn"
                          />
                        </div>
                      </div>
                      <button type="submit">
                        {" "}
                        <span>Tìm Kiếm</span>{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="banner-left">
                  <a href="#">
                    <img src="img/product/banner_left.jpg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="product-bar">
                <div className="sort-by">
                  <label>Sort By</label>
                  <select name="sort">
                    <option value="#" selected>
                      Position
                    </option>
                    <option value="#">Name</option>
                    <option value="#">Price</option>
                  </select>
                  <a href="#" title="Set Descending Direction">
                    <img src="img/product/i_asc_arrow.gif" alt="" />
                  </a>
                </div>
                <div className="limit-product">
                  <label>Show</label>
                  <select name="show">
                    <option value="#" selected>
                      9
                    </option>
                    <option value="#">12</option>
                    <option value="#">24</option>
                    <option value="#">36</option>
                  </select>
                  per page
                </div>
              </div>
              {/* Nhập dữ liệu category */}
              <div className="row">
                <div className="product-content">
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane fade home2 active show"
                      id="gird"
                    >
                      <div className="row">
                        {ProductsCategoty?.map((product: IProduct) => {
                          return (
                            <div
                              className="col-lg-4 col-md-6"
                              key={product._id}
                            >
                              <div className="single-product">
                                <div className="level-pro-new">
                                  <span>new</span>
                                </div>
                                <div className="product-img">
                                  <a href="single-product.html">
                                    <img
                                      src={product.imgUrl[0]}
                                      alt=""
                                      className="primary-img h-[300px] w-[250px]"
                                    />
                                    <img
                                      src="img/product/26.png"
                                      alt=""
                                      className="secondary-img"
                                    />
                                  </a>
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
                                    <a
                                      href="single-product.html"
                                      title="Fusce aliquam"
                                    >
                                      {product.name}
                                    </a>
                                  </div>
                                  <div className="price-rating">
                                    <span>{numberFormat(product.price)}</span>
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="toolbar-bottom">
                    <ul>
                      <li>
                        <span>Pages:</span>
                      </li>
                      <li className="current">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <img
                            src="img/product/pager_arrow_right.gif"
                            alt=""
                          />{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCategory;
