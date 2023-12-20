import axios, { AxiosResponse } from "axios";
import { APP_CONFIG } from "../config/config";
import { CC_MAILS } from "../constants/constants";

export const sendMail = async (meetinginfo: any) => {
    const response: AxiosResponse = await axios({
        method: "POST",
        url: `${APP_CONFIG.API_BASE_URL}/nodemailer/sendemail`,
        data: meetinginfo
    });
    return response;
}