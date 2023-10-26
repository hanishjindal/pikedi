import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react'

export default function AccordianSection(props) {
    const [accordianBodyHeight, setAccordianBodyHeight] = useState('0px');

    const accordianContent = useRef(null);

    const toggleAccordian = (index) => {
        if (props.activeIcon !== index) props.setActiveIcon(index);
        else props.setActiveIcon(-1);
    }

    useEffect(() => {
        setAccordianBodyHeight(props.activeIcon === props.idx ? `${50}vh` : '0px');
    }, [props.activeIcon])

    return (
        <div className={props.class1 || 'accordian-section w-full block'}>
            <button
                className={props.class2 || 'accordian-btn text-xs leading-[15px] font-medium bg-gray-light rounded-t-lg py-2 px-3 text-black-light w-full border-0 outline-none mb-3'}
                onClick={() => toggleAccordian(props.idx)}
            >
                <p
                    className={props.class3 || [styles[props.activeIcon === props.idx
                        ?
                        'accordian-title-active'
                        :
                        'accordian-title'], ' float-left'].join(' ')}
                >{props.title}</p>
                <Image src='https://spyne-static.s3.amazonaws.com/console/filter/chevron_down_inactive.svg' width={20} height={20} alt='dropdown-icon'
                    className={[styles[props.activeIcon === props.idx ? 'rotate-icon' : 'accordian-icon'], `ml-auto ${props.classArrow}`].join(' ')}
                />
            </button>
            <div ref={accordianContent} style={{ maxHeight: `${accordianBodyHeight}` }} className="overflow-hidden transition-all ease-in-out duration-500 max-h-[50vh] overflow-y-scroll">
                {/* <div className={styles['accordian-text']} dangerouslySetInnerHTML={{ __html: props.content }} ></div> */}

                {
                    props.class1
                        ?
                        <div className={props.class4}>
                            {props.content.match("\n") ? props.content.split('\n').map((line, index) => {
                                return (
                                    <div key={index}>
                                        {line}
                                    </div>
                                )
                            }) : props.content.match("connect@spyne.ai") ? props.content.split("connect@spyne.ai").map((eml, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        {eml}
                                        {
                                            idx < props.content.split("connect@spyne.ai").length - 1
                                            &&
                                            <a className='text-blue-100' target='_blank' href="mailto:connect@spyne.ai">connect@spyne.ai</a>
                                        }

                                    </React.Fragment>
                                )
                            }) : props.content}
                        </div>
                        :
                        <div>{props.content}</div>
                }

            </div>
        </div>

    )
}