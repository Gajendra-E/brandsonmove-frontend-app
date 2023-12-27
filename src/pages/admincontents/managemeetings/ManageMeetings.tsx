import "../css/admin.css";
import React, { useEffect, useState } from "react";
// import { useMutation, useQuery, useSubscription } from "@apollo/client";
//import { GET_ALL_MEETING_SCHEDULE_SUB, GET_CONTENT, GET_MEETING_INFO, UPDATE_ONE } from "../../../graphql";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { sendMail } from "../../../services/EmailService";
import { constructEmailInviteProperties, convertoDate, convertTime, isAllTimeSlotsDeclined, isAnyOneTimeSlotInvited, isSameStatus, isTimeSlotAlreadyInvitedOrDeclined, showToast } from "../../../utils/utils";
import api from "../../../api";


export default function ManageMeetings() {

    const [meetings, setMeetings] = useState<any>([]);

    useEffect(() => {
        const getMeetingInfo = async () => {
            const result = await api.get('/meeting-requested-user');
            console.log(result)
            if(result.data.status==="success"){
                setMeetings(result?.data?.payload);
            }
        };
        getMeetingInfo();
    }, []);

    const handleButtonClick = (status: string) => {
        console.log('Status:', status);
    };

    const completeMeetingStatus = (status: string) => {
        console.log('Status', status)
    }

    return (
        <div>
            <div className="filter-options-container text-end">
                <select>
                    <option value="all">All</option>
                    <option value="googlemeet">Google Meet</option>
                    <option value="zoom">Zoom</option>
                    <option value="msteams">MS Teams</option>
                </select>
            </div>

            {(meetings && meetings?.length > 0 ) ? (
                <div className="meetings-table">
                    <div className="row">
                        <div className="col-2 meetings-content">
                            <b>Name</b>
                        </div>
                        <div className="col-2 meetings-content">
                            <b>Email</b>
                        </div>
                        <div className="col-1 meetings-content">
                            <b>Type</b>
                        </div>
                        <div className="col-2 meetings-content">
                            <b>Date and Time</b>
                        </div>
                        <div className="col-3 meetings-content">
                            <b>Options</b>
                        </div>
                        <div className="col-2 meetings-content">
                            <b>Complete</b>
                        </div>
                    </div>
                    {meetings.map((meeting: any, index: any) => (
                       <div key={meeting?.id || index}>
                            {/* /{(!meeting?.is_meeting_completed && !isAllTimeSlotsDeclined(meeting)) && // */}
                                <div className="row">
                                    <div className="col-2 meetings-content">
                                        {meeting?.name}
                                    </div>
                                    <div className="col-2 meetings-content">
                                        {meeting?.email}
                                    </div>
                                    <div className="col-1 meetings-content">
                                        {
                                            meeting?.type == "googlemeet" &&
                                            <div>Google Meet</div>
                                        }
                                        {
                                            meeting?.type == "zoom" &&
                                            <div>Zoom</div>
                                        }
                                        {
                                            meeting?.type == "msteams" &&
                                            <div>MS Teams</div>
                                        }
                                    </div>
                                    <div className="col-2 meetings-content">
                                    {meeting.preferedDateAndTimeslots.map((item: any) =>
                                        <div>
                                            {convertoDate(item?.date)}, {convertTime(item?.time)}.
                                        </div>
                                    )}
                                        
                                    </div>
                                    <div className="col-3 meetings-content">

                                    {meeting.preferedDateAndTimeslots.map((item: any) =>
                                        <div>
                                            <button className="button-approve" onClick={()=>handleButtonClick('invited')}>Invite</button>
                                            <button className="button-decline" onClick={()=>handleButtonClick('declined')}>Decline</button>
                                        </div>
                                    )}

                                        
                                    </div>
                                    <div className="col-2 meetings-content">
                                        { (meeting?.iscompleting) ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <button
                                                className={`${meeting?.is_meeting_completed ? "button-completed" : "button-complete"}`}
                                                onClick={() => completeMeetingStatus("ccompleted")}
                                            >
                                                {meeting?.is_meeting_completed ? "Completed" : "Complete"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            {/* } */}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="page-loading-spinner-style">
                    <LoadingSpinner />
                </div>
            ) } 
        </div>
    );
}
