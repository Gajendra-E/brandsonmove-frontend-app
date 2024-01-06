import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouter from "../../../../components/common/approuter/AppRouter";
import IconAppLogo from "../../../../assets/icons/applogo.png";

export default function AdminDashboard() {

  const location = useLocation();

  useEffect(() => {
    
  }, []);

  return (
    <div>
        <div className="admin">

          {!location.pathname.includes("/admin/login") &&
            <div className="admin-nav">

              <Link to="/" >
                <img className="navbar-logo" src={IconAppLogo} />
              </Link>

              <Link
                className={location?.pathname == "/admin/managecontents" ? "admin-menu-active" : ""}
                to="/admin/managecontents"
              >Manage Contents</Link>
              <Link
                className={location?.pathname == "/admin/syndicateroom" ? "admin-menu-active" : ""}
                to="/admin/syndicateroom"
              >Syndicate room</Link>
              <Link
                className={location?.pathname == "/admin/managemeetings" ? "admin-menu-active" : ""}
                to="/admin/managemeetings"
              >Manage Meetings</Link>
              <Link
                className={location?.pathname == "/admin/managemeetinglinks" ? "admin-menu-active" : ""}
                to="/admin/managemeetinglinks"
              >Manage Meeting Links</Link>
              <Link
                className={location?.pathname == "/admin/manageadmin" ? "admin-menu-active" : ""}
                to="/admin/manageadmin"
              >Manage Admin</Link>
              <Link
                className={location?.pathname == "/admin/managecontactinfo" ? "admin-menu-active" : ""}
                to="/admin/managecontactinfo"
              >Manage Contact Info</Link>
            </div>
          }
          <div>
            <ToastContainer />
            <AppRouter />
          </div>

        </div>
    </div>
  );
}
