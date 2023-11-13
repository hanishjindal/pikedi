'use client';
import { SyncLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="flex flex-col relative select-none">
            <div className="min-h-[90vh] p-8 flex gap-4 text-lg">Loading <SyncLoader size={4} /></div>
        </div>
    )
}
