import React, { useEffect, useState } from "react";
import "../css/admin.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
// import { LOGIN } from "../../../graphql";
// import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import api from '../../../api'

export default function AdminLogin() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({});
    const { errors }: any = formState;


    const onSubmit = async(data: any) => {
        type obj ={ email:string,password:string}
        const dataObj : obj={email:data?.username,password:data?.password}
      
        try {
           const result = await api.post('/users/login', dataObj);
            if(result.data.status==="success"){
                navigate('/admin/managecontents')
            };
          } catch (e) {
            
            console.log(e)
          }
          
    };

    const showToast = (message: any, status: any) => {
        if(status) {
          toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
        if(!status) {
          toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
    }

    useEffect(() => {
    }, []);

    return (
        <div className="admin-login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-field">
                        <div className="label">Username</div>
                        <input
                            className="form-input input"
                            type="text"
                            {
                                ...register("username", 
                                { 
                                    required: true, 
                                })
                            }
                        />
                        {errors.username && <p className="error-message">This is required.</p>}
                    </div>

                    <div className="form-field">
                        <div className="label">Password</div>
                        <input
                            className="form-input input"
                            type="password"
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
                        {/* {loading ? (
                            <LoadingSpinner />
                        ) : ( */}
                            <button className="button-submit" type="submit">
                                Submit
                            </button>
                        {/* )} */}
                    </div>
                </form>
            </div>
        </div>
    )
}
