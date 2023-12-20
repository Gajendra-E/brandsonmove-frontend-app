import "./SlideItemDetail.scss";
import React, { useEffect, useState } from "react";
import scissor from "../../../assets/images/scissor.svg";

interface SlideItemDetailProps {
    story: any;
    showDefaultContent: boolean;
    showFullViewImage: boolean;
    onclickImage?: () => void;
}

const SlideItemDetail: React.FC<SlideItemDetailProps> = ({
    story,
    showDefaultContent,
    showFullViewImage,
    onclickImage
}) => {

    const [ipadMaxWidth] = useState<number>(820);
    const [screenSize, setScreenSize] = useState<any>({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight,
    });
    
    const setDimension = () => {
        setScreenSize({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", setDimension);
        return () => {
            window.removeEventListener("resize", setDimension);
        }
    }, [screenSize, story, showFullViewImage]);

    const showContent = (story: any) => {
        return (
            <div className="info-animation-container" style={{background: `${story?.bgcolor}`}}>
                { (screenSize?.dynamicWidth > ipadMaxWidth) &&
                    <div>
                        {animationImage(story)}
                    </div>
                }
                <h3
                    style={{color: story?.textcolor}}
                    className={`${showDefaultContent ? "default-story-title" : "story-title"}`}
                >
                    {story?.title}
                </h3>
                <p
                    className={`${showDefaultContent ? "default-story-paragraph" : "story-paragraph"}`}
                >
                    {story?.paragraph1}
                </p>
                {story?.paragraph2 &&
                    <p
                        className={`${showDefaultContent ? "default-story-paragraph" : "story-paragraph"}`}
                    >
                        {story?.paragraph2}
                    </p>
                }
                { (screenSize?.dynamicWidth <= ipadMaxWidth) &&
                    <div className="animation-image-container">
                        <img
                            onClick={onclickImage}
                            className="scissor"
                            src={scissor} alt="image"
                        />
                        <img
                            className={`${!showFullViewImage ? "animation-image-fullsize" : "animation-image"}`}
                            src={story?.animationurl}
                            alt="loading"
                            onClick={onclickImage}
                        />
                    </div>
                }
            </div>
        );
    }

    const animationImage = (story: any) => {
        return (
            <div
                className={`${!showFullViewImage ? "animation-image-container-fullsize" : "animation-image-container"}`}
            >
                <img
                    onClick={onclickImage}
                    className="scissor"
                    src={scissor} alt="image"
                />
                <img
                    className="animation-image"
                    src={story?.animationurl}
                    alt="loading"
                    onClick={onclickImage}
                />
            </div>
        );
    }

    return (
        <div className="slide-item-detail-page">
            {showDefaultContent ? (
                <div>
                    { showFullViewImage ? (
                        <div className="story-detail-info">
                            {showContent(story)}
                        </div>
                    ) : (
                        // <div className="title-image-container">
                        //     {showFullSizeImageView(story)}
                        // </div>
                        <div>
                            {animationImage(story)}
                        </div>
                    )}
                </div>
            ) : (
                <div className="story-detail-info">
                    { showFullViewImage ? (
                        showContent(story)
                    ) : (
                        <div>
                            {animationImage(story)}
                        </div>
                        // <div className="title-image-container">
                        //     {showFullSizeImageView(story)}
                        // </div>
                    )}
                </div>
            )}
        </div>
    );
}


export default SlideItemDetail;