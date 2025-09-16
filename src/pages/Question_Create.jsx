// React Component
import { useContext, useEffect, useState } from "react";

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

import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";

// Components and UIs
import { GetCommonProps } from "../Components/__Common.jsx";
import Profile_Background from "../Components/__Profile";
import {
    Question_style,
    Question_Description,
    Question_Specification,
} from "../Components/__Question_Create.jsx";

// View Models
import { _Fetch_specific_question, _Update_specific_Question, _Upload_question, isFormValid } from "../ViewModel/Question_Create_Viewmodel.js";
import { GetAllEvents } from "../ViewModel/Event_Show_ViewModel.js";

// Model
import { Question_Model } from "../models/Question_Model.js";

// Global Context
import { IdContext } from "../IdContext.jsx";

import { useLocation } from "react-router-dom";





// -------------------- Reusable Components -------------------- //

const InputField = ({
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

const DescriptionField = ({
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

const Mark_Slider = ({
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

const FinalButton = ({ passQuestion, handleChange }) => {
    return (
        <div className="flex justify-end w-full h-10 mt-4 items-center">
            {isFormValid(passQuestion) && (
                <SpeedDial
                    ariaLabel="Form actions"
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    direction="left"
                >
                    <SpeedDialAction icon={<SendIcon />} tooltipTitle="Publish" onClick={handleChange} />
                    <SpeedDialAction icon={<AddShoppingCartIcon />} tooltipTitle="More" onClick={handleChange} />
                </SpeedDial>
            )}
        </div>
    );
};

const Drower_Open_Button = ({ handleClick, IconColor = "white" }) => {
    return (
        <IconButton onClick={handleClick} sx={{ color: IconColor }}>
            <AlignHorizontalLeftOutlinedIcon fontSize="medium" />
        </IconButton>
    );
};

const Select_Difficulty = ({ label = "Difficulty", name = "difficulty", value, onChange }) => {
    return (
        <TextField
            {...GetCommonProps("gray", "white", "cyan", "1.5rem")}
            select
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        >
            <MenuItem value="">Select Difficulty</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
        </TextField>
    );
};



const Drawer_Input = ({
    drawerOpen,
    onClose = () => { },
    anchor = "bottom",
    heading = "All Events",
    item = [],
    iconColor = "cyan",
    onItemClick = (item) => { },
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
// -------------------- Main Component -------------------- //

export default function Event_Create() {

    const location = useLocation()
    const { itemID, questionID } = location.state || {};
    // const { questionID } = location.state || {}

    const [selectedUID, setSelectedUID] = useState(itemID);


    const { id, currentName } = useContext(IdContext);

    const [question, setQuestion] = useState({
        ...Question_Model,
        title: "Demo",
        description: "Demo",
        mark: 100,
        difficulty: "",
        type: "Medium",
        result: "",
        event_uid: "sdfjh",
        createdBy: currentName,
        createdBy_uid: id,
    });

    const [event, setEvent] = useState([])


    const [drawerOpen, setDrawerOpen] = useState(false);



    // -------------------- Handlers -------------------- //

    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleMarkChange = (event, newValue) => {
        setQuestion({ ...question, mark: newValue });
    };

    const handleClick = async () => {
        const result = questionID ? await _Update_specific_Question(questionID, question) : await _Upload_question(question, selectedUID)
        if (result.success) {
            if(questionID) console.log('Update Success')
            else console.log('upload success')
        } else {
            console.log('Upload Failed')
        }
    };

    // const SetEvent = (text) => {
    //     setQuestion({ ...question, event_uid: text });
    //     setDrawerOpen(false);
    // };


    useEffect(() => {


        const fetchQuestion = async () => {

            const result = await _Fetch_specific_question(questionID);
            if(result.success) {
                // console.log(result.data)
                setQuestion(result.data)
                setSelectedUID(result.data.event_uid)
                console.log(`Data has been set in the`)
            } else {
                console.log(`Error : ${result.error}`)
            }
        }

        const fetchEvents = async () => {
            const result = await GetAllEvents(id);
            if (result.success) {
                setEvent(result.data)
            } else {
                console.log(`Error : ${result.error}`)
            }
        };

        fetchEvents();
        if(questionID) fetchQuestion();
    }, []);



    // -------------------- Render -------------------- //

    return (
        <div className={Question_style.Outer_Container}>
            <Profile_Background />

            {/* Main Content */}
            <div className={Question_style.Inner_container}>
                <Question_Description>
                    {/* Title */}
                    <InputField label="Title" name="title" value={question.title} handleChange={handleChange} />

                    {/* Description */}
                    <DescriptionField
                        id="description"
                        name="description"
                        value={question.description}
                        handleChange={handleChange}
                        label="Description"
                    />
                </Question_Description>

                <Question_Specification>
                    <Stack spacing={6} className="w-full">
                        {/* Type */}
                        <InputField label="Type" name="type" value={question.type} handleChange={handleChange} />

                        {/* Difficulty */}
                        <Select_Difficulty value={question.difficulty} onChange={handleChange} />

                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "1rem" }}>
                            <InputField
                                label="Event"
                                name="event_title"
                                value={selectedUID ? event.find((e) => e.id === selectedUID)?.title || "" : ""}
                                handleChange={() => { }} // no manual typing
                                font_size="1rem"
                            />
                            <Drower_Open_Button handleClick={() => setDrawerOpen(true)} />
                        </div>

                        {/* Slider and Final Button */}
                        <Box>
                            <Mark_Slider value={question.mark} handleChange={handleMarkChange} />
                            <FinalButton passQuestion={question} handleChange={handleClick} />
                        </Box>

                    </Stack>
                </Question_Specification>
            </div>

            {/* Drawer */}
            <Drawer_Input
                drawerOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                item={event}   // ✅ pass event array from API
                iconColor="cyan"
                onItemClick={(item) => {
                    console.log("Clicked item:", item);
                    setQuestion({ ...question, event_uid: item.id }); // ✅ store event.id
                    // Keep UID separately
                    setSelectedUID(item.id);
                    setDrawerOpen(false);
                }}
            />
        </div>
    );
}
