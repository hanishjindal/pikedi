export const BRAND = {
    name: 'Pikedi',
    intro: '',
    flow: [
        {
            flow: 'Upload an image',
            link: '/images/flow-1.png',
            text: "Submit image for Editing from professional."
        },
        {
            flow: 'Image Getting Edited',
            link: '/images/flow-2.png',
            text: "Your image will get customized under a team of professional editors."
        },
        {
            flow: 'Received your desired image',
            link: '/images/flow-3.png',
            text: "Download your perfect photo in your desired format."
        }
    ]
};

BRAND.intro = `${BRAND.name} is a dedicated platform for photo editing enthusiasts and professionals alike. It serves as a bridge between individuals seeking high-quality photo enhancements and a community of skilled editors. ${BRAND.name}'s mission is to provide top-tier editing services at budget-friendly rates. Whether you're looking for retouching, enhancements, or creative effects, ${BRAND.name} ensures your photos achieve their utmost potential. ${BRAND.name}'s user-friendly interface and collaborative features make it easy for users to connect with experienced editors, ensuring a seamless and personalized editing experience. With a commitment to excellence and affordability, ${BRAND.name} is the go-to platform for anyone looking to transform their photos into stunning works of art.`;


export const MENU_DATA = [
    {
        text: "Home",
        label: "home",
        link: "/"
    },
    // {
    //     text: "Products",
    //     label: "products",
    //     // link: '/products'
    //     link: "/"
    // },
    {
        text: "About",
        label: "about",
        // link: '/about'
        link: "/#about"
    },
    {
        text: "Contact Us",
        label: "Contact Us",
        // link: "/pricing"
        link: "/#contact"
    }
]


export const LOGIN_DATA = {
    forText: "For",
    signinText: "Sign In",
    accountText: "Don't have an account?",
    signupText: "Sign up",
    editorText: "Editor",
    editorContent: "Elevate your editing skills and creativity as a Photo Editing Specialist. Join our community and start enhancing stunning photos.",
    studioText: "Studio",
    studioContent: "Find the perfect Photo Editor for your studio. Join our platform to connect with talented editing professionals."
}

export const COPYRIGHT = {
    text: `Copyright 2023 | ${BRAND.name} | All rights reserved.`
}