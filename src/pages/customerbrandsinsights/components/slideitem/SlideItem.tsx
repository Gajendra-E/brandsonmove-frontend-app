import { useEffect } from "react";
import "./SliteItem.scss";

interface SlideItemProps {
  story: any;
  onClcikOfSlideItem?: () => void;
}

const SlideItem: React.FC<SlideItemProps> = ({ story, onClcikOfSlideItem }) => {
  useEffect(() => {
    if (story?.isSelected) {
      // console.log("STORY>>>", story);
    }
  }, []);

  return (
    <button
      className="slide-item"
      style={{
        boxShadow: story?.isSelected
          ? `0 0 16px 3px ${story?.textcolor}, inset 0 0 0px 200px ${story?.textcolor}`
          : `0 0 16px 0px ${story?.textcolor}, inset 0 0 20px 3px ${story?.textcolor}`,
      }}
      onClick={onClcikOfSlideItem}
    >
      <h1
        className="slide-item-name"
        style={{
          color: story?.isSelected ? `${"#FFFFFF"}` : `${story?.textcolor}`,
        }}
      >
        {story?.name}
      </h1>
      <p
        style={{
          color: story?.isSelected ? `${"#FFFFFF"}` : `${"#000000"}`,
        }}
        className="slide-story-desc"
      >
        {story?.description}
      </p>
    </button>
  );
};

export default SlideItem;
