import React from 'react'

interface SignupFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: 'Editor' | 'Studio';
}

const StudioSignUp: React.FC<SignupFormProps> = ({ back, WhoIsLogin }) => {
    return (
        <div
            className="py-7 px-8 lg:py-5 lg:px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[45%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
        >
            <img
                className="w-8 cursor-pointer absolute top-5 left-5"
                src="/images/back.svg"
                alt="Back-icon"
                onClick={back}
            />

            <h1 className="text-2xl lg:text-4xl font-semibold">
                Signup <span className="whitespace-nowrap">&#40;As <span className="text-theme">{WhoIsLogin}</span>&#41;</span>
            </h1>
        </div>
    )
}

export default StudioSignUp