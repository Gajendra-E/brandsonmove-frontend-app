import "./Footer.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { useSubscription } from "@apollo/client";
// import { GET_CONTACT_INFO } from "../../../graphql";
import Advertisement from "../advertisement/Advertisement";
import IconInstagram from "../../../assets/icons/instagram.svg";
import IconTwitter from "../../../assets/icons/twitter.svg";
import IconFacebook from "../../../assets/icons/facebook.svg";
import IconCall from "../../../assets/icons/call.svg";
import IconMailbox from "../../../assets/icons/msailbox.svg";
import IconLocation from "../../../assets/icons/location.svg";
import { isObjIsEmpty } from "../../../utils/utils";
import LoadingSpinner from "../loadingspinner/LoadingSpinner";
import api from "../../../api/"

export default function Footer() {

    const location = useLocation();
    const [contactInfo, setContactInfo] = useState<any>({});

    // const { data, loading } = useSubscription(GET_CONTACT_INFO, {
    //     variables: {
    //         where: {},
    //         limit: 5,
    //         order_by: {created_at: "desc" },
    //         offset: 0
    //     },
    //     onData: ({ data }) => {
    //         if(data?.data?.objects && data?.data?.objects?.length > 0) {
    //             setContactInfo(data?.data?.objects[0]);
    //         }
    //     },
    //     onError: (error: any) => {
    //       console.log("Error while getting id", error);
    //       setContactInfo({});
    //     },
    // });

    const listContactInfo = async() =>{
            const result = await api.get('/contact-info' )
                 if(result.data.status==="success"){
                    setContactInfo(result?.data?.payload)
                 }
    
    }
    useEffect(() => {
        listContactInfo()
    }, []);

    return (
        <div className="Footer">
            <Advertisement />
            { !isObjIsEmpty(contactInfo) ? (
                <div className="footer-navigation">
                    <div className="footer-navigation-item">
                        <div className="footer-about-teams">
                            <Link className="footer-links" to="#">About Us</Link> <br />
                            <Link className="footer-links" to="#">Team</Link>
                        </div>
                    </div>
                    <div className="footer-navigation-item">
                        <div className="footer-location-address">
                            <img className="footer-icons" src={IconLocation} />
                            <div className="address-text">
                                <p>{contactInfo?.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-navigation-item">
                        <div className="footer-contact-info">
                            <img className="footer-icons" src={IconCall} />
                            <div>
                                <p className="m-0">
                                    T: +91 {contactInfo?.phone1} <br/>
                                    F: +91 {contactInfo?.phone2}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-navigation-item">
                        <div className="footer-contact-mail">
                            <img className="footer-icons" src={IconMailbox} />
                            <Link className="footer-links" to="">{contactInfo?.email}</Link>
                        </div>
                    </div>
                    <div className="footer-navigation-item">
                        <div className="footer-share-options">
                            <Link to="">
                                <img className="footer-icons" src={IconFacebook} />
                            </Link>
                            <Link to="">
                                <img className="footer-icons" src={IconInstagram} />
                            </Link>
                            <Link to="">
                                <img className="footer-icons" src={IconTwitter} />
                            </Link>
                        </div>
                        { (location?.pathname == "/") &&
                            <div className="only-home-page-content">
                                <a className="footer-links" href="https://webmail.logix.in/" target="_blank" rel="noreferrer">Check Webmail</a> <br />
                                <Link className="footer-links" to="">Site Map</Link> <br />
                                <Link className="footer-links" to="/admin/login">Admin Login</Link>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <LoadingSpinner />
                </div>
            ) }
        </div>
    );
}
