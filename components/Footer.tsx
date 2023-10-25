import React from 'react'
import { COPYRIGHT } from './config'

const Footer = () => {
    return (
        <div className='w-full bg-black text-white h-8 flex justify-center items-center'>
            <span className='text-sm tracking-wide'>{COPYRIGHT.text}</span>
        </div>
    )
}

export default Footer