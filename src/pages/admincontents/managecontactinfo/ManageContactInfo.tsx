import "../css/admin.css";
import React, { useEffect, useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import { Q_GET_CONTACT_INFO, UPDATE_ONE } from "../../../graphql";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import {isObjIsEmpty, showToast } from "../../../utils/utils";
import { useForm } from "react-hook-form";

export default function ManageContactInfo() {

    const [showForm, setShowForm] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState, control, setError, setValue, reset} = useForm({});
    const { errors } = formState;
    const [contactInfo, setContactInfo] = useState<any>({});

    // const [updateContacts, { loading: updatingContacts }] = useMutation(
    //     UPDATE_ONE("contacts")
    // );

    // const { loading, error, data, refetch 
    // } = useQuery(Q_GET_CONTACT_INFO, {
    //     variables: {
    //         id: "63864e09-07ee-47ad-b866-26afd68e31bd"
    //     },
    //     onCompleted: (result: any) => {
    //         setContactInfo(result?.contacts_by_pk);
    //     },
    //     onError: (error: any) => {
    //         console.log("Error While fetching", error);
    //     },
    // });

    const _updateContacts = (contacts: any) => {
        setShowForm(!showForm);
        setValue("phone1", contactInfo?.phone1);
        setValue("phone2", contactInfo?.phone2);
        setValue("email", contactInfo?.email);
        setValue("address", contactInfo?.address);
    }

    const onSubmit = async (data: any) => {
        // updateContacts({
        //     variables: {
        //       id: contactInfo?.id,
        //       object: data,
        //     },
        // }).then((resut: any) => {
        //     refetch();
        //     reset();
        //     setShowForm(!showForm)
        //     showToast("Successfully saved.", true);
        // }).catch((error: any) => {
        //     showToast(error?.message || "Error.", false);
        // });
    }

    useEffect(() => {
    }, [contactInfo]);

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
                                    ...register("phone1", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.phone1 && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Phone 2</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("phone2", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors?.phone2 && <p className="error-message">This is required.</p>}
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
                                        {contactInfo?.phone1}
                                    </div>
                                    <div className="col meetings-content">
                                        {contactInfo?.phone2}
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

