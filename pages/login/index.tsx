import React from 'react'
import Login from '@/components/login/Login'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const page = () => {
    return (
        <div className='h-screen flex flex-col justify-between scrollBar overflow-y-auto lg:overflow-y-scrool select-none'>
            <Navbar />
            <Login />
            <Footer />
        </div>
    )
}

export default page