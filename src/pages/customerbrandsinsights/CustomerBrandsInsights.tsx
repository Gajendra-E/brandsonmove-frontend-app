import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomerBrandInsights.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import Slider from "react-slick";
import IconNext from "../../assets/icons/slidernext.svg";
import {
  CONSUMERBRANDANDINSIGHTS,
  CONSUMERBRANDANDINSIGHTS_DEFAULTCONTENT,
} from "../../constants/constants";
import SlideItem from "./components/slideitem/SlideItem";
import SlideItemDetail from "../components/stories/SlideItemDetail";

function NewCustomerBrandsInsights({ resetSlider }: { resetSlider: boolean }) {
  const sliderRef: any = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [playLeft, setPlayLeft] = useState<boolean>(true);
  const [slideCenterMode, setSlideCenterMode] = useState<boolean>(true);
  const [playRight, setPlayRight] = useState<boolean>(false);
  const [customerBrandsAndInsights, setCustomerBrandsAndInsights] =
    useState<any>(CONSUMERBRANDANDINSIGHTS);
  const [showDefaultContent, setShowDefaultContent] = useState<boolean>(true);
  const [showFullViewImage, setShowFullViewImage] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [slideTimeOut, setSlideTimeOut] = useState<any>(null);
  const [autoplay, setAutoPlay] = useState<any>(false);
  const [screenSize, setScreenSize] = useState<any>({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [slidePreviewCount, setSlidePreviewCount] = useState<number>(2);

  const getSlideIntemBasedOnIndex = (index: number) => {
    return customerBrandsAndInsights[index];
  };

  const setSelectedStoryAndActiveSlide = () => {
    const story: any = getSlideIntemBasedOnIndex(activeSlide);
    customerBrandsAndInsights.find((_story: any) => {
      if (_story.id === story.id) {
        _story.isSelected = true;
      } else {
        _story.isSelected = false;
      }
    });
    setSelectedItem(story);
  };

  const handleSlideChange = (newSlideIndex: any) => {
    // setActiveSlide(newSlideIndex);
    if (newSlideIndex !== activeSlide) {
      setActiveSlide(newSlideIndex);
    }
  };

  const goToPreviousSlide = () => {
    setPlayLeft(true);
    setPlayRight(false);
    sliderRef.current.slickPrev();
  };

  const goToNextSlide = () => {
    setPlayLeft(false);
    setPlayRight(true);
    sliderRef.current.slickNext();
  };

  const autoPlayLeft = useCallback(() => {
    sliderRef.current.slickPrev();
  }, []);

  const autoPlayRight = useCallback(() => {
    sliderRef.current.slickNext();
  }, []);

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
    _setSlidePreviewCount();
  };

  const _setSlidePreviewCount = () => {
    if (screenSize?.dynamicWidth <= 540) {
      setSlidePreviewCount(1);
    }
    if (screenSize?.dynamicWidth >= 541 && screenSize?.dynamicWidth <= 820) {
      setSlidePreviewCount(2);
    }
    if (screenSize?.dynamicWidth >= 821 && screenSize?.dynamicWidth <= 1200) {
      setSlidePreviewCount(3);
    }
    if (screenSize?.dynamicWidth >= 1201) {
      setSlidePreviewCount(4);
    }
  };

  // Effect to reset the slider when resetSlider prop changes
  useEffect(() => {
    if (resetSlider) {
      setShowDefaultContent(true);
      setActiveSlide(0); // Reset to default content
      setSelectedItem(CONSUMERBRANDANDINSIGHTS_DEFAULTCONTENT); // Set selected item to default content
      sliderRef.current.slickGoTo(0); // Go to the first slide
    }
  }, [resetSlider]);

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    _setSlidePreviewCount();

    const autoPlayLeftInterval = setInterval(autoPlayLeft, 25000);
    const autoPlayRightInterval = setInterval(autoPlayRight, 25000);

    if (showDefaultContent) {
      setSelectedItem(CONSUMERBRANDANDINSIGHTS_DEFAULTCONTENT);
      setPlayLeft(false);
      setPlayRight(false);
      const timer = setTimeout(() => {
        setAutoPlay(true);
        setPlayRight(true);
        setShowDefaultContent(false);
        setSelectedItem(customerBrandsAndInsights[0]);
        setSelectedStoryAndActiveSlide();
      }, 17000);
      setSlideTimeOut(timer);
    } else {
      setSelectedStoryAndActiveSlide();
    }

    if (!showDefaultContent) {
      setSlideTimeOut(null);
      clearTimeout(slideTimeOut);
    }

    if (playLeft) {
      clearInterval(autoPlayRightInterval);
    }
    if (playRight) {
      clearInterval(autoPlayLeftInterval);
    }
    if (!playLeft && !playRight) {
      clearInterval(autoPlayLeftInterval);
      clearInterval(autoPlayRightInterval);
    }

    if (slidePreviewCount == 2) {
      setSlideCenterMode(false);
    }
    if (slidePreviewCount != 2) {
      setSlideCenterMode(true);
    }

    return () => {
      window.removeEventListener("resize", setDimension);
      clearInterval(autoPlayLeftInterval);
      clearInterval(autoPlayRightInterval);
      setSlideTimeOut(null);
      // setActiveSlide(0);
      setSelectedItem({});
      customerBrandsAndInsights.find((_story: any) => {
        _story.isSelected = false;
      });
      clearTimeout(slideTimeOut);
    };
  }, [
    activeSlide,
    playLeft,
    playRight,
    showDefaultContent,
    selectedItem,
    slideCenterMode,
    slidePreviewCount,
  ]);


  
  

  const closeModal = () => {
    setShowFullViewImage((showFullViewImage: boolean) => !showFullViewImage);
  };

  const settings = {
    autoplay: autoplay,
    infinite: true,
    speed: 500,
    slidesToShow: slidePreviewCount,
    slidesToScroll: 1,
    // centerMode: slideCenterMode,
    centerPadding: "0",
    afterChange: handleSlideChange,
    accessibility: false,
    arrows: false,
  };

  return (
    <div className="Slider-flex-container">
      <div className="slider-customer-brands-insights">
        <div className="next-prev-button-section">
          <img
            className="icon-prev"
            src={IconNext}
            alt="my image"
            onClick={goToPreviousSlide}
          />
        </div>
        <div className="slider-section">
          <Slider {...settings} ref={sliderRef}>
            {customerBrandsAndInsights &&
              customerBrandsAndInsights?.length > 0 &&
              customerBrandsAndInsights.map((story: any, index: any) => (
                <div key={index}>
                  <SlideItem
                    story={story}
                    onClcikOfSlideItem={() => {
                      setPlayRight(false);
                      setPlayLeft(false);
                      setActiveSlide(story?.id);
                      sliderRef.current.slickGoTo(index);
                      if (showDefaultContent) {
                        setShowDefaultContent(false);
                      }
                      setSelectedStoryAndActiveSlide();
                    }}
                  />
                </div>
              ))}
          </Slider>
        </div>
        <div className="next-prev-button-section">
          <img className="icon-next" src={IconNext} onClick={goToNextSlide} />
        </div>
      </div>
      <div>
        <SlideItemDetail
          showDefaultContent={showDefaultContent}
          story={selectedItem}
          showFullViewImage={showFullViewImage}
          onclickImage={() => {
            setPlayRight(false);
            setPlayLeft(false);
            setShowFullViewImage(
              (showFullViewImage: boolean) => !showFullViewImage
            );
            if (showFullViewImage) {
              setPlayRight(false);
              setPlayLeft(false);
            }
          }}
        />
      </div>
    </div>
  );
}

export default NewCustomerBrandsInsights;
