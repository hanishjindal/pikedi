import React from 'react';

type DividerProps = {
    type: 'tic' | 'tac' | 'toe';
};

const Divider: React.FC<DividerProps> = ({ type }) => {
    return (
        <div
            className={
                `w-full
                ${type === 'tic' &&
                'w-full lg:w-[1px] h-[1px] lg:h-full'
                }
                ${type === 'tac' &&
                'w-[1px] lg:w-full h-full lg:h-[1px]'
                }
                ${type === 'toe' &&
                'w-full h-[1px]'
                }
                bg-gray-400`
            }
        ></div>
    );
};

export default Divider;
