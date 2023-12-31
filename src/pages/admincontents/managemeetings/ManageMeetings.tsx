import "../css/admin.css";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { sendMail } from "../../../services/EmailService";
import { constructEmailInviteProperties, convertoDate, convertTime, isAllTimeSlotsDeclined, isAnyOneTimeSlotInvited, isSameStatus, isTimeSlotAlreadyInvitedOrDeclined, showToast } from "../../../utils/utils";
import api from "../../../api";


export default function ManageMeetings() {

    const [meetings, setMeetings] = useState<any>([]);

    const getMeetingInfo = async () => {
        const result = await api.get('/meeting-requested-user');
        if(result.data.status==="success"){
            setMeetings(result?.data?.payload.reverse());
            console.log("Timeslots", result?.data?.payload.reverse());
        }
    };
    useEffect(() => {  
        getMeetingInfo();
    }, []);

    const handleButtonClick = async(status: string, timeSlotId:number) => {
        console.log(status);
        let payload = { status: status };
        try {
            const result = await api.put(`/meeting-time-slot/${timeSlotId}`, payload);
            console.log(result);
            if(result.data.status==="success"){
                console.log(payload.status)
                getMeetingInfo();
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    const completeMeetingStatus = async(status: string, meetingRequestUserId:number) => {
        let payload = { status: status };
        try {
            const result = await api.put(`/meeting-requested-user/${meetingRequestUserId}`, payload )
            if(result.data.status==="success") {
                console.log(payload.status)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const filteredMeetingsData = () => {
        return meetings.filter((meeting: any) => (meeting?.status != "Completed" && 
            meeting.preferedDateAndTimeslots.some((timeslot: any) => timeslot.status !== 'Declined')));
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

            {(filteredMeetingsData() && filteredMeetingsData()?.length > 0 ) ? (
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
                    {(filteredMeetingsData() && filteredMeetingsData()?.length > 0) && filteredMeetingsData().map((meeting: any, index: any) => (
                       <div key={meeting?.id || index}>
                            {/* /{(!meeting?.is_meeting_completed && !isAllTimeSlotsDeclined(meeting)) && // */}
                                <div className="row">
                                    <div className="col-2 meetings-content">
                                        {meeting?.name} {index + 1}
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
                                        {meeting.preferedDateAndTimeslots.map((item: any, index: any) =>
                                            <div key={index}>
                                                {convertoDate(item?.date)}, {convertTime(item?.time)}.
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-3 meetings-content">
                                        {meeting.preferedDateAndTimeslots.map((item: any) =>
                                            <div key={item.id}>
                                                <button className={item?.status === 'Invited'? "button-approved" : "button-approve"} onClick={()=>handleButtonClick('Invited',item?.id)}>
                                                    {item?.status === 'Invited'? "Invited" : "Invite"}
                                                </button>
                                                <button className={item?.status === 'Declined'? "button-declined" : "button-decline"} onClick={()=>handleButtonClick('Declined',item?.id)}>
                                                    {item?.status === 'Declined'? "Declined" : "decline"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-2 meetings-content">
                                        { (meeting?.iscompleting) ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <button
                                                className={`${meeting?.status === "Completed" ? "button-completed" : "button-complete"}`}
                                                onClick={() => completeMeetingStatus("Completed",meeting.id)}
                                            >
                                                {meeting?.status === "Completed" ? "Completed" : "Complete"}
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
