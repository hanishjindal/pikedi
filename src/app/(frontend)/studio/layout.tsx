'use client'
import SideNav from '@/components/common/SideNav'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const searchParam = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const sideBarOpen = searchParam.get('nav')
    let isMobileOrTablet: boolean = false;
    useEffect(() => {
        isMobileOrTablet = document.documentElement.clientWidth <= 870;
        if (!sideBarOpen) {
            router.push(`${pathname}/?nav=${isMobileOrTablet ? "close" : "open"}`)
        } else if (sideBarOpen === 'open' && isMobileOrTablet) {
            router.push(`${pathname}/?nav=close`)
        }
        console.log(isMobileOrTablet)
    }, [sideBarOpen])
    return (
        <div className="w-full min-h-[90vh] h-auto flex relative select-none">
            <div className="bg-white rounded-lg w-full flex">
                <div className={`h-full relative flex flex-col min-w-[60px] ${sideBarOpen === 'close' && 'items-center z-[9]'} ${sideBarOpen === 'open' ? 'w-[18%] sm:w-[15%]' : 'w-[60px] md:w-[80px]'}`}>
                    <SideNav
                        sideBarOpen={sideBarOpen}
                        pathname={pathname}
                        isMobileOrTablet={isMobileOrTablet}
                    />
                </div>

                <div className={`w-full h-full py-8 px-4 md:px-8`}>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}