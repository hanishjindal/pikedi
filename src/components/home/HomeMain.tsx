import React from 'react'
import { BRAND } from '../config'
import Image from 'next/image';

const HomeMain = () => {
    return (
        <div className='w-full h-full py-10 px-6 md:px-16 lg:px-28 flex flex-col gap-10 relative'>
            <div className='flex flex-col gap-5'>
                <h1 className='w-full text-center text-4xl lg:text-5xl font-semibold whitespace-nowrap'>
                    What is <span className='text-theme'>{BRAND.name}</span>?
                </h1>
                <div className='lg:text-lg text-base lg:text-justify'>{BRAND.info}</div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 lg:w-full overflow-x-auto'>
                {BRAND.flow.map((flow, index) => {
                    return (
                        <div key={index} className='shadow-lg w-full flex flex-col gap-2 border p-6 rounded-lg'>
                            <Image
                                src={flow.link}
                                alt=""
                                width={400}
                                height={48}
                                priority
                                className='bg-gradient-to-l from-lighest-theme to-theme rounded-lg w-[400px] md:w-full h-48 md:h-28 xl:h-48 object-contain object-center shadow-md'
                            />

                            <h4 className='text-lg md:text-sm xl:text-xl font-medium'>{flow.flow}</h4>

                            <div className='text-gray-500 text-xs xl:text-sm'>{flow.text}</div>
                        </div>
                    )
                })
                }
            </div>
            <span id='faq' className='absolute bottom-20'></span>
        </div>
    )
}

export default HomeMain
