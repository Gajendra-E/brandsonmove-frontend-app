import axios, { AxiosResponse } from "axios";
import { APP_CONFIG } from "../config/config";
import api from "../api";

export const sendMail = async (meetinginfo: any) => {
    const response: AxiosResponse = await axios({
        method: "POST",
        url: `${APP_CONFIG.API_BASE_URL}/nodemailer/sendemail`,
        data: meetinginfo
    });
    return response;
} 

export const sendEmail = async (payload: any) => {
    return await api.post('/users/send-email', payload);
}
