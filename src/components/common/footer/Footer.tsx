import "./Footer.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import Advertisement from "../advertisement/Advertisement";
import IconInstagram from "../../../assets/icons/instagram.svg";
import IconTwitter from "../../../assets/icons/twitter.svg";
import IconFacebook from "../../../assets/icons/facebook.svg";
import IconCall from "../../../assets/icons/call.svg";
import IconMailbox from "../../../assets/icons/msailbox.svg";
import IconLocation from "../../../assets/icons/location.svg";
import api from "../../../api/";
import socketIOClient from "socket.io-client";
import {BACKEND_APP_URL} from "../../../config/config"



export default function Footer() {

  const navigate = useNavigate();
  const location = useLocation();
  const [contactInfo, setContactInfo] = useState<any>({});

  useEffect(() => {
    getContactInfo();
    const newSocket = socketIOClient(BACKEND_APP_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    newSocket.on("contact-info", () => {
      getContactInfo();
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const getContactInfo = async () => {
    try {
      const result = await api.get("/contact-info");
      if (result.data.status === "success") {
        setContactInfo(result?.data?.payload[0]);
      }
    } catch (error: any) {
      console.log("Error while fetching contact info", error);
    }
  };


  const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default link behavior

    // If not on /createmeeting page, navigate there
    if (location.pathname !== '/createmeeting') {
      navigate('/createmeeting');
    }

    // After navigating (or if already on /createmeeting), highlight the content
    setTimeout(() => {
      const paragraphElement = document.querySelector('#get-report-text') as HTMLElement;
      if (paragraphElement) {
        const range = document.createRange();
        const selection = window.getSelection();

        const firstChild = paragraphElement.firstChild;
        if (firstChild instanceof HTMLElement || firstChild instanceof Text) {
          range.setStart(firstChild, 0);
          range.setEnd(firstChild, 1);

          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }

          paragraphElement.focus();
        }
      }
    }, 0); // Use setTimeout to ensure highlighting occurs after navigation
  };

  return (
    <div className="Footer">
      <Advertisement />
      <div className="footer-navigation">
        <div className="footer-navigation-item">
          <div className="footer-about-teams">
            <Link className="footer-links" to="#" onClick={handleAboutClick}>
              About Us
            </Link>{" "}
            <br />
            {/* <Link className="footer-links" to="#">
              Team
            </Link> */}
          </div>
        </div>
        <div className="footer-navigation-item">
          <div className="footer-location-address">
            <img className="footer-icons" src={IconLocation} />
            <div className="address-text">
              <p>
                {contactInfo?.address ||
                  "Plot 124, Parsik Hill, Sector 26-27, CBD, Belapur, Navi Mumbai"}
              </p>
            </div>
          </div>
        </div>
        <div className="footer-navigation-item">
          <div className="footer-contact-info">
            <img className="footer-icons" src={IconCall} />
            <div>
              <p className="m-0">
                T: +91 {contactInfo?.phone_number || "9092010216"} <br />
                {/* F: +91 {contactInfo?.alternate_phone_number || "8890762231"} */}
              </p>
            </div>
          </div>
        </div>
        <div className="footer-navigation-item">
          <div id="mail-id" className="footer-contact-mail">
            <img className="footer-icons" src={IconMailbox} />
            <Link className="footer-links" to={`mailto:${contactInfo?.email || "brandlytics@brandsonmove.com"}`}>
              {contactInfo?.email || "brandlytics@brandsonmove.com"}
            </Link>
          </div>
        </div>
        <div className="footer-navigation-item">
          {/* <div className="footer-share-options">
            <Link to="">
              <img className="footer-icons" src={IconFacebook} />
            </Link>
            <Link to="">
              <img className="footer-icons" src={IconInstagram} />
            </Link>
            <Link to="">
              <img className="footer-icons" src={IconTwitter} />
            </Link>
          </div> */}
          {location?.pathname == "/" && (
            <div className="only-home-page-content">
              <a
                className="footer-links"
                href="https://webmail.logix.in/"
                target="_blank"
                rel="noreferrer"
              >
                Check Webmail
              </a>{" "}
              <br />
              <Link className="footer-links" to="">
                Site Map
              </Link>{" "}
              <br />
              <Link className="footer-links" to="/admin/login">
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}