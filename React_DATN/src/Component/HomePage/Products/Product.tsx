import React, { useEffect, useState } from 'react'
import {
    useGetAllProductQuery,
    // useUpdateProductMutation,
    useGetOneProductQuery,
    useUpdateProductMutation
} from '../../../Services/Api_Product'
import { Link } from "react-router-dom"
// import Skeleton from '@mui/material/Skeleton';
// import Box from '@mui/material/Box';
import Loading from '../../Loading';
import { useGetAllCategoryQuery } from '../../../Services/Api_Category';
import { ICategory } from '../../../Models/interfaces';


const Product = () => {
    const [getId, setId]: any = useState("");
    const { data: productData, isLoading }: any = useGetAllProductQuery();
    const [UpdatesProduct] = useUpdateProductMutation();
    const { data: dataOne }: any = useGetOneProductQuery(getId)
    if (dataOne) {
        // console.log("view: ",dataOne.view);
        const { view, ...dataGetOne }: any = dataOne
        console.log("view: ", view);
        // const objecOne: any = {
        //     dataGetOne,
        //     data
        // }
        // dataOne.view+=1;
        // UpdatesProduct(dataOne);
        // setId("");
        // alert("xong");
    };
    // console.log(dataOne);

    let arrayLimitProducts: any = [];
    if (productData && productData.length > 8) {
        arrayLimitProducts.push(
            productData[1],
            productData[2],
            productData[3],
            productData[4],
            productData[5],
            productData[6],
            productData[7],
            productData[8],
        )
    }
    const HandleView = (id: string) => {
        // to={`/product/${items._id}`}
        try {
            // UpdateProduct(_id)
            // .unwrap()
            // .then(()=>{

            // })
            // const {data:dataOne}= useGetOneProductQuery();
            // dataOne!=undefined && console.log("xem: ",dataOne);
            setId(id);



        } catch (err) {
            console.log("Vấn đề về view: ", err);
        }
    }
    const [dataCt,setDataCt]:any=useState([]);

    const dataProducts = arrayLimitProducts.length ? arrayLimitProducts : productData;
    // console.log("product: ", productData);

    const {data: categoryData,isLoading:loadingCT}:any = useGetAllCategoryQuery();
    useEffect(()=>{
        if(!loadingCT){
            setDataCt(categoryData)
        }
    },[categoryData]);
    console.log("loading",loadingCT);
    console.log("datajhcsdgvxb",dataCt);
    

    return (
        <div className='w-[90vw] mx-auto'>
            <div className="products-area">
                <div className="container">
                    <div className="products">
                        <div className="row">
                            {/* category */}
                            <div className="col-lg-3">
                                <div className="product-menu">
                                    <div className="menu-title">
                                        <h2>Best seller <strong>Các Mẫu Giày</strong></h2>
                                    </div>
                                    <div className="side-menu">
                                    {Array.isArray(categoryData) ? (
                                        categoryData.map((category: ICategory) => (
                                        <ul className="nav tab-navigation" role="tablist" key={category._id}>
                                            <li role="presentation">
                                            <Link to={`/products`}>{category.name}</Link>
                                            </li>
                                        </ul>
                                        ))
                                    ) : (
                                        <div>No categories available</div>
                                    )}
                                        <div>
                                            <img src="img/banner/banner-5.jpg" />
                                        </div>
                                        {/* <ul className="nav tab-navigation" role="tablist">
                                            <li role="presentation">
                                                <a href="#tab5" aria-controls="tab5" role="tab" data-bs-toggle="tab">NIKE</a>
                                            </li>
                                            <li role="presentation">
                                                <a href="#tab6" aria-controls="tab6" role="tab" data-bs-toggle="tab">MLB</a>
                                            </li>
                                            <li role="presentation">
                                                <a href="#tab7" aria-controls="tab7" role="tab" data-bs-toggle="tab">ADIDAS</a>
                                            </li>
                                            <li role="presentation">
                                                <a href="#tab8" aria-controls="tab8" role="tab" data-bs-toggle="tab">VANS</a>
                                            </li>
                                            <li></li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-9">
                                <div className="row">
                                    
                                </div>
                            </div> */}
                            <div className="flex justify-center flex-wrap col-lg-9 mt-1">
                                {
                                    isLoading ?
                                        <Loading />
                                        :
                                        dataProducts?.map((items: any) => {
                                            return (
                                                <div className="w-[220px] h-[280px] mx-2 mb-5 " key={items._id}>
                                                    <div className="imgPr h-[250px] w-[220px] overflow-hidden">
                                                        <Link to={`/product/${items._id}`}><img onClick={() => HandleView(items._id)} className='h-[250px] w-[220px] hover:scale-125 duration-200' src={items.imgUrl[0]} alt="" /></Link>
                                                    </div>
                                                    <div className="content">
                                                        <p className='text-center border-y border-gray-200 mt-1 text-orange-400 font-bold'>{items.name}</p>
                                                        <div className="flex justify-between -mt-3">
                                                            <div className="flex space-x-1">
                                                                <span>{items.original_price?.toLocaleString()}</span>
                                                                {/* <del className='text-xs'> {items.original_price > 0 ? (items.price + items.original_price).toLocaleString() : ""}</del> */}
                                                                <span> VND</span>
                                                            </div>
                                                            <span>SL: {items.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
