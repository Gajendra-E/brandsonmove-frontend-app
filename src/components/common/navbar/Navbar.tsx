import "./Navbar.scss";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconAppLogo from "../../../assets/icons/logo.jpg";
import IconMenu from "../../../assets/icons/menu.svg";
import IconCloseMenu from "../../../assets/icons/closemenu.svg";

function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const handleContactClick = () => {
  //   const mailIdElement = document.querySelector('#mail-id');
  //   if (mailIdElement) {
  //     mailIdElement.scrollIntoView({ behavior: 'smooth' });
  //     const range = document.createRange();
  //     // Ensure the selection is not null
  //     const selection = window.getSelection();
  //     if (selection) {
  //       const range = document.createRange();
  //       range.setStart(mailIdElement, 0);
  //       range.setEnd(mailIdElement, 1);
  //       selection.removeAllRanges();
  //       selection.addRange(range);
  //     }
  //   }
  //   closeMobileMenu()
  // };


  const handleContactClick = () => {
    const mailIdElement = document.querySelector('#mail-id');
    if (mailIdElement) {
      mailIdElement.scrollIntoView({ behavior: 'smooth' });
  
      const linkElement = mailIdElement.querySelector('a');
      if (linkElement) {
        const range = document.createRange();
        const selection = window.getSelection();
  
        // Ensure the selection is not null
        if (selection) {
          range.selectNodeContents(linkElement);
          selection.removeAllRanges();
          selection.addRange(range);
        }
  
        // Optionally, focus the linkElement to make it the active element
        linkElement.focus();
      }
    }
    closeMobileMenu();
  };
  
  
  

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // const reloadPage = () => {
  //   setClick(false);
  //   if (location?.pathname === "/customerbrandsinsights") {
  //     window.location.replace("/customerbrandsinsights");
  //   } else {
  //     navigate("/customerbrandsinsights");
  //   }
  // };

  // const reloadSalesPage = () => {
  //   setClick(false);
  //   if (location?.pathname === "/salesconsumptionanalytics") {
  //     window.location.replace("/salesconsumptionanalytics");
  //   } else {
  //     navigate("/salesconsumptionanalytics");
  //   }
  // };


  const reloadPage = () => {
    setClick(false); 
    const { pathname } = location; // Destructure pathname for readability
  
    if (pathname === "/customerbrandsinsights") {
      // Use replace to avoid breaking SPA behavior
      navigate("/customerbrandsinsights", { replace: true, state: { reload: new Date().getTime() } });
    } else {
      navigate("/customerbrandsinsights");
    }
  };
  
  const reloadSalesPage = () => {
    setClick(false);
    const { pathname } = location;
  
    if (pathname === "/salesconsumptionanalytics") {
      navigate("/salesconsumptionanalytics", { replace: true, state: { reload: new Date().getTime() } });
    } else {
      navigate("/salesconsumptionanalytics");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showButton);
    showButton();
  }, []);

  return (
    <div className="navbar-flex-container">
      <div className="navbar-logo-container">
        <Link to="/" onClick={closeMobileMenu}>
          <img className="navbar-logo" src={IconAppLogo} />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <img src={IconCloseMenu} /> : <img src={IconMenu} />}
        </div>
      </div>
      <div className="navbar-menu-container">
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li
            className={`nav-item ${
              location?.pathname == "/customerbrandsinsights"
                ? "menu-active"
                : ""
            }`}
          >
            <Link
              to="/customerbrandsinsights"
              className="nav-links"
              onClick={reloadPage}
            >
              CONSUMER & BRAND INSIGHTS
            </Link>
          </li>
          <li
            className={`nav-item ${
              location?.pathname == "/salesconsumptionanalytics"
                ? "menu-active"
                : ""
            }`}
          >
            <Link
              to="/salesconsumptionanalytics"
              className="nav-links"
              onClick={reloadSalesPage}
            >
              SALES & CONSUMPTION ANALYTICS
            </Link>
          </li>
          <li
            className={`nav-item ${
              location?.pathname == "/trueasuretrove" ? "menu-active" : ""
            }`}
          >
            <Link
              to="/trueasuretrove"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              TREASURE TROVE
            </Link>
          </li>
          <li
            className={`nav-item ${
              location?.pathname == "" ? "menu-active" : ""
            }`}
          >
            <Link to="#" className="nav-links" onClick={handleContactClick}>
              CONTACT US
            </Link>
          </li>

          <li
            className={`nav-item ${
              location?.pathname == "/createmeeting" ? "menu-active" : ""
            }`}
          >
            <Link
              to="/createmeeting"
              className="nav-links setup-meeting"
              onClick={closeMobileMenu}
            >
              SETUP A MEETING
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;