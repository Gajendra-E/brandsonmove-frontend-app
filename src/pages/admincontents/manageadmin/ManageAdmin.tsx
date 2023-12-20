import "../css/admin.css";
import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { INSERT_ONE } from "../../../graphql";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import AdminList from "./component/AdminList";
import { showToast } from "../../../utils/utils";

export default function ManageAdmin() {

    const [showForm, setShowForm] = useState<boolean>(false);
    const { register, handleSubmit, formState, reset} = useForm({});
    const { errors } = formState;

    // const [addAdmin, { loading: addingAdmin }] = useMutation(INSERT_ONE("users"));

    const onSubmit = async (data: any) => {
        data.user_type = "admin";
        console.log(data);
        // addAdmin({
        //     variables: {
        //         object: data
        //     },
        // }).then((resut) => {
        //     reset();
        //     showToast("Successfully saved.", true);
        // }).catch((error: any) => {
        //     console.log(error);
        //     showToast(error?.message || "Error.", false);
        // });
    }
    
    return (
        <div>
            <div className="switch-content-block">
                {showForm ? (
                    <i
                        className="bi bi-card-list list-icon"
                        onClick={() => setShowForm(!showForm)}
                    >
                    </i>
                ) : (
                    <i
                        className="bi bi-plus-square add-icon"
                        onClick={() => setShowForm(!showForm)}
                    >
                    </i>
                ) }
            </div>
            {showForm ? (
                <div className="dynamic-content-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-field">
                            <div className="label">Name</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("name", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors.name && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Mobile Number</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("mobile_number", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors.mobile_number && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Email</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("email", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors.email && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Password</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("password", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors.password && <p className="error-message">This is required.</p>}
                        </div>
                
                        <div className="text-center mt-4 mb-2">
                            {/* {addingAdmin ? (
                                <LoadingSpinner />
                            ) : ( */}
                                <button className="button-submit" type="submit">
                                    Submit
                                </button>
                            {/* )} */}
                        </div>
                    </form>
                </div>
            ) : (
                <AdminList />                
            )}
        </div>
        
    );
}
