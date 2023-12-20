import "./Advertisement.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import React, { useEffect, useState } from "react";
import { ADVERTISMENT_IMAGES } from "../../../constants/constants";

export default function Advertisement() {

    const sliderRef: any = React.useRef(null);
    const [autoplay, setAutoPlay] = useState<any>(true);
    const [advertisementImages] = useState<any>(ADVERTISMENT_IMAGES);
    const [slidePreviewCount, setSlidePreviewCount] = useState<number>(4);
    const [screenSize, setScreenSize] = useState<any>({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    });

    const setDimension = () => {
        setScreenSize({
          dynamicWidth: window.innerWidth,
          dynamicHeight: window.innerHeight
        });
        _setSlidePreviewCount();
    }
    
    const _setSlidePreviewCount = () => {
        if (screenSize?.dynamicWidth <= 540) {
          setSlidePreviewCount(1);
        }
        if (screenSize?.dynamicWidth >= 541 && screenSize?.dynamicWidth <= 820) {
          setSlidePreviewCount(2);
        }
    
        if (screenSize?.dynamicWidth >= 821) {
          setSlidePreviewCount(4);
        }
    };

    const settings = {
        autoplay: autoplay,
        infinite: true,
        speed: 500,
        slidesToShow: slidePreviewCount,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        accessibility: false,
        arrows: false
    };

    useEffect(() => {
        setAutoPlay(true);
        _setSlidePreviewCount();
        window.addEventListener("resize", setDimension);
        return(() => {
            window.removeEventListener("resize", setDimension);
        });
    }, [screenSize, slidePreviewCount, autoplay]);
    
    return (
        <div>
            <Slider
                className="advertisment-slider"
                {...settings}
                ref={sliderRef}
            >
                {advertisementImages &&
                advertisementImages?.length > 0 &&
                advertisementImages.map((ads: any, index: any) => (
                    <div key={index}>
                        <div
                            // className="advertisement-container"
                        >
                            <img className="advertisement-images" src={ads?.url} />
                        </div> 
                    </div>
                ))}
            </Slider>
        </div>
    );
}
