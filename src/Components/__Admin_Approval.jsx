

import TextField from "@mui/material/TextField";
import { GetCommonProps2 } from '../Components/__Common.jsx';
import MenuItem from "@mui/material/MenuItem";

// MUI Components
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import {Heading} from "./__Event_Question.jsx";


// Editor
import Editor from "@monaco-editor/react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import VerifiedIcon from "@mui/icons-material/Verified";
import DashboardIcon from "@mui/icons-material/Dashboard";


export const ApprovalPanel = ({
    functionName,
    setFunctionName,
    returnType,
    setReturnType,
    status,
    setStatus,
    functionCode,
    setFunctionCode,
    editorRef,
    handleApprove,
    questionID,
    onClose, // function to handle close button
}) => {
    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-center flex-1">Approval Panel</h3>
                {onClose && (
                    <IconButton size="small" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </div>

            {/* Function Name */}
            <TextField
                {...GetCommonProps2({
                    borderColor: "gray",
                    hoverColor: "lightgray",
                    textColor: "white",
                })}
                label="Function Name"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                fullWidth
            />

            {/* Return Type */}
            <TextField
                {...GetCommonProps2({
                    borderColor: "gray",
                    hoverColor: "lightgray",
                    textColor: "white",
                })}
                label="Return Type"
                value={returnType}
                onChange={(e) => setReturnType(e.target.value)}
                placeholder="e.g. int, string"
                fullWidth
            />

            {/* Status */}
            <TextField
                select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                {...GetCommonProps2({ borderColor: "gray", textColor: "white" })}
                fullWidth
            >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>

            {/* Monaco Editor */}
            <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold">Function Preview (Editable)</h4>
                <div className="h-60 border rounded overflow-hidden">
                    <Editor
                        height="100%"
                        defaultLanguage="cpp"
                        value={functionCode}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                        onMount={(editor) => {
                            if (editorRef) editorRef.current = editor;
                        }}
                        onChange={(value) => setFunctionCode(value)}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        py: 1.5,
                    }}
                    onClick={() => handleApprove(questionID)}
                >
                    Approve Question
                </Button>
            </div>
        </div>
    );
}


export const AdminPageHeader = ({ questionMakerName, setDrawerOpen }) => {
    return (
        <div className="p-4 flex justify-between">
            <h2 className="text-xl font-bold">Requested by {questionMakerName}</h2>
            <IconButton color='primary' onClick={() => setDrawerOpen(true)}>
                <MenuOpenOutlinedIcon />
            </IconButton>
        </div>
    );
}


export const ObservationField = ({
                                     title,
                                     setTitle,
                                     reason,
                                     setReason,
                                     onReject,
                                     onApprove = () => console.log("Approved"),
                                     onClose,

                                     // UI Config Defaults
                                     backgroundColor = "rgba(255, 0, 0, 0.2)",
                                     buttonColor = "error",
                                     buttonText = "Confirm Rejection",
                                     HeadingText = "Rejection Panel",
                                     inputLabelText = "Reason for Rejection",

                                     // Code Editor Mode
                                     directApproval = false,
                                     editorRef,
                                     setFunctionCode,
                                 }) => {
    return (
        <div className="p-4 flex flex-col justify-between h-full">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 my-2">
                <h3 className="text-lg font-bold text-center flex-1">{HeadingText}</h3>
                {onClose && (
                    <IconButton size="small" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {directApproval ? (
                    <div
                        className="flex-1 rounded-lg p-3"
                        style={{
                            backgroundColor: "rgba(30, 30, 30, 0.8)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(6px)",
                        }}
                    >
                        <Editor
                            height="100%"
                            defaultLanguage="cpp"
                            defaultValue={"// Write down the code here\n\n"}
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 12 }, // Monaco’s built-in padding
                            }}
                            onMount={(editor) => editorRef && (editorRef.current = editor)}
                            onChange={(value) => setFunctionCode && setFunctionCode(value)}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 mt-4 flex-1">


                        <TextField
                            {...GetCommonProps2({
                                borderColor: "gray",
                                hoverColor: "lightgray",
                                textColor: "white",
                            })}
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label={inputLabelText}
                            variant="outlined"
                            multiline
                            rows={10}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    style: { color: "rgba(255, 255, 255, 0.75)" },
                                },
                                input: {
                                    style: {
                                        color: "white",
                                        backgroundColor,
                                        backdropFilter: "blur(8px)",
                                        borderRadius: "8px",
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Button */}
            <Button
                variant="contained"
                color={buttonColor}
                onClick={directApproval ? onApprove : onReject}
                fullWidth
                sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    mt: 2,
                }}
            >
                {buttonText}
            </Button>
        </div>
    );
};


export const EventFetchingLoadingScreen = ({title = "Still Nothing Found...."}) => {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                {/* Loading Spinner */}
                <div
                    className="w-10 h-10 border-4 border-t-cyan-500 border-gray-300 rounded-full animate-spin"></div>

                {/* Text */}
                <h3 className="text-lg font-medium text-gray-700">
                    {title}
                </h3>
            </div>

        </>
    );
}



export const HeadingS = ({
                             title = "Admin Approval Panel",
                             subtitle = "Subtitle",
                             questionButton = () => {},
                             eventButton = () => {},
                             dashboardButton = () => {},
                         }) => {
    return (
        <div className="w-screen h-auto text-center">
            <Heading title={title} subtitle={subtitle} />

            <div className="w-full h-auto flex gap-6 justify-center">

                {/* Questions */}
                <div className="flex flex-col items-center">
                    <IconButton size="small" onClick={questionButton}>
                        <AddTaskIcon sx={{ color: "yellow" }} />
                    </IconButton>
                    <span className="text-xs text-yellow-300">Questions</span>
                </div>

                {/* Events */}
                <div className="flex flex-col items-center">
                    <IconButton size="small" onClick={eventButton}>
                        <VerifiedIcon sx={{ color: "yellow" }} />
                    </IconButton>
                    <span className="text-xs text-yellow-300">Events</span>
                </div>

                {/* Dashboard */}
                <div className="flex flex-col items-center">
                    <IconButton size="small" onClick={dashboardButton}>
                        <DashboardIcon sx={{ color: "yellow" }} />
                    </IconButton>
                    <span className="text-xs text-yellow-300">Dashboard</span>
                </div>

            </div>
        </div>
    );
};
