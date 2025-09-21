/* eslint-disable react-refresh/only-export-components */


import { GetCommonProps } from "../Components/__Common.jsx";

// React Component
import { useState } from "react";

// Material Library and Icons
import {
    TextField,
    Stack,
    Box,
    IconButton,
    Drawer,
    Divider,
    MenuItem,
    Slider,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";


//  MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";







export const Question_style = {
    question_description:
        // Full width on mobile, half width on desktop
        // Increased min-h for bigger text area
        "m-2 w-full h-[96vh] md:w-[50vw] min-h-[500px] md:h-[86vh] flex flex-col gap-6 p-6",

    question_spects:
        // Full width + centered on mobile, fixed width on desktop
        "m-2 w-full md:w-[35vw] md:h-[86vh] rounded-4xl bg-white/5 border-2 border-amber-200/5 shadow-[0_0_30px_rgba(255,165,0,0.3)] backdrop-blur-md flex flex-col items-center justify-around gap-8 p-6 self-center",

    Outer_Container:
        // Allow page scroll
        "relative w-full min-h-screen flex items-center justify-center gap-6 p-4 overflow-y-auto",

    Inner_container:
        // Column on mobile, row on desktop
        "relative z-10 flex flex-col md:flex-row items-start md:items-stretch justify-center gap-6 w-full max-w-[1200px]",

    description:
        // Bigger height for text input area
        "peer w-full h-[300px] text-[0.8rem] md:h-full text-white text-2xl bg-transparent resize-none p-3 outline-none overflow-auto rounded",

    Description_label:
        "absolute left-3 text-gray-400 text-2xl transition-all duration-200 peer-empty:top-3 peer-empty:text-2xl peer-empty:text-gray-400 peer-focus:-top-8 peer-focus:text-lg peer-focus:text-cyan-500 -top-4 text-lg text-cyan-500",

    description_container:
        "relative w-full h-[80vh] mt-8 font-mono",

    slider:
        "block mb-2 text-white font-mono",
};



// Event Description
export const Question_Description = ({ children }) => {
    return (
        <div className={Question_style.question_description}>
            {children}
        </div>
    );
};


// Event Scheduling
export const Question_Specification = ({ children }) => {
    return (
        <div className={Question_style.question_spects}>
            {children}
        </div>
    );
};


// Input Field
export const InputField = ({
    label = "Not Found",
    name = "Not Found",
    value = "Not Found",
    handleChange = (() => console.log("Not declared")),
    font_size = "2rem",
}) => {
    return (
        <TextField
            {...GetCommonProps("gray", "white", "cyan", { font_size })}
            label={label}
            name={name}
            value={value}
            onChange={handleChange}
            fullWidth
            required
        />
    );
};






// -------------------- Reusable Components -------------------- //

export const DescriptionField = ({
    id = "description",
    name = "description",
    value = "",
    handleChange = (() => console.log("Not defined")),
    label = "Description",
    placeholder = " ",
}) => {
    return (
        <div className={Question_style.description_container}>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className={Question_style.description}
            />
            <label htmlFor={id} className={Question_style.Description_label}>
                {label}
            </label>
        </div>
    );
};






export const Mark_Slider = ({
    value = -1,
    handleChange = (() => console.log("Not defined")),
    maxNumber = 200,
    step = 1,
    color = "cyan",
    bgColor = "gray",
}) => {
    return (
        <>
            <label className={Question_style.slider}>Mark (0 - 200)</label>
            <Slider
                value={value}
                onChange={handleChange}
                max={maxNumber}
                step={step}
                sx={{
                    width: "100%",
                    color: color,
                    "& .MuiSlider-thumb": { color: color },
                    "& .MuiSlider-rail": { backgroundColor: bgColor },
                }}
            />
            <span className="text-white font-mono">{value}</span>
        </>
    );
};



// eslint-disable-next-line no-unused-vars
export const FinalButton = ({ passQuestion, handleChange }) => {
    return (
        <div className="flex justify-end w-full h-10 mt-4 items-center">
            
                <SpeedDial
                    ariaLabel="Form actions"
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    direction="left"
                >
                    <SpeedDialAction icon={<SendIcon />} tooltipTitle="Publish" onClick={handleChange} />
                    <SpeedDialAction icon={<AddShoppingCartIcon />} tooltipTitle="More" onClick={handleChange} />
                </SpeedDial>
            
        </div>
    );
};





export const Drower_Open_Button = ({ handleClick, IconColor = "white" }) => {
    return (
        <IconButton onClick={handleClick} sx={{ color: IconColor }}>
            <AlignHorizontalLeftOutlinedIcon fontSize="medium" />
        </IconButton>
    );
};





export const Select_Difficulty = ({ label = "Difficulty", name = "difficulty", value, onChange }) => {
    return (
        <TextField
            {...GetCommonProps("gray", "white", "cyan", "1.5rem")}
            select
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        >
            {/* <MenuItem value="">Select Difficulty</MenuItem> */}
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
        </TextField>
    );
};



export const Drawer_Input = ({
    drawerOpen,
    onClose = () => { },
    anchor = "bottom",
    heading = "All Events",
    item = [],
    iconColor = "cyan",
    onItemClick = () => { },
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    // 🔎 Filter items based on search query
    const filteredItems = item.filter(
        (event) =>
            event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.startTime?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Drawer
            anchor={anchor}
            open={drawerOpen}
            onClose={onClose}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 400,
                    backgroundColor: "rgba(0,0,0,0.85)",
                    color: "white",
                    padding: 3,
                    height: '100vh'
                },
            }}
        >
            {/* Close Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={onClose} sx={{ color: "white" }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Divider sx={{ my: 2, borderColor: "white" }} />

            {/* Heading */}
            <Typography variant="h6" gutterBottom>
                {heading}
            </Typography>

            {/* 🔎 Search Bar */}
            <TextField
                fullWidth
                placeholder="Search events..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                    mb: 2,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: iconColor },
                        "&.Mui-focused fieldset": { borderColor: iconColor },
                    },
                }}
                InputProps={{
                    style: { color: "white" },
                }}
            />

            {/* Event List */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    height: "60vh", // 🔒 Fix drawer height
                }}
            >
                <List>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((event, index) => (
                            <ListItem
                                key={event.id || index}
                                onClick={() => onItemClick(event)}
                                button
                            >
                                <ListItemIcon>
                                    <ArrowCircleRightOutlinedIcon sx={{ color: iconColor }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={event.title}
                                    secondary={`${event.date} | ${event.startTime} (${event.hours}h ${event.minutes}m)`}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ color: "gray", textAlign: "center", mt: 2 }}>
                            No matching events found
                        </Typography>
                    )}
                </List>
            </Box>
        </Drawer>
    );
};