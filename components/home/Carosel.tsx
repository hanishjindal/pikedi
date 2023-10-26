import React from 'react'
import { CAROSEL_DATA } from '../config'

const Carosel = () => {
    return (
        <div className='w-full h-full py-10 px-6 md:px-16 lg:px-28 flex flex-col items-center gap-10 relative'>
            <h1 className='w-full text-center text-4xl lg:text-5xl font-semibold whitespace-nowrap'>
                {CAROSEL_DATA.heading.split(' ')[0]} <span className='text-theme'>{CAROSEL_DATA.heading.split(' ')[1]}</span>
            </h1>
            <div className='relative w-full'>
                <div className=' flex items-center gap-10 w-full overflow-x-auto mb-40'>
                    {CAROSEL_DATA.list.map((item, index) => {
                        return (
                            <div key={index} className='text-lg font-medium text-gray-500 p-5 whitespace-nowraps scrollbar-hide'>
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carosel