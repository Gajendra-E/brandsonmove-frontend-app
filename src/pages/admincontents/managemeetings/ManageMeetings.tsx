import "../css/admin.scss";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { convertoDate, convertTime, isAllTimeSlotDeclined, isAnyOneTimeSlotInvited, showToast } from "../../../utils/utils";
import api from "../../../api";
import { sendEmail } from "../../../services/EmailService";
import socketIOClient from "socket.io-client";
const BACKENDURL = "http://localhost:3000";

export default function ManageMeetings() {

    const [meetings, setMeetings] = useState<any>([]);
    const [content, setContent] = useState<any>(null);
    const [meetingLinks, setMeetingLinks] = useState<any>([]);
    
    useEffect(() => {
        const socket = socketIOClient(BACKENDURL,{ transports: ['websocket'], withCredentials: true });
        socket.on("meeting-requested-user", () => { 
            fetchAllMeetings()
        });

        fetchAllMeetings();
        fetchContentAndMeetingLinks();
    }, [meetings]);

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

    const updateMeetingStatus = async (status: string, meeting: any, _timeslot: any, sendEmail: boolean, completeMeeting: boolean) => {
        let payload = { status: status };
       
            try {
                const result = await api.put(`/meeting-time-slot/${_timeslot?.id}`, payload);
                if(result.data.status==="success") {
                  
                    if(sendEmail) {
                        sendEmailNotification({
                            isusernotificationemail: true,
                            name: meeting?.name,
                            toemail: meeting?.email,
                            meetinginvitelink: getMeetingLink(meeting?.type)?.link,
                            passcode: getMeetingLink(meeting?.type)?.pass_code,
                            approvedtimeslot: {
                                date: _timeslot?.date,
                                time: _timeslot?.time
                            }
                        });
                    }
                   
                   
                    if (completeMeeting) {
                        const result = await api.put(`/meeting-requested-user/${meeting?.id}`, payload )
                        if(result.data.status==="success") {
                            sendEmailNotification({
                                isinvitedeclineemails: true,
                                name: meeting?.name,
                                toemail: meeting?.email,
                                documentlink: content?.document_link
                            });
                        }
                    }
    
                    if(status==="Declined"){
                        const allTimeSlatsDecliened =  result?.data?.payload.every((obj:any) => obj.status === 'Declined')
                        if(allTimeSlatsDecliened){
                           sendEmailNotification({
                               isinvitedeclineemail: true,
                               name: meeting?.name,
                               toemail: meeting?.email
                           });
                        }
                    }
    
                }
                
            } catch (error: any) {
                console.log("Error while updating status", error);
            }
   

       
    }

    const handleInviteOrDecline = async(status: string, meeting: any, _timeslot: any) => {
        // const selectedTimeSlot = meeting?.preferedDateAndTimeslots?.find((timeslot: any) => timeslot?.id == _timeslot?.id);
        if(_timeslot?.status !== "ACTIVE") {
            showToast("Already status updated", false);
        } 
        else if(status==="Invited"&&meeting?.preferedDateAndTimeslots.some((item:any)=>item.status==="Invited")) {
                showToast("This user request one time slot Already Invited", false);
            }
        else {
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
                        sendEmailNotification({
                            ismeetingcompleteemail: true,
                            name: meeting?.name,
                            toemail: meeting?.email,
                            documentlink: content?.document_link
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
        // return meetings;
        return meetings.filter((meeting: any) => (meeting?.status != "Completed" && 
            meeting.preferedDateAndTimeslots.some((timeslot: any) => timeslot.status !== 'Declined')));
    }
  
    const getMeetingLink = (type: string) => {
        return meetingLinks.find((link: any) => link?.meeting_type == type);
    }

    const fetchAllMeetings = async () => {
        try {
            const result = await api.get('/meeting-requested-user');
            if(result.data.status==="success"){
                setMeetings(result?.data?.payload.reverse());
            }  
        } catch (error: any) {
            console.log("Error fetch meetings", error);
        }
    };

    const fetchContentAndMeetingLinks = async () => {
        try {
          const [result1, result2] = await Promise.all([
            api.get("/content"),
            api.get("/meeting-link"),
          ]);
          setContent(result1?.data?.payload[0]);
          setMeetingLinks(result2?.data?.payload);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

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
                                                {convertoDate(item?.date)}, {(item?.time)}.
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
