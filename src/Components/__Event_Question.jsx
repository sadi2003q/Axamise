// Components/EventQuestions/QuestionForm.jsx
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { CommonProps } from "./__Common.jsx";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const Heading = ({ title, subtitle }) => (
    <div className="w-full py-10 px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            {title}
        </h2>
        {subtitle && (
            <p className="text-gray-400 text-lg md:text-xl font-light">
                {subtitle}
            </p>
        )}
        <div className="mt-4 mx-auto w-24 h-[3px] bg-indigo-500 rounded-full"></div>
    </div>
);



export const QuestionForm = ({ question, index, handleChange, handleDelete }) => {
    return (
        <div
            className="relative w-86vw h-auto py-3 my-3 flex flex-col gap-6 p-6 bg-black/20 border-b border-gray-700 pb-[20px] rounded-xl"
        >
            {/* 🔴 Delete Button (Top Right Corner) */}


            {/* Heading */}
            <div className={"w-full flex justify-between items-center"}>
                <h3 className="text-2xl font-bold text-indigo-400 mb-4 border-l-4 border-indigo-500 pl-3 tracking-wide">
                    Question {index + 1}
                </h3>

                <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(index)}
                    sx={{
                        color: "red",
                        "&:hover": {
                            color: "red",
                            bgcolor: "rgba(255, 0, 0, 0.1)",
                        },
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>


            {/* Form Inputs */}
            <TextField
                {...CommonProps}
                label="Question Title"
                name="title"
                value={question.title}
                onChange={(e) => handleChange(index, e)}
                required
            />

            <TextField
                {...CommonProps}
                label="Description"
                name="description"
                multiline
                rows={5}
                value={question.description}
                onChange={(e) => handleChange(index, e)}
            />

            <div className="flex flex-wrap gap-6 mt-6">
                <TextField
                    {...CommonProps}
                    label="Type"
                    name="type"
                    value={question.type}
                    onChange={(e) => handleChange(index, e)}
                    className="flex-1 min-w-[200px]"
                />

                <TextField
                    {...CommonProps}
                    label="Point"
                    name="point"
                    type="number"
                    value={question.point}
                    onChange={(e) => handleChange(index, e)}
                    className="flex-1 min-w-[150px]"
                />

                <TextField
                    {...CommonProps}
                    select
                    label="Difficulty"
                    name="difficulty"
                    value={question.difficulty}
                    onChange={(e) => handleChange(index, e)}
                    className="flex-1 min-w-[200px]"
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
            </div>
        </div>
    );
};

export const AddQuestionButton = ({
      handleAddQuestion = () =>  console.log('Button is working')
}) => {
    return(
        <div className="w-full h-auto flex justify-end pl-10">
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddQuestion}
                sx={{
                    bgcolor: "#6366f1",
                    color: "white",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2.5,
                    py: 1,
                    boxShadow: 2,
                    "&:hover": {
                        bgcolor: "#4338ca",
                        boxShadow: 3,
                    },
                    transition: "0.25s ease",
                }}
            >
                Add Question
            </Button>
        </div>
    );
}



export const ConfirmButton = ({
    handleConfirm = () =>  console.log('Button is working')
 }) => {
    return (
        <div className="w-full h-auto flex justify-center items-center my-auto py-3">
            <Button
                variant="contained"
                color="success"
                onClick={handleConfirm}
                size="large"
                sx={{
                    width: "300px",
                    textTransform: "none",
                    borderRadius: "12px",
                    paddingY: 1.4,
                    fontSize: "1rem",
                    fontWeight: 600,
                    backgroundColor: "#4CAF50",
                    "&:hover": {
                        backgroundColor: "#43A047",
                    },
                }}
            >
                Confirm
            </Button>
        </div>
    );
}


