import React from 'react'
import Slider from '../Component/HomePage/Slider/Slider'
import Banner from '../Component/HomePage/Banner/Banner'
import Product from '../Component/HomePage/Products/Product'
import Featured_products from '../Component/HomePage/Featured_products/Featured_products'
import Another_banner from '../Component/HomePage/Another_Banner/Another_banner'
import Testimonial from '../Component/HomePage/Testimonial/Testimonial'
import Blog from '../Component/HomePage/Blog/Blog'
import Newsleter from '../Component/HomePage/Newsleter/Newsleter'
import Hot_products from '../Component/HomePage/Hot_products/Hot_products'
import Header from '../Component/Header/Header'
const HomePage = () => {
    return (
        <>
            <Header />
            <Slider />
            <Banner />
            <Product />
            <Featured_products />
            <Another_banner />
            <Hot_products/>
            <Testimonial />
            <Blog />
            <Newsleter />


        </>
    )
}
export default HomePage

