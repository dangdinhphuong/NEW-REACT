import React, { useEffect, useState } from 'react'
import { useGetAllSlideQuery } from '../../../Services/Api_Slide'
import Loading from '../../Loading';

const Slider = () => {
    const { data: getAllSlide, isLoading: loadingSlide }: any = useGetAllSlideQuery();
    const [getSlide, setSlide]: any = useState([]);

    useEffect(() => {
        if (!loadingSlide) {
            let araySlide: any = getAllSlide.slider.filter((items: any) => items.status == true);

            setSlide(araySlide);
        }
    }, [getAllSlide]);

    return (
        <div>
            <div className="slider-area mt-56">
                <div id="carouselExampleIndicators" className="carousel slide carousel-fade">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        {getSlide?.length == 4 && <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>}
                    </div>
                    <div className="h-[70vh] overflow-hidden">
                        {
                            getSlide?.map((itemSlide: any) => {
                                return (
                                    <div className="carousel-inner">
                                        <div className="carousel-item active relative">
                                            <img className='w-[100vw] h-[70vh]' src={itemSlide?.imgSlider} alt="" />
                                            <div className="absolute top-44 left-44 ">
                                                <h1 className='text-yellow-500'>{itemSlide.titleSlider}</h1>
                                                <p className='mt-2 w-96'>{itemSlide.contentSlider}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* <div id="carouselExampleIndicators" className="carousel slide h-[70vh]">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        {getSlide.length == 4 && <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>}
                    </div>
                    <div className="h-[70vh] overflow-hidden">
                        {
                            getSlide?.map((itemSlide: any, index: any) => {
                                return (
                                    <div className="carousel-inner">
                                        <div className="carousel-item active relative">
                                            <img className='w-[100vw] h-[70vh]' src={itemSlide?.imgSlider} alt="" />
                                            <div className="absolute top-44 left-44 ">
                                                <h1 className='text-yellow-500'>{itemSlide.titleSlider}</h1>
                                                <p className='mt-2 w-96'>{itemSlide.contentSlider}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Slider