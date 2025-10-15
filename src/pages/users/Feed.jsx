/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import Profile_Background from "../../Components/__Profile.jsx";
import { ContentTimeline, ExpandableList, EventCard, Event_Showing_Description } from "../../Components/__Feed.jsx";
import { RotatingText } from '../../Components/__Animation.jsx'
import { Feed_Header } from "../../Utilities.ts";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import FlowingMenu from '../../Components/Custom/FlowingMenu.jsx'
import { Events_Model } from "../../models/Event_Model.js";
import { useState } from "react";
import {Background_Particles} from "../../Components/__Admin_Login.jsx";
import {Heading} from "../../Components/__Event_Question.jsx";






const HeroSection = ({ children }) => {
    return (
        <div className="flex w-[100vw] h-[100vh] items-center justify-center overflow-auto">
            {children}
        </div>
    );
}

const HeroContentSection = ({ children }) => {
    return (
        <div className="h-[70vh] w-[50vw] m-2 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30">
            {children}
        </div>
    );
}

const HeaderSection = ({ Title }) => {
    return (
        <div className="w-full h-full p-2 flex items-center justify-center">

            <RotatingText
                const texts={Title}
                mainClassName="px-4 sm:px-6 md:px-8 text-white font-extrabold text-3xl sm:text-4xl md:text-5xl overflow-hidden justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.0155}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={5000} // The amount of time the Heading will be in display
            />
        </div>
    );
}

const QuestionSection = ({ children }) => {
    return (
        <div className="flex w-screen h-[86vh] m-4 items-center justify-center">
            {children}
        </div>
    );
}

const PageTimeline = ({ children }) => {
    return (
        <div className="h-[86vh] w-[18vw] m-2 flex items-center justify-center overflow-auto">
            {children}
        </div>
    );
}

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


const sampleItems = [
    { name: "Event One", description: "This is the description of Event One." },
    { name: "Event Two", description: "Details about Event Two go here." },
    { name: "Event Three", description: "Extra info for Event Three." },
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
                        <Event_Showing_Description event={selectedEvent} />
                    ) : (
                        <p className="text-gray-400 text-xl mt-20">Select an event from the menu</p>
                    )}
                </div>

            </div>





        </div>
    );
}