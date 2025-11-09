/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import Profile_Background from "../../Components/__Profile.jsx";
import {
    ContentTimeline,
    ExpandableList,
    EventCard,
    Event_Showing_Description,

} from "../../Components/__Feed.jsx";
import { Feed_Header } from "../../Utilities.ts";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import FlowingMenu from '../../Components/Custom/FlowingMenu.jsx'
import { Events_Model } from "../../models/Event_Model.js";
import {useEffect, useState} from "react";
import {Background_Particles} from "../../Components/__Admin_Login.jsx";
import {Heading} from "../../Components/__Event_Question.jsx";
import { HeroSection, HeroContentSection, HeaderSection, QuestionSection, PageTimeline, sampleItems } from '../../Components/__Feed.jsx'
import { FeedController } from "../../controller/users/feed.controller.js";
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Button_visitEvent, Button_MoreEvent, Button_MoreQuestions } from '../../Components/__Feed.jsx'
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../GlobalContext.jsx";
import {DIFFICULTY} from "../../Utilities.ts";




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



export default function Feed() {

    const navigate = useNavigate();
    const { user_uid } = useGlobal();
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch Random question from the database to show
    const [randomEvent, setRandomEvent] = useState([]);


    // Fetch Random Event on the Event Page to show
    const [randomQuestion, setRandomQuestion] = useState([]);

    // Question count
    const [easyQuestionCount, setEasyQuestionCount] = useState(0);
    const [mediumQuestionCount, setMediumQuestionCount] = useState(0);
    const [hardQuestionCount, setHardQuestionCount] = useState(0);

    const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0);
    const [solvedQuestionCount, setSolvedQuestionCount] = useState(0);

    const [questionCount_Category, setQuestionCount_Category] = useState({});



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
                {id: 'TotalNumber', label: `count: ${totalNumberOfQuestions}` },
            ]
        },

        {
            id: 'solvedQuestionCount',
            label: 'Solved Questions',
            children: [
                {id: 'solvedNumber', label: `count : ${solvedQuestionCount}` },
            ]
        },


    ];


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

    useEffect(() => {

        controller.fetchEventHandler().then(() => {})
        controller.fetchQuestionHandler().then(() => {})

        controller.fetchQuestionCount_byDifficulty({difficulty: DIFFICULTY.easy}).then(() => {})
        controller.fetchQuestionCount_byDifficulty({difficulty: DIFFICULTY.medium}).then(() => {})
        controller.fetchQuestionCount_byDifficulty({difficulty: DIFFICULTY.hard}).then(() => {})


        controller.fetchTotalNumberOfQuestions().then(() => {})
        controller.fetchSolvedQuestions_count({id: user_uid}).then(() => {})

        controller.fetchQuestionCount_byCategory().then(() => {})

    }, [])



    return (
        <div className={'w-screen h-screen'}>
            <Background_Particles />


            {/* Hero Section */}
            <HeroSection>

                <HeroContentSection>
                    <HeaderSection Title={Feed_Header} />
                </HeroContentSection>

                <PageTimeline>
                    <ContentTimeline items={['item1', 'item2', 'item3', 'item4']} />
                    
                </PageTimeline>

            </HeroSection>





            <Heading
                title="All Coding Challenges"
                subtitle="Explore and Tackle Our Curated Collection of World-Class Coding Questions"
            />


            {/* Questions */}
            <QuestionSection>

                
                <div className="w-[55vw] h-[80vh] m-2.5 overflow-auto">
                    <ExpandableList items={randomQuestion} />

                    <div className={'w-full flex justify-center items-center mt-4'}>
                        <Button_MoreQuestions handleClick={controller.handleNavigation_MoreQuestion}/>
                    </div>
                </div>

                <div className="w-[25vw] h-[80vh] rounded-2xl m-2.5 overflow-auto">
                    <RichTreeView
                        items={ MUI_X_PRODUCTS }
                    />
                </div>

            </QuestionSection>


            {/* <div className="w-screen h-[10vh] bh-white flex items-center justify-center"> */}

            {/* <div className=" w-[25vw] h-[80vh] rounded-2xl m-2.5 overflow-auto">

                    

                    

                </div> */}



            {/* <div className="w-[55vw] h-[80vh] m-2.5 overflow-auto">


                </div> */}

            {/* </div> */}



            <Heading
                title="Event Listings"
                subtitle="Filter and Find Top-Tier Events to Source Elite Global Talent"
            />


            {/* Event Showing Screen */}
            <div className="w-screen h-screen flex items-center justify-center overflow-auto">

                {/* Flowing Menu */}
                <div className="w-[35vw] h-[86vh] overflow-auto mx-2">
                    <FlowingMenu
                        items={demoEvents.map(e => ({ text: e.title, link: '#' }))}
                        onItemClick={(title) => {
                            const event = demoEvents.find(e => e.title === title);
                            setSelectedEvent(event);
                        }}
                    />
                </div>

                {/* Right Panel: Display selected event */}
                <div className="w-[45vw] h-[86vh] overflow-auto mx-2 bg-gray-800 flex flex-col items-center justify-start text-white p-4">
                    {selectedEvent ? (
                        <div className={'w-[100%]'}>

                            <Event_Showing_Description event={selectedEvent} />

                            <div className="w-full flex justify-center items-center bg-gray-800 py-4 gap-2">
                                {/*  This will */}
                                <Button_visitEvent

                                    handleClick={() =>
                                        controller.handleNavigation_EventEnter(selectedEvent)
                                    }
                                />

                                <Button_MoreEvent
                                    handleClick={controller.handleNavigation_MoreEvent}
                                />



                            </div>


                        </div>

                    ) : (
                        <p className="text-gray-400 text-xl mt-20">Select an event from the menu</p>
                    )}

                </div>

            </div>





        </div>
    );
}