import "../css/admin.css";
import React, { useEffect, useState } from "react";
// import { useMutation, useQuery, useSubscription } from "@apollo/client";
//import { GET_ALL_MEETING_SCHEDULE_SUB, GET_CONTENT, GET_MEETING_INFO, UPDATE_ONE } from "../../../graphql";
import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { sendMail } from "../../../services/EmailService";
import { constructEmailInviteProperties, convertoDate, isAllTimeSlotsDeclined, isAnyOneTimeSlotInvited, isSameStatus, isTimeSlotAlreadyInvitedOrDeclined, showToast } from "../../../utils/utils";

export default function ManageMeetings() {


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
            {/* {(meetings && meetings?.length > 0 && !loading) ? ( */}
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
                    {/* {meetings.map((meeting: any, index: any) => (
                       <div key={meeting?.id || index}>
                            {(!meeting?.is_meeting_completed && !isAllTimeSlotsDeclined(meeting)) && 
                                <div className="row">
                                    <div className="col-2 meetings-content">
                                        {meeting?.name}
                                    </div>
                                    <div className="col-2 meetings-content">
                                        {meeting?.email}
                                    </div>
                                    <div className="col-1 meetings-content">
                                        {
                                            meeting?.meeting_type == "googlemeet" &&
                                            <div>Google Meet</div>
                                        }
                                        {
                                            meeting?.meeting_type == "zoom" &&
                                            <div>Zoom</div>
                                        }
                                        {
                                            meeting?.meeting_type == "msteams" &&
                                            <div>MS Teams</div>
                                        }
                                    </div>
                                    <div className="col-2 meetings-content">
                                        { meeting?.timeslot1 &&
                                            <div>
                                                {convertoDate(meeting?.timeslot1)}
                                            </div>
                                        }
                                        { meeting?.timeslot2 &&
                                            <div>
                                                {convertoDate(meeting?.timeslot2)}
                                            </div>
                                        }
                                        { meeting?.timeslot3 &&
                                            <div>
                                                {convertoDate(meeting?.timeslot3)}
                                            </div>
                                        }
                                    </div>
                                    <div className="col-3 meetings-content">
                                        { meeting?.timeslot1 &&
                                            <div>
                                                { (meeting?.istimeslot1 && meeting?.isinvitingslot1) ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    <button
                                                        className={`${meeting?.timeslot1_is_accepted ? "button-approved" : "button-approve"}`}
                                                        onClick={() => updateMeetingStatus(true, meeting, "slot1")}
                                                    >
                                                        {meeting?.timeslot1_is_accepted ? "Invited" : "Invite"}
                                                    </button>
                                                )}
                                                { (meeting?.istimeslot1 && meeting?.isdecliningslot1) ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    <button
                                                        className={`${meeting?.timeslot1_is_declined ? "button-declined" : "button-decline"}`}
                                                        onClick={() => updateMeetingStatus(false, meeting, "slot1")}
                                                    >
                                                        {meeting?.timeslot1_is_declined ? "Declined" : "Decline"}
                                                    </button>
                                                )}
                                            </div>
                                        }
                                        { meeting?.timeslot2 &&
                                            <div>
                                                { (meeting?.istimeslot2 && meeting?.isinvitingslot2) ? (
                                                    <LoadingSpinner />
                                                ): (
                                                    <button
                                                        className={`${meeting?.timeslot2_is_accepted ? "button-approved" : "button-approve"}`}
                                                        onClick={() => updateMeetingStatus(true, meeting, "slot2")}
                                                    >
                                                        {meeting?.timeslot2_is_accepted ? "Invited" : "Invite"}
                                                    </button>
                                                )}
                                                { (meeting?.istimeslot2 && meeting?.isdecliningslot2) ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    <button
                                                        className={`${meeting?.timeslot2_is_declined ? "button-declined" : "button-decline"}`}
                                                        onClick={() => updateMeetingStatus(false, meeting, "slot2")}
                                                    >
                                                        {meeting?.timeslot2_is_declined ? "Declined" : "Decline"}
                                                    </button>
                                                )}
                                            </div>
                                        }
                                        { meeting?.timeslot3 &&
                                            <div>
                                                { (meeting?.istimeslot3 && meeting?.isinvitingslot3) ? (
                                                    <LoadingSpinner />
                                                ): (
                                                    <button
                                                        className={`${meeting?.timeslot3_is_accepted ? "button-approved" : "button-approve"}`}
                                                        onClick={() => updateMeetingStatus(true, meeting, "slot3")}
                                                    >
                                                        {meeting?.timeslot3_is_accepted ? "Invited" : "Invite"}
                                                    </button>
                                                )}
                                                { (meeting?.istimeslot3 && meeting?.isdecliningslot3) ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    <button
                                                        className={`${meeting?.timeslot3_is_declined ? "button-declined" : "button-decline"}`}
                                                        onClick={() => updateMeetingStatus(false, meeting, "slot3")}
                                                    >
                                                        {meeting?.timeslot3_is_declined ? "Declined" : "Decline"}
                                                    </button>
                                                )}
                                            </div>
                                        }
                                    </div>
                                    <div className="col-2 meetings-content">
                                        { (meeting?.iscompleting) ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <button
                                                className={`${meeting?.is_meeting_completed ? "button-completed" : "button-complete"}`}
                                                onClick={() => completeMeetingAndUpdateStatus(meeting, "slot1")}
                                            >
                                                {meeting?.is_meeting_completed ? "Completed" : "Complete"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    ))} */}
                </div>
            {/* ) : (
                <div className="page-loading-spinner-style">
                    <LoadingSpinner />
                </div>
            ) } */}
        </div>
    );
}
