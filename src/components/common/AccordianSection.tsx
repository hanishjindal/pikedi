'use client'
import React, { useState, useEffect, RefObject } from 'react';
import { FAQ } from '../config';
import { BiChevronDown } from 'react-icons/bi';

const AccordianSection = () => {
    const [accordion, setAccordion] = useState<number | null>(null);
    const [contentHeights, setContentHeights] = useState<number[]>([]);
    const contentRefs: RefObject<HTMLDivElement | null>[] = FAQ.map(() => React.createRef<HTMLDivElement>());

    useEffect(() => {
        const heights = contentRefs.map((ref) => ref.current?.scrollHeight || 0);
        setContentHeights(heights);
    }, []);

    const toggleAccordion = (index: number) => {
        if (accordion === index) {
            setAccordion(null);
        } else {
            setAccordion(index);
        }
    };

    return (
        <div id='faq' className='px-2 md:px-16 lg:px-20 pb-5 flex flex-col gap-5 select-text relative'>
            <h1 className='text-center text-3xl lg:text-5xl font-semibold'>Have any questions?</h1>
            <div className='flex flex-col gap-2 bg-lighest-theme px-3 py-6 lg:p-10 rounded-lg'>
                {FAQ.map((item, index) => {
                    const contentRef = contentRefs[index];
                    const contentHeight = contentHeights[index];

                    return (
                        <div key={index} className={'bg-white shadow-lg text-base lg:text-xl font-medium p-4 rounded-lg cursor-pointer'} onClick={() => toggleAccordion(index)}>
                            <div className="flex justify-between items-center">
                                <div>{item.ques}</div>
                                <span style={{ transform: accordion === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                    <BiChevronDown size={20} />
                                </span>
                            </div>
                            <div
                                ref={contentRef as RefObject<HTMLDivElement>}
                                style={{
                                    maxHeight: accordion === index ? `${contentHeight}px` : 0,
                                    overflow: 'hidden',
                                }}
                                className="text-sm lg:text-lg text-gray-500 pr-5"
                            >
                                {item.ans}
                            </div>
                        </div>
                    );
                })}
            </div>
            <span id='contact' className='absolute bottom-20'></span>
        </div>
    );
}

export default AccordianSection;
