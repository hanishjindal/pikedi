import React, { useState, useRef, useEffect } from 'react';

interface AccordianProps {
    className: string;
    title: string;
    content: string;
}

const Accordion: React.FC<AccordianProps> = ({ className, title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const chevronRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, []);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        setContentHeight(isOpen ? 0 : contentRef.current?.scrollHeight || 0);
    };

    const accordionStyle = {
        maxHeight: isOpen ? `${contentHeight}px` : 0,
        transition: 'max-height 0.5s ease-in-out',
        overflow: 'hidden',
    };

    const chevronStyle = {
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s ease-in-out',
    };

    return (
        <div className={className}>
            <div className="flex justify-between" onClick={toggleAccordion}>
                <div>{title}</div>
                <img
                    ref={chevronRef}
                    style={chevronStyle}
                    src={``}
                    alt=""
                />
            </div>
            <div
                ref={contentRef}
                style={accordionStyle}
                className="transition-max-height duration-500"
            >
                {content}
            </div>
        </div>
    );
};

export default Accordion;
