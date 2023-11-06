"use client"
import React, { useState } from 'react'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import Studio from '@/components/studio/Studio'

const Page = () => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    return (
        <div className='h-screen flex flex-col overflow-y-auto select-none' onClick={() => { setMobileMenu(false) }}>
            <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
            <Studio />
            {/* <Footer /> */}
        </div>
    )
}

export default Page