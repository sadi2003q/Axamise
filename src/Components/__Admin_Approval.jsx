

import TextField from "@mui/material/TextField";
import { GetCommonProps2 } from '../Components/__Common.jsx';
import MenuItem from "@mui/material/MenuItem";

// MUI Components
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';


// Editor
import Editor from "@monaco-editor/react";


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
    onClose, // function to handle close button
    backgroundColor = "rgba(255, 0, 0, 0.2)", // default reddish glass
    buttonColor = "error", // default MUI color
    buttonText = "Confirm Rejection",
    HeadingText = "Rejection Panel",
    inputLabelText = "Reason for Rejection",
}) => {
    return (
        <div className="p-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-center flex-1">{HeadingText}</h3>
                {onClose && (
                    <IconButton size="small" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </div>

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
                {/* TextField for rejection reason */}
                <TextField
                    label={inputLabelText}
                    variant="outlined"
                    multiline
                    rows={15}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            style: {
                                color: "rgba(255, 255, 255, 0.75)",
                            }
                        },
                        input: {
                            style: {
                                color: "white",
                                backgroundColor: backgroundColor,
                                backdropFilter: "blur(8px)",
                                borderRadius: "8px",
                            },
                        },
                    }}
                />
            </div>

            {/* Full width button */}
            <Button
                variant="contained"
                color={buttonColor}
                onClick={onReject}
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




