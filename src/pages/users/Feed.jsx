/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import Profile_Background from "../../Components/__Profile.jsx";
import { ContentTimeline, ExpandableList, EventCard, Event_Showing_Description } from "../../Components/__Feed.jsx";
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
import { Button_AddEvent } from '../../Components/__Feed.jsx'
import { useNavigate } from "react-router-dom";




const MUI_X_PRODUCTS = [
    {
        id: 'grid',
        label: 'Data Grid',
        children: [
            { id: 'grid-community', label: '@mui/x-data-grid' },
            { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
            { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
        ],
    },
    {
        id: 'pickers',
        label: 'Date and Time Pickers',
        children: [
            { id: 'pickers-community', label: '@mui/x-date-pickers' },
            { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
        ],
    },
    {
        id: 'charts',
        label: 'Charts',
        children: [
            { id: 'charts-community', label: '@mui/x-charts' },
            { id: 'charts-pro', label: '@mui/charts-pro' },
        ],
    },
    {
        id: 'tree-view',
        label: 'Tree View',
        children: [
            { id: 'tree-view-community', label: '@mui/x-tree-view' },
            { id: 'tree-view-pro', label: '@mui/x-tree-view-pro' },
        ],
    },
];

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
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch Random question from the database to show
    const [randomEvent, setRandomEvent] = useState([]);


    // Fetch Random Event on the Event Page to show
    const [randomQuestion, setRandomQuestion] = useState([]);

    const navigate = useNavigate();
    const controller = new FeedController(setRandomEvent, setRandomQuestion, navigate);

    useEffect(() => {
        controller.fetchEventHandler().then(() => {})
        controller.fetchQuestionHandler().then(() => {})
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
                    <ExpandableList />

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
                        items={randomEvent.map(e => ({ text: e.title, link: '#' }))}
                        onItemClick={(title) => {
                            const event = randomEvent.find(e => e.title === title);
                            setSelectedEvent(event);
                        }}
                    />
                </div>

                {/* Right Panel: Display selected event */}
                <div className="w-[45vw] h-[86vh] overflow-auto mx-2 bg-gray-800 flex flex-col items-center justify-start text-white p-4">
                    {selectedEvent ? (
                        <div>

                            <Event_Showing_Description event={selectedEvent} />

                            <Button_AddEvent handleClick={() =>
                                controller.handleNavigation_EventEnter(selectedEvent)
                            }/>

                        </div>

                    ) : (
                        <p className="text-gray-400 text-xl mt-20">Select an event from the menu</p>
                    )}

                </div>

            </div>





        </div>
    );
}