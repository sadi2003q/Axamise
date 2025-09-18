import Profile_Background from "../Components/__Profile";
import { ContentTimeline, ExpandableList } from "../Components/__Feed";
import { RotatingText } from '../Components/__Animation'
import { Feed_Header } from "../Utilities";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';




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



export default function Feed() {
    return (
        <>
            <Profile_Background />


            {/* Hero Section */}
            {/* <HeroSection>

                <HeroContentSection>
                    <HeaderSection Title={Feed_Header} />
                </HeroContentSection>

                <PageTimeline>
                    <ContentTimeline items={['item1', 'item2', 'item3', 'item4']} />
                    
                </PageTimeline>

            </HeroSection> */}


                


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

            






        </>
    );
}