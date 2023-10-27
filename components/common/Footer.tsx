import React from 'react';
import Link from 'next/link';
import { BRAND, FOOTER_CONFIG } from '../config';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="bg-black text-white lg:pt-20 pt-10 lg:py-10 px-6 md:px-16 lg:px-28">
            <div className='flex flex-col-reverse gap-10 xl:grid grid-cols-12'>
                <div className='col-span-2 flex flex-col gap-5'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <img className='h-10' src="/images/logo.svg" alt="" />
                            <h3 className="text-2xl font-bold">{BRAND.name}</h3>
                        </div>
                        <p className='text-gray-300 text-xs'>{FOOTER_CONFIG.footerIntro}</p>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <BsFacebook />
                        <BsTwitter />
                        <BsInstagram />
                        <BsYoutube />
                        <BsLinkedin />
                    </div>
                </div>
                <div className="container col-span-10 mx-auto grid  [@media(min-width:100px)]:grid-col-1 [@media(min-width:300px)]:grid-cols-2  lg:!grid-cols-5 gap-8">
                    {FOOTER_CONFIG.list.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                            <ul className='flex flex-col gap-2 whitespace-nowrap'>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.url} className='hover:text-theme text-gray-300'>
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t border-gray-600 mt-8 p-6 flex flex-col lg:flex-row justify-between gap-4">
                <p className='[@media(min-width:100px)]:text-xs [@media(min-width:300px)]:text-sm tracking-wide'>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:flex justify-center gap-1 lg:gap-5 text-gray-300">
                    {FOOTER_CONFIG.privacyTerm.map((itm, idx) => {
                        return (
                            <Link className='whitespace-nowrap text-xs lg:text-base' key={idx} href={itm.link}>
                                {itm.title}
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        </footer>
    );
};

export default Footer;
