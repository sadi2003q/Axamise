/* eslint-disable no-unused-vars */
import { FaCalendarAlt, FaClock, FaHourglassHalf, FaUser, FaInfoCircle } from "react-icons/fa";
import { Edit_Delete_Button } from "../Components/__Question_List.jsx";

export const Event_Showing_Description = ({
    event,
    handleEditButton = (() => { console.log('Handle Edit Button') }),
    handleDeleteButton = (() => { console.log('Handle Delete Button') }),
    handleViewButton = (() => { console.log('Handle View Button') }),
    handleNotifyButton = (() => { console.log('Handle Notify Button') }),
    handleDirectApprove = (() => { console.log('Handle Direct Approve Button') }),



    require_Edit_Button = false,
    require_Delete_Button = false,
    require_Solve_Button = false,
    require_Revert_Back_Button = false,
    require_direct_approve_Button = false,
}) => {
    return (
        <div className="flex flex-col justify-start w-full h-full p-2 space-y-4 font-mono bg-transparent text-white rounded-lg shadow-lg">

            {/* Title */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                    <FaInfoCircle className="text-blue-400" />
                    <span>{event.title}</span>
                </div>
                {/* Horizontal line */}
                <div className="w-full border-b border-white"></div>
            </div>

            {/* Description */}
            <div className="flex items-start space-x-2">
                <div className="flex flex-col space-y-2 font-mono">
                    <p>{event.description}</p>
                </div>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-green-400" />
                <span>Date: {event.date}</span>
            </div>

            {/* Start Time */}
            <div className="flex items-center space-x-2">
                <FaClock className="text-yellow-400" />
                <span>Start Time: {event.startTime}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center space-x-2">
                <FaHourglassHalf className="text-red-400" />
                <span>
                    Duration: {event.hours || 0}h {event.minutes || 0}m
                </span>
            </div>

            {/* Created By */}
            <div className="flex items-center space-x-2 pb-[20px]">
                <FaUser className="text-pink-400" />
                <span>{event.createdBy}</span>
            </div>

            {/* <Edit_Delete_Button
                handleEdit={() => handleEditButton(event.id)}
                handleDelete={() => handleDeleteButton(event.id)}
                handleSolve={() => handleViewButton(event.id)}
                handleRevertBack={() => handleNotifyButton()}
            /> */}

            <Edit_Delete_Button
                handleEdit={() => handleEditButton(event.id)}
                handleDelete={() => handleDeleteButton(event.id)}
                handleSolve={() => handleViewButton(event.id)}
                handleRevertBack={() => handleNotifyButton()}
                handleDirectApprove={() => handleDirectApprove()}





                require_Edit_Button={require_Edit_Button}
                require_Delete_Button={require_Delete_Button}
                require_Solve_Button={require_Solve_Button}
                require_Revert_Back_Button={require_Revert_Back_Button} // <- this is needed
                require_direct_approve_Button={require_direct_approve_Button}
            />

        </div>
    );
};
