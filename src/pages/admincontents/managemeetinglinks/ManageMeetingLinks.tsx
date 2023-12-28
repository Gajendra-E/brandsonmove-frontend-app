import "../css/admin.css";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import api from "../../../api";

export default function ManageMeetingLinks() {

    const [loading, setLoading] = useState<boolean>(false);
    const [meetingLinks, setMeetingLinks] = useState<any>({});
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [editContent, setEditContent] = useState<any>({});
    const { register, handleSubmit, watch, formState, control, setError, setValue, reset} = useForm({});
    const { errors } = formState;

    const performAction = (actiontype: any, linkdata: any) => {
        // if(actiontype == "delete") {
        //     showToast("Action not implemented yet.", false);
        // }
        if(actiontype == "edit") {
            setEditContent(linkdata)
            setShowEditForm(!showEditForm);
        }
    }

    const onSubmit = async (id: number, data: any) => {

        setLoading(true);
        const result = await api.put(`/meeting-link/${id}`, data);
        if(result?.data?.status==="success"){
            setLoading(false);
            showToast("Successfully added.", true);
        } else {
            setLoading(false);
            showToast("Error.", false);
        }

    }

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
        const getMeetingLinks = async () => {
            const result = await api.get('/meeting-link');
            console.log(result);
            if(result.data.status==="success"){
                setMeetingLinks(result?.data?.payload);
            }
        };
        getMeetingLinks();
    }, []);
   
    return (
        <div>
            {showEditForm && 
                <div className="dynamic-content-form">
                    <form onSubmit={(e) => handleSubmit(onSubmit())}>
                        <div className="form-field">
                            <div className="label">Link</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("link", 
                                    { 
                                        required: true,
                                    })
                                }
                            />
                            {errors.link && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="form-field">
                            <div className="label">Passcode</div>
                            <input
                                className="form-input input"
                                type="text"
                                {
                                    ...register("passcode", 
                                    { 
                                        required: false,
                                    })
                                }
                            />
                            {errors.passcode && <p className="error-message">This is required.</p>}
                        </div>
                        <div className="text-center mt-4 mb-2">
                            {/* {updatingMeetingLink ? (
                                <LoadingSpinner />
                            ) : ( */}
                                <button className="button-submit" type="submit">
                                    Submit
                                </button>
                            {/* )} */}
                        </div>
                    </form>
                </div>
            }
            <div>
                {/* {(meetingLinks && meetingLinks?.length > 0 && !loadingmeetinglinks) ? ( */}
                    <div className="meetings-table">
                        <div className="row">
                            <div className="col meetings-content">
                                <b>Meeting type</b>
                            </div>
                            <div className="col-6 meetings-content">
                                <b>Link</b>
                            </div>
                            <div className="col meetings-content">
                                <b>Passcode</b>
                            </div>
                            <div className="col meetings-content">
                                <b>Options</b>
                            </div>
                        </div>
                        {meetingLinks && meetingLinks?.length > 0 && meetingLinks.map((link: any, index: any) => (
                            <div key={link?.id || index} className="row">
                                <div className="col meetings-content">
                                    {link?.meeting_type}
                                </div>
                                <div className="col-6 meetings-content">
                                    {link?.link}
                                </div>
                                <div className="col meetings-content">
                                    {link?.pass_code}
                                </div>
                                <div className="col meetings-content">
                                    {/* <i
                                        className="bi bi-trash3 icon-delete"
                                        onClick={() => performAction("delete", link)}
                                    >   
                                    </i> */}
                                    <i
                                        className="bi bi-pen icon-edit"
                                        onClick={() => performAction("edit", link)}
                                    >   
                                    </i>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                {/* ) : (
                    <div className="page-loading-spinner-style">
                        <LoadingSpinner />
                    </div>
                )} */}
            </div>
        </div>
    );
}
