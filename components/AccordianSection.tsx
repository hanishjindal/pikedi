import React, { useState, useRef } from 'react'
import { FAQ } from './config'
import { BiChevronDown } from 'react-icons/bi'

const AccordianSection = () => {
    const [accordian, setAccordian] = useState<number>(-1)
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const toggleAccordion = (index: number) => {
        if (accordian != index) {
            setAccordian(index)
        } else {
            setAccordian(-1)
        }
        setContentHeight(accordian == index ? 0 : contentRef.current?.scrollHeight || 0);
    };

    return (
        <div id='faq' className='px-2 md:px-16 lg:px-20 pb-5 flex flex-col gap-5'>
            <h1 className='text-center text-3xl lg:text-5xl font-semibold'>Have any questions?</h1>
            <div className='flex flex-col gap-2 bg-lighest-theme px-3 py-6 lg:p-10 rounded-lg'>
                {FAQ.map((item, index) => {
                    return <div key={index} className={'bg-white shadow-lg text-sm lg:text-base font-medium p-4 rounded-lg cursor-pointer'} onClick={() => toggleAccordion(index)}>
                        <div className="flex justify-between items-center">
                            <div>{item.ques}</div>
                            <span style={{ transform: (accordian === index) ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <BiChevronDown size={20} />
                            </span>
                        </div>
                        <div
                            ref={contentRef}
                            style={{ maxHeight: (accordian === index) ? `${contentHeight}px` : 0, overflow: 'hidden' }}
                            className="transition-max-height duration-500 text-xs lg:text-sm text-gray-500"
                        >
                            {item.ans}
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default AccordianSection