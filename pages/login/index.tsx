import React, { useState } from 'react'
import Login from '@/components/login/Login'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'

const Page = () => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    return (
        <div className='min-h-screen flex flex-col justify-between scrollBar overflow-y-auto lg:overflow-y-scroll select-none bg-gradient-to-b from-lighest-theme to-white relative' onClick={() => { setMobileMenu(false) }}>
            <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
            <Login />
            <Footer />
        </div>
    )
}

export default Page