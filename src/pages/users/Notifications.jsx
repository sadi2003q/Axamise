// path: src/page/users/Notifications.jsx


import { Background_Particles } from "../../Components/__Admin_Login.jsx";
import {useEffect, useState} from "react";
import { NotificationHeader, NotificationList } from '../../Components/__Notifications.jsx'
import { NotificationsController } from '../../controller/users/notifications.controller.js'
import {useGlobal} from "../../GlobalContext.jsx";

export default function Notifications() {

    const { user_uid } = useGlobal()

    const [notifications, setNotifications] = useState([
        {
            title: "Hackathon Approved 🎉",
            message:
                "Your coding event ‘Hackathon 2025’ was approved successfully! You can now start inviting participants and setting up your challenge environment.",
            type: "success",
            isRead: false,
            timestamp: new Date(),
        },
        {
            title: "Submission Reminder ⏰",
            message:
                "Only 3 hours left to submit your final project! Make sure to double-check your code and test cases before submission.",
            type: "warning",
            isRead: false,
            timestamp: new Date(),
        },
        {
            title: "New Message 💬",
            message:
                "You received a new message from Admin. Please check your inbox for important details regarding your recent submission.",
            type: "info",
            isRead: true,
            timestamp: new Date(),
        },
        {
            title: "Event Rejected ❌",
            message:
                "Your event ‘CodeQuest 2025’ was rejected due to missing event description and judging criteria. Please update and resubmit.",
            type: "error",
            isRead: false,
            timestamp: new Date(),
        },
    ]);

    const handleClick = (index) => {
        const clickedNotification = notifications[index];
        console.log(clickedNotification.message);

        // Optionally mark it as read
        setNotifications((prev) =>
            prev.map((n, i) => (i === index ? { ...n, isRead: true } : n))
        );
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "Event Approved":
                return "from-green-400/60 to-green-800/10";
            case "warning":
                return "from-yellow-400/60 to-yellow-800/10";
            case "Event Rejected":
                return "from-red-400/60 to-red-800/10";
            case "Question Rejected":
                return "from-red-400/60 to-red-800/10";
            default:
                return "from-blue-400/60 to-blue-800/10";
        }
    };

    const controller = new NotificationsController({setNotifications: setNotifications});

    /**
     * delete Notification
     * @param id of the Notification
     */
    const handleDeleteNotification = (id) => {
        // You can do anything here
        console.log(id);
    };


    // Fetch all Notification from the database
    useEffect(() => {
        controller._get_notifications({userID: user_uid}).then(() => {})
    }, [])


    // mark all notification as read
    useEffect(() => {
        controller._mark_as_read({id: user_uid}).then(() => {})

    }, []);



    return (
        <div className="w-screen h-screen relative overflow-hidden text-white">
            {/* Background */}
            <Background_Particles />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center pt-10 px-4 md:px-8 overflow-y-auto">

                {/* 🌟 Beautiful Header */}
                <NotificationHeader headingText='Notification Center' />

                {/* Notification List */}
                <NotificationList
                    notifications={notifications}
                    handleClick={handleClick}
                    getTypeColor={getTypeColor}
                    onDelete={handleDeleteNotification}
                />


            </div>
        </div>
    );
}


















{/* Notification Grid */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
//     <AnimatePresence>
//         {notifications.map((notif, index) => (
//             <motion.div
//                 key={index}
//                 layout
//                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.3 }}
//                 onClick={() => handleNotificationClick(index)}
//                 className={`cursor-pointer relative p-[1px] rounded-2xl bg-gradient-to-br ${getTypeGlow(
//                     notif.type
//                 )} hover:scale-[1.02] transition-transform duration-300`}
//             >
//                 <div
//                     className={`h-full w-full rounded-2xl bg-black/70 backdrop-blur-md border border-white/10
//                     p-5 flex flex-col justify-between hover:border-white/30 transition-all duration-300`}
//                 >
//                     {/* Title + Timestamp */}
//                     <div>
//                         <h2 className="text-lg md:text-xl font-semibold mb-2">
//                             {notif.title}
//                         </h2>
//                         <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3">
//                             {notif.message}
//                         </p>
//                     </div>
//
//                     {/* Footer */}
//                     <div className="flex justify-between items-center mt-2 text-xs md:text-sm text-gray-400">
//                         <span>{notif.timestamp.toLocaleTimeString()}</span>
//                         <span
//                             className={`px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
//                                 notif.isRead
//                                     ? "bg-white/10 text-gray-300"
//                                     : "bg-blue-500/30 text-blue-200"
//                             }`}
//                         >
//                       {notif.isRead ? "Read" : "New"}
//                     </span>
//                     </div>
//                 </div>
//             </motion.div>
//         ))}
//     </AnimatePresence>
// </div>
