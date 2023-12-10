import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="footer-top-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-contact">
                                <img src="../../../img/logo_DATN.png" className='w-[200px]' />
                                <p>Hệ thống giày sneaker tại Hà Nội</p>
                                <ul className="address">
                                    <li>
                                        <span className="fa fa-home" />
                                        Xuân Phương, Nam Từ Liêm, Hà Nội
                                    </li>
                                    <li>
                                        <span className="fa fa-phone" />
                                        (800) 123 456 789
                                    </li>
                                    <li>
                                        <span className="fa fa-envelope-o" />
                                        admin@bootexperts.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="">
                                <p className="font-semibold text-lg mb-4 text-center ">Phương thức thanh toán</p>
                                <div className="grid grid-cols-5 gap-2 ">
                                    <img className="border border-black rounded-lg" src="../../../img/agribank.png" alt="" />
                                    <img className="border  rounded-lg" src="../../../img/teckcombank.jpg" alt="" />
                                    <img className="border  rounded-lg" src="../../../img/imagesStar.jpg" alt="" />
                                    <img className="border  rounded-lg" src="../../../img/momo.png" alt="" />
                                    <img className="border  rounded-lg" src="../../../img/unnamed.png" alt="" />
                                </div>
                                <div className="contents">
                                    <p className="text-bold text-lg mb-3">Dịch vụ giao hàng</p>
                                    <img className="bg-blue-400 border rounded-lg w-[200px]" src="../../../img/freeship.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-support">
                                <div className="footer-title">
                                    <h3>Hỗ Trợ Khách Hàng</h3>
                                </div>
                                <div className="footer-menu">
                                    <ul>
                                        <li><a href="#">Sẽ Hiện bài blog hướng dẫn hỗ trợ</a></li>
                                        <li><a href="#">Sẽ Hiện bài blog hướng dẫn hỗ trợ</a></li>
                                        <li><a href="#">Sẽ Hiện bài blog hướng dẫn hỗ trợ</a></li>
                                        <li><a href="#">Sẽ Hiện bài blog hướng dẫn hỗ trợ</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <div className="footer-title">
                                    <h3>DỊCH VỤ KHÁC HÀNG</h3>
                                </div>
                                <div className="footer-menu">
                                    <ul>
                                        <li><a href="#">Chính sách đổi trả</a></li>
                                        <li><a href="#">Chính sách đổi trả</a></li>
                                        <li><a href="#">Chính sách đổi trả</a></li>
                                        <li><a href="#">Chính sách đổi trả</a></li>
                                        <li><a href="#">Chính sách đổi trả</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-copyright">
                                <p>Copyright © 2022 <a href="#"> Bootexperts</a>. All Rights Reserved</p>
                            </div>
                        </div>

                    </div>
                </div>
                <a href="#" id="scrollUp"><i className="fa fa fa-arrow-up" /></a>
            </footer> */}
            {/* <div id="quickview-wrapper">
              
                <div className="modal fade" id="productModal" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-product">
                                    <div className="product-images">
                                        <div className="main-image images">
                                            <img src="img/product/quick-view.jpg" />
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h1>Diam quis cursus</h1>
                                        <div className="price-box">
                                            <p className="price"><span className="special-price"><span className="amount">$132.00</span></span></p>
                                        </div>
                                        <a href="shop.html" className="see-all">See all features</a>
                                        <div className="quick-add-to-cart">
                                            <form method="post" className="cart">
                                                <div className="numbers-row">
                                                    <input type="number" id="french-hens" defaultValue={3} />
                                                </div>
                                                <button className="single_add_to_cart_button" type="submit">Add to cart</button>
                                            </form>
                                        </div>
                                        <div className="quick-desc">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
                                        </div>
                                        <div className="share-post">
                                            <div className="share-title">
                                                <h3>share this product</h3>
                                            </div>
                                            <div className="share-social">
                                                <ul>
                                                    <li><a href="#"> <i className="fa fa-facebook" /> </a></li>
                                                    <li><a href="#"> <i className="fa fa-twitter" /> </a></li>
                                                    <li><a href="#"> <i className="fa fa-pinterest" /> </a></li>
                                                    <li><a href="#"> <i className="fa fa-google-plus" /> </a></li>
                                                    <li><a href="#"> <i className="fa fa-linkedin" /> </a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

export default Footer
