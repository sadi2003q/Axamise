// MarqueeScroll.jsx
import React, { useRef, useEffect } from "react";

export const MarqueeScroll = ({ children, speed = 2 }) => {
    const containerRef = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        const scrollContent = scrollRef.current;

        let animationFrameId;
        let offset = 0;

        const animate = () => {
            offset -= speed;
            if (Math.abs(offset) >= scrollContent.scrollWidth / 2) {
                offset = 0;
            }
            scrollContent.style.transform = `translateX(${offset}px)`;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [speed]);

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
            }}
        >
            <div
                ref={scrollRef}
                style={{
                    display: "inline-flex",
                }}
            >
                {children}
                {children} {/* duplicate for seamless loop */}
            </div>
        </div>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const CommonProps = {
    variant: "standard",
    fullWidth: true,
    InputProps: {
        sx: {
            color: "white",
            fontFamily: "Roboto Mono, monospace",
            "&:before": { borderBottom: "1px solid gray" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "1px solid white" },
            "&:after": { borderBottom: "2px solid #ff9800" },
        },
    },
    InputLabelProps: {
        sx: {
            color: "white",
            fontFamily: "Roboto Mono, monospace",
            "&.Mui-focused": { color: "#ff9800" },
        },
    },
};


export const GetCommonProps = (
    borderColor = "gray",
    hoverColor = "white",
    focusColor = "#ff9800",
    fontSize = "1rem",
    paddingY = "20px", // extra padding for input
height = "56px" // 👈 default TextField height in MUI
) => ({
    variant: "standard",
    fullWidth: true,
    InputProps: {
        sx: {
            color: "white",
            fontFamily: "Roboto Mono, monospace",
            fontSize,
            paddingY, // adds vertical padding between input text and label
            height,
            "&:before": { borderBottom: `1px solid ${borderColor}` },
            "&:hover:not(.Mui-disabled):before": { borderBottom: `1px solid ${hoverColor}` },
            "&:after": { borderBottom: `2px solid ${focusColor}` },
        },
    },
    InputLabelProps: {
        sx: {
            color: "gray",
            fontFamily: "Roboto Mono, monospace",
            fontSize: "1rem",
            "&.Mui-focused": {

                color: focusColor,
                transform: "translateY(-4px) scale(0.9)", // moves label slightly up when focused
            },
        },
    },
});



