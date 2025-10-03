import Particles from './Custom/Particels';

export const Background_Particles = () => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed", // so it stays behind everything
                top: 0,
                left: 0,
                // push behind
            }}
        >
            <Particles
                particleColors={["#ffffff", "#ffffff"]}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
            />
        </div>
    );
};




export const LoginHeader = ({ header = "Admin Login" }) => {
    return (
        <div className="flex items-center justify-start px-4 py-2 text-2xl font-bold text-black bg-white">
            {header}
        </div>
    );
}
