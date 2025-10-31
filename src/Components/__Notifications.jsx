// path : src/Components/__Notifications.jsx


import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const NotificationHeader = ({headingText = 'Notification Center'}) => {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-10 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                    {headingText}
                </h1>
                <div className="mt-3 h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"></div>
                <p className="mt-4 text-gray-300 text-sm md:text-base opacity-80">
                    Stay updated with the latest alerts, events, and messages.
                </p>
            </motion.div>
        </div>
    );
}


export const NotificationList = ({ notifications, handleClick, getTypeColor }) => {
    return (
        <AnimatePresence>
            {(notifications && notifications.length > 0) ? (
                notifications.map((notif, index) => (
                    <motion.div
                        key={notif.id || index}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => handleClick(index)}
                        className={`relative cursor-pointer group rounded-xl p-[1px] bg-gradient-to-r ${getTypeColor(
                            notif.type
                        )} w-full max-w-3xl mx-auto`}
                    >
                        <div
                            className={`rounded-xl bg-black/80 backdrop-blur-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-white/10 hover:border-white/25 transition-all duration-300 ${
                                notif.isRead ? "opacity-70" : "opacity-100"
                            }`}
                            style={{ minHeight: "80px" }}
                        >
                            <div className="flex-1">
                                <h2 className="text-base md:text-lg font-semibold leading-tight">
                                    {notif.title}
                                </h2>
                                <p
                                    className="text-sm md:text-base text-gray-300 opacity-90 mt-1 leading-relaxed break-words"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {notif.message}
                                </p>
                            </div>

                            <div className="flex flex-col md:items-end gap-1 shrink-0 text-xs text-gray-400 mt-1 md:mt-0">
                            <span>
                                {notif.timestamp
                                    ? new Date(notif.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    : "—"}
                            </span>

                                <span
                                    className={`px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                                        notif.isRead
                                            ? "bg-white/10 text-gray-300"
                                            : "bg-blue-500/30 text-blue-200"
                                    }`}
                                >
                                {notif.isRead ? "Read" : "New"}
                            </span>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="text-gray-400 text-center mt-8">No notifications found</div>
            )}
        </AnimatePresence>
    );

};