import "../css/admin.css";
import React, { useEffect, useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import { Q_GET_CONTACT_INFO, UPDATE_ONE } from "../../../graphql";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import {isObjIsEmpty, showToast } from "../../../utils/utils";
import { useForm } from "react-hook-form";
import api from "../../../api";

export default function ManageContactInfo() {

    const [showForm, setShowForm] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState, control, setError, setValue, reset} = useForm({});
    const { errors } = formState;
    const [contactInfo, setContactInfo] = useState<any>({});

    useEffect(() => {
        const getContactInfo = async () => {
            const result = await api.get('/contact-info');
            console.log("Meeting links", result);
            console.log(result);
            if(result.data.status==="success"){
                setContactInfo(result?.data?.payload[0]);
            }
        };
        getContactInfo();
    }, []);


    const _updateContacts = (contacts: any) => {
        setShowForm(!showForm);
        setValue("phone_number", contactInfo?.phone_number);
        setValue("alternate_phone_number", contactInfo?.alternate_phone_number);
        setValue("email", contactInfo?.email);
        setValue("address", contactInfo?.address);
    }

    const onSubmit = async (data: any) => {
        console.log(data);
        const result = await api.post("/contact-info?", {
            "phone_number": data.phone_number,
            "alternate_phone_number": data.alternate_phone_number,
            "email": data.email,
            "address": data.address
        });
        if(result.data.status==="success"){
            setContactInfo(result?.data?.payload[0]);
        }
        reset();
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
                            <div className="label">Phone 1</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("phone_number", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.phone_number && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Phone 2</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("alternate_phone_number", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.alternate_phone_number && <p className="error-message">This is required.</p>}
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
                            {errors?.email && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Address</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("address", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.address && <p className="error-message">This is required.</p>}
                        </div>
                
                        <div className="text-center mt-4 mb-2">
                            {false ? (
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
                <div>
                    {true ? (
                        <div className="meetings-table">
                            <div className="row">
                                <div className="col meetings-content">
                                    <b>Phone</b>
                                </div>
                                <div className="col meetings-content">
                                    <b>Phone</b>
                                </div>
                                <div className="col meetings-content">
                                    <b>Email</b>
                                </div>
                                <div className="col meetings-content">
                                    <b>Address</b>
                                </div>
                                <div className="col meetings-content">
                                    <b>Option</b>
                                </div>
                            </div>
                            { !isObjIsEmpty(contactInfo) &&
                                <div className="row">
                                    <div className="col meetings-content">
                                        {contactInfo?.phone_number}
                                    </div>
                                    <div className="col meetings-content">
                                        {contactInfo?.alternate_phone_number}
                                    </div>
                                    <div className="col meetings-content">
                                        {contactInfo?.email}
                                    </div>
                                    <div className="col meetings-content">
                                        {contactInfo?.address}
                                    </div>
                                    <div className="col meetings-content">
                                        <i
                                            className="bi bi-pen icon-edit"
                                            onClick={() => _updateContacts(contactInfo)}
                                        >   
                                        </i>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        <div className="page-loading-spinner-style">
                            <LoadingSpinner />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

