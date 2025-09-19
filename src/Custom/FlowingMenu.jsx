import React from 'react';
import { gsap } from 'gsap';

function FlowingMenu({ items = [], onItemClick }) {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0 overflow-y-auto">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        onClick={() => onItemClick && onItemClick(item.text)}
                    />
                ))}
            </nav>
        </div>
    );
}

function MenuItem({ link, text, image, onClick }) {
    const itemRef = React.useRef(null);
    const marqueeRef = React.useRef(null);
    const marqueeInnerRef = React.useRef(null);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    // Helper to detect nearest edge for hover animation
    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    const handleMouseEnter = ev => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
    };

    const handleMouseLeave = ev => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
    };

    // Repeat content for scrolling effect
    const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
            <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">{text}</span>
            {image && (
                <div
                    className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}
        </React.Fragment>
    ));

    return (
        <div
            className="relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff] py-6 cursor-pointer"
            ref={itemRef}
        >
            <a
                className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
                href={link}
                onClick={(e) => {
                    e.preventDefault();  // ✅ prevents jump
                    onClick && onClick();
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {text}
            </a>

            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
                ref={marqueeRef}
            >
                <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
                    <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlowingMenu;