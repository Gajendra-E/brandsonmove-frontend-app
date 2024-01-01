import "../css/admin.css";
import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { INSERT_ONE } from "../../../graphql";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import AdminList from "./component/AdminList";
import { showToast } from "../../../utils/utils";
import api from "../../../api";

export default function ManageAdmin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const { register, handleSubmit, formState, reset} = useForm({});
    const { errors } = formState;

    // const [addAdmin, { loading: addingAdmin }] = useMutation(INSERT_ONE("users"));

    const onSubmit = async (data: any) => {

        let payload = {
            name: data?.name,
            phone_number: data?.phone_number,
            email: data?.email,
            password: data?.password,
        };

        // data.user_type = "admin";
        try {
            const result = await api.post('/users/create', payload);
            if(result?.data?.status==="success"){
                setLoading(false);
                showToast("Successfully added.", true);
            } else {
                setLoading(false);
                showToast("Error.", false);
            }
        } catch (error: any) {
            console.log("error", error);
            showToast(error.response.data.message, false);
        }

        reset();
        setShowForm(!showForm)
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
                                type="tel"
                                {
                                    ...register("phone_number", 
                                    { 
                                        required: true,
                                        minLength: 10,
                                        maxLength: 10
                                    })
                                }
                            />
                            {errors.phone_number && <p className="error-message">Provide valid phone number.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Email</div>
                            <input
                                className="form-input input"
                                type="email"
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
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <button className="button-submit" type="submit">
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <AdminList />                
            )}
        </div>
        
    );
}
