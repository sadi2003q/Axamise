/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

// Components
import Profile_Background from "../../Components/__Profile.jsx";
import {
    ContentTimeline,
    ExpandableList,
    EventCard,
    Event_Showing_Description,
    HeroSection,
    HeroContentSection,
    HeaderSection,
    QuestionSection,
    PageTimeline,
    sampleItems,
    Button_visitEvent,
    Button_MoreEvent,
    Button_MoreQuestions
} from "../../Components/__Feed.jsx";
import FlowingMenu from '../../Components/Custom/FlowingMenu.jsx';
import { Background_Particles } from "../../Components/__Admin_Login.jsx";
import { Heading } from "../../Components/__Event_Question.jsx";

// Controllers
import { FeedController } from "../../controller/users/feed.controller.js";

// Models & Utilities
import { Events_Model } from "../../models/Event_Model.js";
import { Feed_Header, DIFFICULTY } from "../../Utilities.ts";
import {useGlobal} from "../../GlobalContext.jsx";

// ----------------------
// Demo Events (Mock Data)
// ----------------------
export const demoEvents = [
    {
        ...Events_Model,
        title: "Team Meeting",
        description: "Monthly team sync-up to discuss project progress and blockers.",
        date: "2025-09-20",
        startTime: "10:00 AM",
        hours: 1,
        minutes: 30,
        createdBy: "Adnan",
        createdBy_uid: "123",
    },
    {
        ...Events_Model,
        title: "Code Review",
        description: "Review new feature PRs and provide feedback to the dev team.",
        date: "2025-09-21",
        startTime: "2:00 PM",
        hours: 2,
        minutes: 0,
        createdBy: "Adnan",
        createdBy_uid: "123",
    },
    {
        ...Events_Model,
        title: "Client Call",
        description: "Discuss project requirements and milestones with the client.",
        date: "2025-09-22",
        startTime: "11:00 AM",
        hours: 1,
        minutes: 0,
        createdBy: "Adnan",
        createdBy_uid: "123",
    },
    {
        ...Events_Model,
        title: "Design Workshop",
        description: "Workshop with UX/UI team to finalize the app design.",
        date: "2025-09-23",
        startTime: "3:00 PM",
        hours: 2,
        minutes: 0,
        createdBy: "Adnan",
        createdBy_uid: "123",
    },
    {
        ...Events_Model,
        title: "Sprint Planning",
        description: "Plan tasks for the upcoming sprint with the development team.",
        date: "2025-09-24",
        startTime: "9:30 AM",
        hours: 1,
        minutes: 30,
        createdBy: "Adnan",
        createdBy_uid: "123",
    }
];

// ----------------------
// Feed Component
// ----------------------
export default function Feed() {
    const navigate = useNavigate();
    const { user_uid } = useGlobal();

    // ----------------------
    // State Variables
    // ----------------------
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [randomEvent, setRandomEvent] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState([]);

    const [easyQuestionCount, setEasyQuestionCount] = useState(0);
    const [mediumQuestionCount, setMediumQuestionCount] = useState(0);
    const [hardQuestionCount, setHardQuestionCount] = useState(0);

    const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0);
    const [solvedQuestionCount, setSolvedQuestionCount] = useState(0);

    const [questionCount_Category, setQuestionCount_Category] = useState({});

    // ----------------------
    // TreeView Structure
    // ----------------------
    const MUI_X_PRODUCTS = [
        {
            id: 'Question Category',
            label: 'Question Category',
            children: Object.entries(questionCount_Category).map(([category, count]) => ({
                id: category,
                label: `${category} : ${count}`,
            })),
        },
        {
            id: 'Questions Difficulty',
            label: 'Questions',
            children: [
                { id: 'easy', label: `Easy  -- ${easyQuestionCount}` },
                { id: 'medium', label: `Medium -- ${mediumQuestionCount}` },
                { id: 'hard', label: `Hard -- ${hardQuestionCount}` },
            ],
        },
        {
            id: 'totalNumberOfQuestions',
            label: 'Total Number of Questions',
            children: [
                { id: 'TotalNumber', label: `count: ${totalNumberOfQuestions}` },
            ],
        },
        {
            id: 'solvedQuestionCount',
            label: 'Solved Questions',
            children: [
                { id: 'solvedNumber', label: `count : ${solvedQuestionCount}` },
            ],
        },
    ];

    // ----------------------
    // Controller Setup
    // ----------------------
    const controller = new FeedController(
        setRandomEvent,
        setRandomQuestion,
        navigate,
        setEasyQuestionCount,
        setMediumQuestionCount,
        setHardQuestionCount,
        setSolvedQuestionCount,
        setTotalNumberOfQuestions,
        setQuestionCount_Category
    );

    // ----------------------
    // Fetch Data on Mount
    // ----------------------
    useEffect(() => {
        // Fetch Events and Questions
        controller.fetchEventHandler();
        controller.fetchQuestionHandler();

        // Fetch Question Counts by Difficulty
        controller.fetchQuestionCount_byDifficulty({ difficulty: DIFFICULTY.easy });
        controller.fetchQuestionCount_byDifficulty({ difficulty: DIFFICULTY.medium });
        controller.fetchQuestionCount_byDifficulty({ difficulty: DIFFICULTY.hard });

        // Fetch Total & Solved Questions
        controller.fetchTotalNumberOfQuestions();
        controller.fetchSolvedQuestions_count({ id: user_uid });

        // Fetch Question Counts by Category
        controller.fetchQuestionCount_byCategory();
    }, []);

    // ----------------------
    // JSX Rendering
    // ----------------------
    return (
        <div className="w-screen h-screen">
            {/* Background Animation */}
            <Background_Particles />

            {/* ---------------- Hero Section ---------------- */}
            <HeroSection>
                <HeroContentSection>
                    <HeaderSection Title={Feed_Header} />
                </HeroContentSection>

                <PageTimeline>
                    <ContentTimeline items={['item1', 'item2', 'item3', 'item4']} />
                </PageTimeline>
            </HeroSection>

            {/* ---------------- Questions Section ---------------- */}
            <Heading
                title="All Coding Challenges"
                subtitle="Explore and Tackle Our Curated Collection of World-Class Coding Questions"
            />

            <QuestionSection>
                {/* Question List */}
                <div className="w-[55vw] h-[80vh] m-2.5 overflow-auto">
                    <ExpandableList items={randomQuestion} />

                    <div className="w-full flex justify-center items-center mt-4">
                        <Button_MoreQuestions handleClick={controller.handleNavigation_MoreQuestion} />
                    </div>
                </div>

                {/* Question Stats TreeView */}
                <div className="w-[25vw] h-[80vh] rounded-2xl m-2.5 overflow-auto">
                    <RichTreeView items={MUI_X_PRODUCTS} />
                </div>
            </QuestionSection>

            {/* ---------------- Event Section ---------------- */}
            <Heading
                title="Event Listings"
                subtitle="Filter and Find Top-Tier Events to Source Elite Global Talent"
            />

            <div className="w-screen h-screen flex items-center justify-center overflow-auto">
                {/* Event Menu */}
                <div className="w-[35vw] h-[86vh] overflow-auto mx-2">
                    <FlowingMenu
                        items={demoEvents.map(e => ({ text: e.title, link: '#' }))}
                        onItemClick={(title) => {
                            const event = demoEvents.find(e => e.title === title);
                            setSelectedEvent(event);
                        }}
                    />
                </div>

                {/* Event Details Panel */}
                <div className="w-[45vw] h-[86vh] overflow-auto mx-2 bg-gray-800 flex flex-col items-center justify-start text-white p-4">
                    {selectedEvent ? (
                        <>
                            <Event_Showing_Description event={selectedEvent} />

                            <div className="w-full flex justify-center items-center bg-gray-800 py-4 gap-2">
                                <Button_visitEvent
                                    handleClick={() => controller.handleNavigation_EventEnter(selectedEvent)}
                                />
                                <Button_MoreEvent handleClick={controller.handleNavigation_MoreEvent} />
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400 text-xl mt-20">Select an event from the menu</p>
                    )}
                </div>
            </div>
        </div>
    );
}
