import "../../css/admin.scss";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/common/loadingspinner/LoadingSpinner";
import { showToast } from "../../../../utils/utils";
import api from "../../../../api";

export default function AdminList() {
  const [admins, setAdmins] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAdminInfo = async () => {
    try {
      const result = await api.get("/users");
      if (result.data.status === "success") {
        setAdmins(result?.data?.payload);
      }
    } catch (error: any) {
      console.log("Error while fetching admin info", error);
    }
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  const performAction = async (actiontype: any, admin: any) => {
    setLoading(true);
    try {
      if (actiontype == "delete") {
        if (admins && admins?.length <= 1) {
          setLoading(false);
          showToast("Error, you can not delete super admin.", false);
        } else {
          const result = await api.delete(`/users/${admin?.id}`);
          if (result.data.status === "success") {
            getAdminInfo();
            setLoading(false);
            showToast("Deleted successfully.", true);
          }
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Error while deleting.", error);
    }
  };

  if (!admins || admins?.length <= 0) {
    return <p>No Admin created yet.</p>;
  }

  if (admins && admins?.length > 0) {
    return (
      <div className="meetings-table">
        <div className="row">
          <div className="col meetings-content">
            <b>Name</b>
          </div>
          <div className="col meetings-content">
            <b>Mobile Number</b>
          </div>
          <div className="col meetings-content">
            <b>Options</b>
          </div>
        </div>
        {admins.map((admin: any, index: any) => (
          <div key={admin?.id || index} className="row">
            <div className="col meetings-content">{admin?.name}</div>
            <div className="col meetings-content">{admin?.phone_number}</div>
            <div className="col meetings-content">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <i
                  className="bi bi-trash3 icon-delete"
                  onClick={() => performAction("delete", admin)}
                ></i>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
