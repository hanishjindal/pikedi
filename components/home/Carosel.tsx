import React from 'react';
import { CAROSEL_DATA } from '../config';

const Carosel = () => {
    return (
        <div className='w-full h-full py-5 md:py-10 px-6 md:px-16 lg:px-28 flex flex-col items-center gap-5 lg:gap-8 relative overflow-hidden'>
            <h1 className='w-full text-center text-4xl lg:text-5xl font-semibold whitespace-nowrap'>
                {CAROSEL_DATA.heading.split(' ')[0]} <span className='text-theme'>{CAROSEL_DATA.heading.split(' ')[1]}</span>
            </h1>
            <div className='animate-scroll-small lg:animate-scroll flex w-full gap-4 lg:gap-8'>
                {CAROSEL_DATA.list.map((item, index) => (
                    <div key={index} className='w-auto text-xs lg:text-lg border-2 border-theme rounded-2xl font-medium text-theme p-2 whitespace-nowrap scrollbar-hide'>
                        {item}
                    </div>
                ))}
            </div>
            <span id='about' className='absolute bottom-10'></span>
        </div>
    );
};

export default Carosel;
