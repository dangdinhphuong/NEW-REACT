import React from 'react'


const Banner = () => {
    return (
        <div className='w-[100vw] mx-auto'>
            <div className="flex justify-center flex-wrap space-x-5">
                <div className="flex justify-center space-x-2 my-auto w-[250px] h-14 bg-gray-100 hover:bg-gray-50 m-2">
                    <img className='w-7 h-7 mt-3' src="../../../../img/icons/support.png" alt="" />
                    <p className='my-auto text-xl'>Dịch vụ</p>
                </div>
                <div className="flex justify-center space-x-2 my-auto w-[250px] h-14 bg-gray-100 hover:bg-gray-50 m-2">
                    <img className='w-7 h-7 mt-3' src="../../../../img/icons/badge.png" alt="" />
                    <p className='my-auto text-xl'>Chất lượng</p>
                </div>
                <div className="flex justify-center space-x-2 my-auto w-[250px] h-14 bg-gray-100 hover:bg-gray-50 m-2">
                    <img className='w-7 h-7 mt-3' src="../../../../img/icons/advice.png" alt="" />
                    <p className='my-auto text-xl'>Tư vấn & Thiết kế</p>
                </div>
                <div className="flex justify-center space-x-2 my-auto w-[250px] h-14 bg-gray-100 hover:bg-gray-50 m-2">
                    <img className='w-7 h-7 mt-3' src="../../../../img/icons/gift.png" alt="" />
                    <p className='my-auto text-xl'>Sản phẩm</p>
                </div>
                <div className="flex justify-center space-x-2 my-auto w-[250px] h-14 bg-gray-100 hover:bg-gray-50 m-2">
                    <img className='w-7 h-7 mt-3' src="../../../../img/icons/hot-line.png" alt="" />
                    <p className='my-auto text-xl'>Liên hệ</p>
                </div>
            </div>
        </div>
    )
}

export default Banner