import "../css/admin.css";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { constructEmailInviteProperties, convertoDate, convertTime, isAllTimeSlotDeclined, isAllTimeSlotsDeclined, isAnyOneTimeSlotInvited, isSameStatus, isTimeSlotAlreadyInvitedOrDeclined, showToast } from "../../../utils/utils";
import api from "../../../api";
import { sendEmail } from "../../../services/EmailService";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

export default function ManageMeetings() {

    const [meetings, setMeetings] = useState<any>([]);
    const [content, setContent] = useState<any>(null);
    

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT,{ transports: ['websocket'], withCredentials: true });
    socket.on("meeting-requested-user", () => { 
        fetchAllMeetings()
    });
  }, []);

    const fetchAllMeetings = async () => {
        const result = await api.get('/meeting-requested-user');
        if(result.data.status==="success"){
            setMeetings(result?.data?.payload.reverse());
        }
    };

    const fetchContents = async () => {
        const result = await api.get('/content');
        if(result.data.status==="success"){
            let content = result?.data?.payload.reverse();
            setContent(content[0]);
        }
    }

    const sendEmailNotification = async (payload: any) => {
        try {
          const result: any = await sendEmail(payload);
          if(result?.data?.status === "success") {
            showToast("Notified to user.", true);
          } else {
            showToast("Issue while creating meeting.", false);
          } 
        } catch (error: any) {
          showToast("Issue while creating meeting.", false);
        }
    }

    const updateMeetingStatus = async (status: string, meeting: any, 
        _timeslot: any, sendEmail: boolean, completeMeeting: boolean) => {
        let payload = { status: status };
        try {
            const result = await api.put(`/meeting-time-slot/${_timeslot?.id}`, payload);
            if (completeMeeting) {
                const result = await api.put(`/meeting-requested-user/${meeting?.id}`, payload )
                if(result.data.status==="success") {
                    console.log(payload.status);
                    sendEmailNotification({
                        isusernotificationemail: true,
                        name: meeting?.name,
                        email: meeting?.email
                    });
                }
            }
            if(result.data.status==="success") {
                if(sendEmail) {
                    sendEmailNotification({
                        isusernotificationemail: true,
                        name: meeting?.name,
                        email: meeting?.email
                    });
                }
                fetchAllMeetings();
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleInviteOrDecline = async(status: string, meeting: any, _timeslot: any) => {
        // const selectedTimeSlot = meeting?.preferedDateAndTimeslots?.find((timeslot: any) => timeslot?.id == _timeslot?.id);
        if(_timeslot?.status !== "ACTIVE") {
            showToast("Already status update.", true);
        } else {
            if(status === "Invited") {
                updateMeetingStatus(status, meeting, _timeslot, true, false);
            }
            if(status === "Declined" && isAllTimeSlotDeclined(meeting?.preferedDateAndTimeslots)) {
                updateMeetingStatus(status, meeting, _timeslot, true, true);
                showToast("Decline status updated to user.", true);
            }
            if(status === "Declined" && !isAllTimeSlotDeclined(meeting?.preferedDateAndTimeslots)) {
                updateMeetingStatus(status, meeting, _timeslot, false, false);
            }
        }
    };

    const completeMeetingStatus = async(status: string, meeting: any) => {
        let payload = { status: status };
        if(meeting?.status === "Completed") {
            showToast("Meeting already completed", true);
        } else {
            // if(isAllTimeSlotDeclined(meeting?.preferedDateAndTimeslots)) {
            // } 
            if (isAnyOneTimeSlotInvited(meeting?.preferedDateAndTimeslots)) {
                try {
                    const result = await api.put(`/meeting-requested-user/${meeting?.id}`, payload )
                    if(result.data.status==="success") {
                        console.log(meeting);
                        sendEmailNotification({
                            isusernotificationemail: true,
                            name: meeting?.name,
                            email: meeting?.email,
                            document_link: content.document_link
                        });

                    }
                    fetchAllMeetings();
                } catch (error: any) {
                    console.log(error)
                }
            } else {
                showToast("You can not complete the meeting without invite or decline the time slot.", false);
            }
        }
    }

    const filteredMeetingsData = () => {
        return meetings.filter((meeting: any) => (meeting?.status != "Completed" && 
            meeting.preferedDateAndTimeslots.some((timeslot: any) => timeslot.status !== 'Declined')));
    }

    useEffect(() => {  
        fetchAllMeetings();
        fetchContents();
    }, []);

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
                                                <button className={item?.status === 'Invited'? "button-approved" : "button-approve"} onClick={()=> handleInviteOrDecline('Invited', meeting, item)}>
                                                    {item?.status === 'Invited'? "Invited" : "Invite"}
                                                </button>
                                                <button className={item?.status === 'Declined'? "button-declined" : "button-decline"} onClick={()=> handleInviteOrDecline('Declined', meeting, item)}>
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
                                                onClick={() => completeMeetingStatus("Completed", meeting)}
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
                    {/* <LoadingSpinner /> */}
                    <p>No request recived.</p>
                </div>
            ) } 
        </div>
    );
}
