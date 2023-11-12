'use client';
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { SyncLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="flex flex-col relative select-none">
            <Navbar mobileMenu={false} setMobileMenu={() => { }} />
            <div className="min-h-[90vh] p-8 flex gap-4 text-lg">Loading <SyncLoader size={4} /></div>
            <Footer />
        </div>
    )
}
