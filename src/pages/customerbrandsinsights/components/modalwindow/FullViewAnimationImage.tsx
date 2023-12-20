import "./FullViewAnimationImage.scss";

interface SlideItemProps {
    isOpen: any;
    onClose: any;
    imageurl: any;
}

const FullViewAnimationImage: React.FC<SlideItemProps> = ({
    isOpen, 
    onClose,
    imageurl,
}) => {
    return (
        <div>
            {isOpen && (
            <div className="modal">
                <div
                    className="modal-content"
                    onClick={onClose}
                >
                    <span className="close">
                        &times;
                    </span>
                    <img src={imageurl} alt="Full view image" />
                </div>
            </div>
            )}
        </div>
    );
}

export default FullViewAnimationImage;
