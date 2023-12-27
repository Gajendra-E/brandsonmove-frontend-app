import { toast } from "react-toastify";
import { CC_MAILS } from "../constants/constants";


export const isObjIsEmpty = (object: any) => {
  for (const prop in object) {
    if (Object.hasOwn(object, prop)) {
      return false;
    }
  }
  return true;
}


export const showToast = (message: any, status: any) => {
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
};

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getOneMonthFromToday = () => {
  const daysInFuture = 31;
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysInFuture);
  futureDate.setHours(0, 0, 0, 0);
  return futureDate;
};

export const convetToTimeStamp = (date: Date, type: any) => {
  if(type = "today") {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T00:10:00+00:00`;
  }
  if(type == "month") {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T23:50:00+00:00`;
  }
}

export const getFormatedDate = (date: Date) => {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
}

export const convertoDate = (date: any) => {
  const timestamp = new Date(date);
  const date1 = timestamp.getDate();
  const month = timestamp.toLocaleString("default", { month: "long" });
  const year = timestamp.getFullYear();
  return `${date1} - ${month} - ${year}`;
}
export const convertTime = (timeString: string): string => {
  const time = new Date(`1970-01-01T${timeString}Z`);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: true });
}


export const constructEmailInviteProperties = (meetinginfo: any, slot: any, emailtype: string) => {
  let _meetinginfo = {
    toemail: meetinginfo?.email,
    name: meetinginfo?.name,
    ccemails: CC_MAILS,
    meetingtye: meetinginfo?.meeting_type,
    meetinginvitelink: meetinginfo?.inivitation_link,
    passcode: meetinginfo?.passcode,
    approvedtimeslot: "",
    status: true,
    isadminnotificationemail: false,
    isusernotificationemail: false,
    isinvitedeclineemail: false,
    ismeetingcompleteemail: false,
    documentlink: ""
  }

  if(emailtype == "invite") {
    _meetinginfo.isusernotificationemail = true;
  }
  if(emailtype == "decline") {
    _meetinginfo.isinvitedeclineemail = true;
  }
  if(emailtype == "complete") {
    _meetinginfo.ismeetingcompleteemail = true;
    _meetinginfo.documentlink = meetinginfo?.documentlink;
  }

  if(slot == "slot1") {
    _meetinginfo.approvedtimeslot = meetinginfo?.timeslot1;
  }

  if(slot == "slot2") {
    _meetinginfo.approvedtimeslot = meetinginfo?.timeslot2;
  }

  if(slot == "slot3") {
    _meetinginfo.approvedtimeslot = meetinginfo?.timeslot3;
  }

  return _meetinginfo;
}


export const isAllTimeSlotsDeclined = (meetinginfo: any) => {
  let availableSlots = [];
  if(meetinginfo?.timeslot1) {
      availableSlots.push(
          { id: meetinginfo?.id, timeslot: meetinginfo?.timeslot1, status: meetinginfo?.timeslot1_is_declined },
      );
  }
  if(meetinginfo?.timeslot2) {
      availableSlots.push(
          { id: meetinginfo?.id, timeslot: meetinginfo?.timeslot2, status: meetinginfo?.timeslot2_is_declined },
      );
  }
  if(meetinginfo?.timeslot3) {
      availableSlots.push(
          { id: meetinginfo?.id, timeslot: meetinginfo?.timeslot3, status: meetinginfo?.timeslot3_is_declined },
      );
  }
  return availableSlots.every((item: any) => item.status === true);
}

export const isAnyOneTimeSlotInvited = (meetinginfo: any) => {
  let availableSlots = [];
  if(meetinginfo?.timeslot1) {
      availableSlots.push(
          { id: meetinginfo?.id, timeslot: meetinginfo?.timeslot1, status: meetinginfo?.timeslot1_is_accepted },
      );
  }
  if(meetinginfo?.timeslot2) {
      availableSlots.push(
          { id: meetinginfo?.id, timeslot: meetinginfo?.timeslot2, status: meetinginfo?.timeslot2_is_accepted },
      );
  }
  if(meetinginfo?.timeslot3) {
      availableSlots.push(
          { id: meetinginfo?.id, timeslot: meetinginfo?.timeslot3, status: meetinginfo?.timeslot3_is_accepted },
      );
  }
  return availableSlots.some((item: any) => item.status === true);
}

export const isSameStatus = (status: boolean, meeting: any, slot: any) => {
  if(status && slot == "slot1") {
      return meeting?.timeslot1_is_accepted;
  }
  if(status && slot == "slot2") {
      return meeting?.timeslot2_is_accepted;
  }
  if(status && slot == "slot3") {
      return meeting?.timeslot3_is_accepted;
  }
  if(!status && slot == "slot1") {
      return meeting?.timeslot1_is_declined;
  }
  if(!status && slot == "slot2") {
      return meeting?.timeslot2_is_declined;
  }
  if(!status && slot == "slot3") {
      return meeting?.timeslot3_is_declined;
  }
}

export const isTimeSlotAlreadyInvitedOrDeclined = (meeting: any, slot: string) => {
  if(slot == "slot1") {
      return meeting?.timeslot1_is_accepted || meeting?.timeslot1_is_declined;
  }
  if(slot == "slot2") {
      return meeting?.timeslot2_is_accepted || meeting?.timeslot2_is_declined;
  }
  if(slot == "slot3") {
      return meeting?.timeslot3_is_accepted || meeting?.timeslot3_is_declined;
  }
}

