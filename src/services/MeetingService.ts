// import { google, Auth } from "googleapis";
import credentials from "../securefiles/footprintz-d12671774519.json";

/*
export const createGoogleMeet = async (date: any, time: any) => {

  console.log("DATA:::::", JSON.stringify(date));
  console.log("TIME:::::", JSON.stringify(time));

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(JSON.stringify(credentials)),
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });

  const authClient = await auth.getClient() as Auth.JWT;
  google.options({ auth: authClient });

  const calendar = google.calendar({ version: "v3" });
  const eventStartTime = new Date(`${date}T${time}:00`);
  const eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000);

  const event = {
    summary: "Google Meet Meeting",
    start: {
      dateTime: eventStartTime.toISOString(),
    },
    end: {
      dateTime: eventEndTime.toISOString(),
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary", // Use "primary" for the authenticated user"s primary calendar
    requestBody: event,
  });

  const meetLink = response.data.hangoutLink;
  console.log("Google Meet created:", meetLink);
  // Do something with the meetLink, such as displaying it to the user
};

*/