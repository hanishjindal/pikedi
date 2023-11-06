export const BRAND = {
    name: 'Pikedi',
    intro: 'Elevate your photos with the touch of professionals...',
    info: '',
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

BRAND.info = `${BRAND.name} is a dedicated platform for photo editing enthusiasts and professionals alike. It serves as a bridge between individuals seeking high-quality photo enhancements and a community of skilled editors. ${BRAND.name}'s mission is to provide top-tier editing services at budget-friendly rates. Whether you're looking for retouching, enhancements, or creative effects, ${BRAND.name} ensures your photos achieve their utmost potential. ${BRAND.name}'s user-friendly interface and collaborative features make it easy for users to connect with experienced editors, ensuring a seamless and personalized editing experience. With a commitment to excellence and affordability, ${BRAND.name} is the go-to platform for anyone looking to transform their photos into stunning works of art.`;

export const CAROSEL_DATA = {
    heading: 'Our Services',
    list: [
        'Photo Retouching',
        'Portrait Retouching',
        'Product Retouching',
        'Event Retouching',
        'Photo Enhancements',
        'Color Correction',
        'Exposure Adjustment',
        'Background Removal',
        'Creative Editing',
        'Filters and Effects',
        'Manipulations',
        'Custom Artwork',
        'HDR Image Editing',
        'Collage Creation',
        'Texture and Pattern Additions',
        'Skin Smoothing',
        'Object Removal or Addition',
        'Clipping Path Services',
        'Batch Photo Editing',
        'Photo Restoration',
        '3D Rendering',
        'Digital Makeup',
        'Selective Color Adjustments',
        'Panorama Stitching',
        'Noise Reduction',
        'Shadow and Highlight Adjustment',
        'Sharpening and Softening',
        'Photo Manipulation for Social Media',
        'Black and White Conversions',
        'Cropping and Resizing',
        'Watermark Addition or Removal'
    ]
}


export const MENU_DATA = [
    {
        text: "Home",
        label: "home",
        protected: false,
        link: "/"
    },
    {
        text: "About",
        label: "about",
        protected: false,
        // link: '/about'
        link: "/#about"
    },
    {
        text: "Faq",
        label: "products",
        protected: false,
        link: '/#faq'
        // link: "/"
    },
    {
        text: "Contact Us",
        label: "Contact Us",
        protected: false,
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

export const CONTACT_DATA = {
    text: `If you have any questions, feedback, or inquiries, please don't hesitate to get in touch with us. Our dedicated team is here to assist you and provide the information you need. Feel free to reach out through the contact form or use the provided contact details below, and we'll respond as soon as possible. We value your input and look forward to hearing from you.`
}

export const FAQ = [
    {
        ques: `How does ${BRAND.name} ensure the quality of edits?`,
        ans: `${BRAND.name} maintains a community of vetted and experienced photo editors. They undergo a rigorous selection process to ensure they meet our high-quality standards.`
    },
    {
        ques: `What types of editing services does ${BRAND.name} offer?`,
        ans: `${BRAND.name} offers a range of editing services including photo retouching, enhancements, and creative effects.Whether it's portrait retouching, color correction, or custom artwork, we have you covered.`
    },
    {
        ques: `How do I choose an editor on ${BRAND.name}?`,
        ans: `${BRAND.name} provides detailed editor profiles and portfolios, allowing you to browse and select an editor whose style aligns with your vision.You can also communicate directly with editors before making a choice.`
    },
    {
        ques: `What if I'm not satisfied with the edit I receive?`,
        ans: `We have a review process in place.If you're not completely satisfied with the edit, you can provide feedback to the editor for revisions until you're happy with the result.`
    },
    {
        ques: `What are the pricing options on ${BRAND.name}?`,
        ans: `${BRAND.name} offers different pricing tiers based on the complexity of the edit.We have options for basic edits, advanced edits, and custom projects, all designed to suit various budgets.`
    },
    {
        ques: `Is my payment secure on ${BRAND.name}?`,
        ans: `Yes, ${BRAND.name} ensures secure payment processing through trusted platforms.We also have a money- back guarantee in case of any unforeseen issues.`
    },
    {
        ques: `How do I become an editor on ${BRAND.name} ?`,
        ans: `If you're an experienced photo editor, you can apply through our platform. We review applications and select editors based on their skill and expertise.`
    },
    {
        ques: `Can I get a refund if I'm not satisfied with the final result?`,
        ans: `${BRAND.name} offers a money - back guarantee.If you're not satisfied with the final edit after the review process, you can request a refund.`
    }
]

export const FOOTER_CONFIG = {
    footerIntro: `Empowering Studios with Professional Photo Editing.`,
    list: [
        {
            title: 'Join Us',
            links: [
                { text: 'Apply to be an Editor', url: '#' },
                { text: 'Pricing', url: '#' },
            ],
        },
        {
            title: 'Pricing',
            links: [
                { text: 'Pricing Tiers', url: '#' },
                { text: 'Basic Edits', url: '#' },
                { text: 'Advanced Edits', url: '#' },
                { text: 'Custom Projects', url: '#' },
                { text: 'Payment Options', url: '#' },
                { text: 'Money-back Guarantee', url: '#' },
            ],
        },
        {
            title: 'FAQs',
            links: [
                { text: 'General Questions', url: '#' },
                { text: 'Using Pikedi', url: '#' },
                { text: 'Working with Editors', url: '#' },
                { text: 'Payment and Security', url: '#' },
            ],
        },
        {
            title: 'Blog',
            links: [
                { text: 'Photo Editing Tips', url: '#' },
                { text: 'Photography Inspiration', url: '#' },
                { text: 'Editor Spotlights', url: '#' },
                { text: 'Industry News', url: '#' },
            ],
        },
        {
            title: 'Contact Us',
            links: [
                { text: 'Support Center', url: '#' },
                { text: 'Contact Form', url: '#' },
                { text: 'Business Inquiries', url: '#' },
            ],
        },
    ],
    privacyTerm: [
        {
            title: 'Terms of Service',
            // link: '/terms-of-service'
            link: '/'
        },
        {
            title: 'Privacy Policy',
            // link: '/privacy-policy'
            link: '/'
        },
        {
            title: 'Refund Policy',
            // link: '/refund-policy'
            link: '/'
        },
        {
            title: 'User Guidelines',
            // link: '/user-guidelines'
            link: '/'
        }
    ]

};