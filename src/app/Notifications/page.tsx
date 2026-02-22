'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute'
import React from 'react'
import {Notification} from '../../../types'

// components/NotificationBell.tsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchNotifications, markAsRead, markAllAsRead } from '@/Utils/notifications';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.ai.notifications);
  const unreadCount = useSelector((state: RootState) => state.ai.unreadCount);

  // Fetch notifications on mount and every 30 seconds
  useEffect(() => {
    dispatch(fetchNotifications());
    
    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleNotificationClick = (id: number) => {
    dispatch(markAsRead(id));
  };

  return (
    <ProtectedRoute>
    <div className="relative">
      <button
        onClick={() => {
          if (!open) dispatch(markAllAsRead());
          setOpen(!open);
        }}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-sm text-gray-500">{unreadCount} unread</span>
              )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <Link
                    key={notif.id}
                    href={notif.link || '#'}
                    onClick={() => {
                      handleNotificationClick(notif.id);
                      setOpen(false);
                    }}
                    className={`block p-4 border-b hover:bg-gray-50 transition ${
                      !notif.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className={`text-sm ${!notif.isRead ? 'font-semibold' : ''}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!notif.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
    </ProtectedRoute>
  );
}


export default NotificationBell
