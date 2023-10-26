import React, { useState } from 'react'
import Accordion from './common/Accordian'

const AccordianSection = () => {

    return (
        <div className='md:px-16 lg:px-28 p-10'>
            <h1 className='text-center text-4xl lg:text-5xl font-semibold'>F <span className="text-theme">A</span>Q</h1>
            <Accordion className='bg-lighest-theme text-base font-medium mt-10 p-4 rounded-lg'
                title={'dfcgvhbjnkm,.'}
                content={'rtghjnkl'} />
        </div>
    )
}

export default AccordianSection