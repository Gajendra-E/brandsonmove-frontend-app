import "../../css/admin.css";
// import { useMutation, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react"
// import { DELETE_ONE, GET_ADMINS } from "../../../../graphql";
import LoadingSpinner from "../../../../components/common/loadingspinner/LoadingSpinner";
import { showToast } from "../../../../utils/utils";
import api from "../../../../api";

export default function AdminList() {

    const [admins, setAdmins] = useState<any>([]);

    useEffect(() => {
        const getAdminInfo = async () => {
            const result = await api.get('/users');
            if(result.data.status==="success"){
                setAdmins(result?.data?.payload);
            }
        };
        getAdminInfo();
    }, []);
    

    const performAction = (actiontype: any, admin: any) => {
        if(actiontype == "delete") {
            console.log(actiontype);
            if(admins && admins?.length <= 1) {
                showToast("Error, you can not delete super admin.", false);
            } else {
                // deleteAdmin({
                //     variables: {
                //         id: admin?.id
                //     }
                // }).then((result: any) => {
                //     showToast("Deleted successfully.", true);
                // }).catch((error: any) => {
                //     showToast("Unable to delete user.", false);
                // });
            }
        }
        // if(actiontype == "edit") {
        //     console.log(actiontype);
        //     showToast("Action not implemented yet", false);
        // }
    }

    // if (loading) {
    //     return (
    //         <div className="page-loading-spinner-style">
    //             <LoadingSpinner />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return <p>Error: {error?.message || "Something went wrong."}</p>;
    // }

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
                        <div className="col meetings-content">
                            {admin?.name}
                        </div>
                        <div className="col meetings-content">
                            {admin?.phone_number}
                        </div>
                        <div className="col meetings-content">
                            <i
                                className="bi bi-trash3 icon-delete"
                                onClick={() => performAction("delete", admin)}
                            >   
                            </i>
                            {/* <i
                                className="bi bi-pen icon-edit"
                                onClick={() => performAction("edit", admin)}
                            >   
                            </i> */}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}
