import React, { useEffect, useRef, useState } from 'react';
import { CAROSEL_DATA } from '../config';

const Carosel = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [scrollWidth, setScrollWidth] = useState<number>(0)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current?.scrollWidth && (scrollWidth < scrollRef.current?.scrollWidth - 500)) {
                let tempTime = scrollWidth + 200;
                setScrollWidth(tempTime);
                scrollRef.current?.scrollTo(tempTime, 0);
            } else {
                setScrollWidth(0)
                scrollRef.current?.scrollTo(0, 0);
            }
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [scrollWidth]);
    return (
        <div className='w-full h-full py-5 md:py-10 px-6 md:px-16 lg:px-28 flex flex-col items-center gap-5 lg:gap-8 relative !pb-16'>
            <h1 className='w-full text-center text-4xl lg:text-5xl font-semibold whitespace-nowrap'>
                {CAROSEL_DATA.heading.split(' ')[0]} <span className='text-theme'>{CAROSEL_DATA.heading.split(' ')[1]}</span>
            </h1>
            <div className='flex w-full gap-4 lg:gap-8 overflow-x-auto pb-2 scrollHide' ref={scrollRef}>
                {CAROSEL_DATA.list.map((item, index) => (
                    <div key={index} className='text-xs lg:text-lg border-2 border-theme rounded-2xl font-medium text-theme p-2 whitespace-nowrap scrollbar-hide'>
                        {item}
                    </div>
                ))}
            </div>
            <span id='faq' className='absolute bottom-20'></span>
        </div>
    );
};

export default Carosel;
