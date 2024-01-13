import "./HomePage.scss";
import { useEffect, useState } from "react";
import homeBanner from "../../assets/images/home-banner.jpg";
import vector from "../../assets/images/Vector.svg";
import trustUs from "../../assets/images/trustus.svg";
import cube from "../../assets/animations/cubeanimation.gif";

export default function HomePage() {
  const [imageHeight, setImageHeight] = useState<number>(6);
  const [screenSize, setScreenSize] = useState<any>({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
    setImageHeightDynamically();
  };

  const setImageHeightDynamically = () => {
    if (screenSize?.dynamicWidth <= 576) {
      setImageHeight(4);
    }

    if (screenSize?.dynamicWidth >= 576 && screenSize?.dynamicWidth <= 768) {
      setImageHeight(4);
    }

    if (screenSize?.dynamicWidth >= 768 && screenSize?.dynamicWidth <= 992) {
      setImageHeight(4);
    }

    if (screenSize?.dynamicWidth >= 992 && screenSize?.dynamicWidth <= 1200) {
      setImageHeight(6);
    }

    if (screenSize?.dynamicWidth > 1200) {
      setImageHeight(6);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className="row m-0">
      <div className="home-banner p-0 position-relative">
        <img className="w-100" src={homeBanner} alt="Home Banner" />

        <div className="banner-text row position-absolute top-0 w-100 h-100">
          <div className="col-6"></div>
          <div className="col-6 d-flex align-items-center">
            <div className="row m-0">
              <div className="col-5 ps-3">
                <img className="w-100" src={vector} alt="" />
                <img className="pt-5 w-100" src={trustUs} alt="" />
              </div>
              <div className="col-7">
                <img className="w-100" src={cube} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
