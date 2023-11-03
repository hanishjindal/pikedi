"use client"
import React, { useState } from 'react'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import Profile from '@/components/profile/Profile'

const Page = () => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    const [userData, setUserData] = useState<any>({})
    return (
        <div className='min-h-screen flex flex-col justify-between overflow-y-auto select-none bg-gradient-to-b from-lighest-theme to-white relative' onClick={() => { setMobileMenu(false) }}>
            <Navbar
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
                setUserData={setUserData}
            />
            <Profile
                userData={userData}
                setUserData={setUserData}
            />
            <Footer />
        </div>
    )
}

export default Page