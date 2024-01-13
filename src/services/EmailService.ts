
import api from "../api";

export const sendEmail = async (payload: any) => {
    return await api.post('/users/send-email', payload);
}
