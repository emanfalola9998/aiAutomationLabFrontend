// utils/notifications.ts
import { AppDispatch } from "@/store/store";
import { setNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/store/features/counterSlice";
import { AuthService } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export const fetchNotifications = () => async (dispatch: AppDispatch) => {
    try {
        const token = AuthService.getToken();
        console.log('Token for notifications:', token ? 'exists' : 'missing');


        const res = await fetch(`${API_URL}/api/notifications`, {
        headers: {
            "Authorization": `Bearer ${AuthService.getToken()}`
        }
        });

        console.log('Notifications response status:', res.status);


        if (!res.ok) throw new Error('Failed to fetch notifications');

        const data = await res.json();
        console.log('Fetched notifications:', data);

        dispatch(setNotifications(data));
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
    };

export const markAsRead = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${AuthService.getToken()}`
        }
        });

        dispatch(markNotificationAsRead(id));
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};

export const markAllAsRead = () => async (dispatch: AppDispatch) => {
    try {
        await fetch(`${API_URL}/api/notifications/read-all`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${AuthService.getToken()}`
            }
        });

        dispatch(markAllNotificationsAsRead());
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
    }
};