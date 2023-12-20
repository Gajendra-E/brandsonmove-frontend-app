import "../css/admin.css";
import React, { useEffect, useState } from "react";
// import { useMutation, useQuery, useSubscription } from "@apollo/client";
// import { GET_ALL_MEETING_SCHEDULE_SUB, GET_CONTENT, GET_MEETING_INFO, UPDATE_ONE } from "../../../graphql";
// import LoadingSpinner from "../../../components/common/loadingspinner/LoadingSpinner";
import { sendMail } from "../../../services/EmailService";
import { constructEmailInviteProperties, convertoDate, isAllTimeSlotsDeclined, isAnyOneTimeSlotInvited, isSameStatus, isTimeSlotAlreadyInvitedOrDeclined, showToast } from "../../../utils/utils";

export default function ManageMeetings() {

    const [meetings, setMeetings] = useState<any>([]);

    const [document, setDocument] = useState<any>({});
    const [queryVariables, setQueryVariables] = useState<any>({});

    // const { loading: loadingMeeting,
    //     error: meetingError,
    //     data: meetingResult,
    //     refetch
    // } = useQuery(GET_MEETING_INFO, {
    //     variables: {
    //         meetingid: null
    //     },
    //     // skip: !queryVariables,
    // });

    // const {
    //     data: _content,
    //     error: errorContent,
    //     loading: loadingcontent,
    //   } = useSubscription(GET_CONTENT, {
    //     variables: {
    //       where: {},
    //       limit: 50,
    //       order_by: {created_at: "desc" },
    //       offset: 0
    //     },
    //     onData: ({ data }) => {
    //         setDocument(data?.data?.content[0]);
    //     },
    //     onError(error: any) {
    //       console.log("Error while subscription>>>>", error);
    //     },
    //   });

    // const { data: _meetingss, loading: loading } = useSubscription(GET_ALL_MEETING_SCHEDULE_SUB, {
    //     variables: {
    //         where: queryVariables,
    //         limit: 20,
    //         order_by: {created_at: "asc" },
    //         offset: 0
    //     },
    //     onData: ({ data }) => {
    //         if(meetings && meetings?.length > 0) {
    //             setMeetings([]);
    //         }
    //         if(data?.data?.objects && data?.data?.objects?.length > 0) {
    //             // setMeetings(data?.data?.objects);
    //             data?.data?.objects.forEach((meeting: any) => {
    //                 addPropertiesForLoadingIndicator(meeting);
    //                 // setMeetings((prevItems: any) => [...prevItems, meeting]);
    //                 setMeetings((prevItems: any) => {
    //                     const itemExists = prevItems.some((item: any) => item.id === meeting.id);
    //                     if (!itemExists) {
    //                       return [...prevItems, meeting];
    //                     }
    //                     return prevItems;
    //                 });
    //             });
    //         }
    //     },
    //     onError: (error: any) => {
    //       console.log("Error while getting id", error);
    //       setMeetings([]);
    //     },
    // });

    // const [_updateTimeSlotStatus, { loading: updatingStatus }] =
    // useMutation(UPDATE_ONE("meetings"), {
    //   onCompleted: (result: any) => {
    //     // console.log("Update Result::::", result);
    //   },
    //   onError: (error: any) => {
    //     console.log("Update Error::::", error);
    //   },
    // });

    const _completeMeetingAndUpdateStatus = async (meeting: any, slot: any) => {
        // try {
        //     changeSpinnerStatus(false, meeting, slot, true, true);
        //     let updateResult = await _updateTimeSlotStatus({
        //         variables: {
        //             id: meeting?.id,
        //             object: {
        //                 is_meeting_completed: true
        //             }
        //         },
        //     });
        //     if(updateResult?.data?.object?.id) {
        //         if(isAllTimeSlotsDeclined(meeting)) {
        //             console.log("All time slots are declined, no need to send mail.");
        //         } else {
        //             meeting.documentlink = document?.document_link;
        //             let mailSendResult = await sendMail(constructEmailInviteProperties(meeting, slot, "complete"));
        //             console.log("mail send result", mailSendResult);
        //             if(mailSendResult?.status == 200 || mailSendResult?.data?.message == "success") {
        //                 showToast("Status updated and notified user.", true);
        //             } else {
        //                 showToast("Error, something went wrong.", false);
        //             }
        //         }
        //         changeSpinnerStatus(false, meeting, slot, false, true);
        //     } else {
        //         showToast("Error, something went wrong.", false);
        //         changeSpinnerStatus(false, meeting, slot, false, true);
        //     }
        // } catch (error: any) {
        //     showToast(error?.message || "Error, something went wrong.", false);
        //     changeSpinnerStatus(false, meeting, slot, false, true);
        // }
    }

    const completeMeetingAndUpdateStatus = async (meeting: any, slot: any) => {
        // console.log(meeting)
        // if (meeting?.is_meeting_completed) {
        //     showToast("Meeting already completed.", true);
        // } else {
        //     if (isAllTimeSlotsDeclined(meeting)) {
        //         _completeMeetingAndUpdateStatus(meeting, slot);
        //     } else if (isAnyOneTimeSlotInvited(meeting)) {
        //         _completeMeetingAndUpdateStatus(meeting, slot)
        //     } else {
        //         showToast("You can not complete without Invite or Decline the meeting.", false);
        //     }
        // }
        
    };

    const makeDBTimeSlotStatusUpdate = (status: boolean, meeting: any, slot: any) => {
        // let object: any = {};
        // if(!status && slot == "slot1") {
        //     object.timeslot1_is_declined = true;
        //     object.timeslot1_is_accepted = false;
        // }
        // if(!status && slot == "slot2") {
        //     object.timeslot2_is_declined = true;
        //     object.timeslot2_is_accepted = false;
        // }
        // if(!status && slot == "slot3") {
        //     object.timeslot3_is_declined = true;
        //     object.timeslot3_is_accepted = false;
        // }

        // if(status && slot == "slot1") {
        //     object.timeslot1_is_accepted = true;
        //     object.timeslot2_is_accepted = false;
        //     object.timeslot3_is_accepted = false;

        //     object.timeslot1_is_declined = false;
        // }
        // if(status && slot == "slot2") {
        //     object.timeslot1_is_accepted = false;
        //     object.timeslot2_is_accepted = true;
        //     object.timeslot3_is_accepted = false;

        //     object.timeslot2_is_declined = false;
        // }
        // if(status && slot == "slot3") {
        //     object.timeslot1_is_accepted = false;
        //     object.timeslot2_is_accepted = false;
        //     object.timeslot3_is_accepted = true;

        //     object.timeslot3_is_declined = false;
        // }
        // return object;
    }


    const addPropertiesForLoadingIndicator = (meeting: any) => {
        meeting.isinvitingslot1 = false;
        meeting.isinvitingslot2 = false;
        meeting.isinvitingslot3 = false;

        meeting.isdecliningslot1 = false;
        meeting.isdecliningslot2 = false;
        meeting.isdecliningslot3 = false;

        meeting.iscompleting = false;

        meeting.istimeslot1 = false;
        meeting.istimeslot2 = false;
        meeting.istimeslot3 = false;

        return meeting;
    }

    const changeSpinnerStatus = (status: boolean, meeting: any,
        slot: any, statustobeupdated: boolean, iscompletemeeting?: boolean) => {
        if (iscompletemeeting) {
            meeting.iscompleting = statustobeupdated;
        } else {
            if(slot == "slot1" && status) { 
                meeting.istimeslot1 = statustobeupdated;
                meeting.isinvitingslot1 = statustobeupdated;
            }
            if(slot == "slot2" && status) {
                meeting.istimeslot2 = statustobeupdated;
                meeting.isinvitingslot2 = statustobeupdated;
            }
            if(slot == "slot3" && status) {
                meeting.istimeslot3 = statustobeupdated;
                meeting.isinvitingslot3 = statustobeupdated;
            }

            if(slot == "slot1" && !status) { 
                meeting.istimeslot1 = statustobeupdated;
                meeting.isdecliningslot1 = statustobeupdated;
            }
            if(slot == "slot2" && !status) {
                meeting.istimeslot2 = statustobeupdated;
                meeting.isdecliningslot2 = statustobeupdated;
            }
            if(slot == "slot3" && !status) {
                meeting.istimeslot3 = statustobeupdated;
                meeting.isdecliningslot3 = statustobeupdated;
            }
        }
        // const updatedItems = meetings.map((item: any) =>
        //   item.id === meeting?.id ? { ...item, value: meeting } : item
        // );
        // setMeetings(updatedItems);
    }

    const updateMeetingStatus = async (status: boolean, meeting: any, slot: any) => {
        // if(!isSameStatus(status, meeting, slot) && !meeting?.is_meeting_completed && 
        //     !isTimeSlotAlreadyInvitedOrDeclined(meeting, slot)) {
        //     const object = makeDBTimeSlotStatusUpdate(status, meeting, slot);
        //     try {
        //         changeSpinnerStatus(status, meeting, slot, true, false);
        //         let updateResult = await _updateTimeSlotStatus({
        //             variables: {
        //                 id: meeting?.id,
        //                 object: object
        //             },
        //         });
        //         if(updateResult?.data?.object?.id) {
        //             // Not updating the state first time
        //             // setQueryVariables({ 
        //             //     meetingid: updateResult?.data?.object?.id || meeting?.id,
        //             // });
        //             let fetchResult = await refetch({
        //                 meetingid: updateResult?.data?.object?.id || meeting?.id,
        //             });
        //             if(fetchResult && fetchResult?.data && fetchResult?.data?.meetings_by_pk) {
        //                 let resultObj = fetchResult?.data?.meetings_by_pk;
        //                 let isAllDeclined = isAllTimeSlotsDeclined(resultObj);
        //                 if(isAllDeclined && !status) {
        //                     let mailSendResult = await sendMail(constructEmailInviteProperties(meeting, slot, "decline"));
        //                     changeSpinnerStatus(status, meeting, slot, false, false);
        //                     if(mailSendResult?.status == 200 || mailSendResult?.data?.message == "success") {
        //                         showToast("Notified user.", true);
        //                     } else {
        //                         showToast("Error, something went wrong.", false);
        //                     }
        //                 }

        //                 if(!isAllDeclined && status) {
        //                     let mailSendResult = await sendMail(constructEmailInviteProperties(meeting, slot, "invite"));
        //                     changeSpinnerStatus(status, meeting, slot, false, false);
        //                     if(mailSendResult?.status == 200 || mailSendResult?.data?.message == "success") {
        //                         showToast("Notified user.", true);
        //                     } else {
        //                         showToast("Error, something went wrong.", false);
        //                     }
        //                 }
        //             }
        //         } else {
        //             showToast("Error, something went wrong.", false);
        //             changeSpinnerStatus(status, meeting, slot, false, false);
        //         }
        //     } catch (error: any) {
        //         console.log("Error", error);
        //         changeSpinnerStatus(status, meeting, slot, false, false);
        //         showToast(error?.message || "Error, something went wrong.", false);
        //     }
        // } else {
        //     showToast("Already updated the status.", true);
        // }
    }

    const handleChange = (event: any) => {
        if(event?.target?.value == "all") {
            setQueryVariables({});
        } else {
            setQueryVariables({
                meeting_type: {
                    _eq: event?.target?.value
                }
            });
        }
    };

    useEffect(() => {
        
    }, [meetings, queryVariables]);

    return (
        <div>
            <div className="filter-options-container text-end">
                <select onChange={handleChange}>
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
