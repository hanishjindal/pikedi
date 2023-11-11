"use client"
import React, { useState } from 'react'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import Studio from '@/components/studio/Studio'

const Page = () => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    return (
        <div className='flex flex-col select-none relative' onClick={() => { setMobileMenu(false) }}>
            <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
            <Studio page='Profile' />
            {/* <Footer /> */}
        </div>
    )
}

export default Page