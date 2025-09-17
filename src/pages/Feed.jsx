import Profile_Background from "../Components/__Profile";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { RotatingText } from '../Components/__Animation'
import { Feed_Header } from "../Utilities";

export default function Feed() {
    return (
        <>
            <Profile_Background />


            <div className="flex w-screen h-screen items-center justify-center">


                <div className="h-[86vh] w-[25vw] m-2 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30"></div>
                <div className="h-[86vh] w-[50vw] m-2 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30">

                    <div className="w-full h-full p-2 flex items-center justify-center">

                        <RotatingText
                            const texts={Feed_Header}
                            mainClassName="px-4 sm:px-6 md:px-8 text-white font-extrabold text-3xl sm:text-4xl md:text-5xl overflow-hidden justify-center rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.0155}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={3500} // The amount of time the Heading will be in display
                        />
                    </div>


                </div>
                <div className="h-[86vh] w-[18vw] m-2 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30"></div>


            </div>




        </>
    );
}