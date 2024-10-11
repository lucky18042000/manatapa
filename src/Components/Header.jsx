import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import localFont from 'next/font/local';
import emailjs from 'emailjs-com';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});

function Header() {
    const [openContactForm, setOpenContactForm] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const [conatctData, setConatctData] = useState({
        name: '',
        phone: '',
        messgae: ''
    })

    useEffect(() => {
        // Select the header by its class or ID and apply the GSAP animation
        gsap.fromTo(
            '.blurinheader', // Target the element with class 'blurinheader'
            {
                y: -100, // Start from 100px above its original position
                opacity: 0, // Start with opacity 0
            },
            {
                y: 0, // End at its original position
                opacity: 1, // Set opacity to 0.5
                duration: 1, // Animation duration in seconds
                ease: 'power2.out', // Add easing for a smoother effect
            }
        );
    }, []);

    useEffect(() => {
        // Select the header by its class or ID and apply the GSAP animation
        gsap.fromTo(
            '.blurinheader', // Target the element with class 'blurinheader'
            {
                y: -100, // Start from 100px above its original position
                opacity: 0, // Start with opacity 0
            },
            {
                y: 0, // End at its original position
                opacity: 1, // Set opacity to 0.5
                duration: 1, // Animation duration in seconds
                ease: 'power2.out', // Add easing for a smoother effect
            }
        );
    }, []);

    const sendEmail = (e) => {
        e.preventDefault(); // Prevent default form submission
        emailjs.send('service_6qgdkwi', 'template_2wcl128', conatctData, '_AqFyLIuk2rfH6qWK')
            .then((response) => {
                console.log('Email successfully sent!', response.status, response.text);
                // Clear the form after sending
                setConatctData({ name: '', phone: '', message: '' });
                setOpenContactForm(false); // Close modal
            })
            .catch((err) => {
                console.error('Failed to send email. Error:', err);
            });
    };

    return (
        <div className=' blurinheader lg:px-[64px] lg:py-[6px] px-[22px] py-[6px] '>
            <div className='flex justify-between items-center'>
                <Link href={'/'} className='lg:hidden md:hidden block'>
                    <img className='w-[39px] h-[42px] ' src="/logo.png" alt="mantapalogo" />
                </Link>
                <div className='flex gap-[10px]'>
                    <Link href={'/Stills'} className='material-bubble cursor-pointer'>STILLS</Link>
                    <Link href={'/Motions'} className='material-bubble cursor-pointer'>MOTION</Link>
                </div>
                <Link href={'/'} className='hidden md:block lg:block'>
                    <img className='w-[52px] h-[52px] cursor-pointer' src="/logo.png" alt="mantapalogo" />
                </Link>
                <div className=' gap-[10px] hidden md:flex lg:flex'>
                    <Link href={'/AboutUs'} className='material-bubble cursor-pointer'>ABOUT</Link>
                    <Link href={'/Contact'} className='material-bubble !text-white !bg-[#A80018] cursor-pointer'>CONTACT</Link>
                </div>
                <div className='lg:hidden md:hidden block'>
                    <p onClick={() => { setOpenMenu(!openMenu) }} className='material-bubble1 '>MENU</p>
                </div>
            </div>
            <div className='lg:hidden md:hidden hidden absolute  bg-white rounded-[23px] w-full'>
                <p className='text-center'>Stills</p>
                <p className='text-center'>Motion</p>
                <p className='text-center'>About</p>
                <p className='text-center'>Contact</p>
            </div>
            <CustomModal isOpen={openContactForm} onClose={() => setOpenContactForm(!openContactForm)}>
                <div className='w-[307px] lg:w-[607px] m  bg-[#A80018] py-[44px]'>
                    <h1 className={`headerConatctTitle ${roslindaleFont.className}`}>
                        Contact Us
                    </h1>
                    <div className='w-full flex flex-col justify-center px-[60px] mt-[56px]'>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={`bg-[#C1283E] py-[15px] rounded-[23px] px-[40px] text-[24px] text-white outline-none placeholder:text-[#f6f1eb77] ${roslindaleFont.className}`}
                            value={conatctData?.name}
                            placeholder='Full Name'
                            onChange={(e) => {
                                setConatctData((prevData) => (
                                    {
                                        ...prevData,
                                        name: e.target.value
                                    }
                                ))
                            }}
                        />
                        <input
                            type="number"
                            name="number"
                            id="number"
                            className={`bg-[#C1283E] py-[15px] mt-6 rounded-[23px] px-[40px] text-[24px] text-white outline-none placeholder:text-[#f6f1eb77] ${roslindaleFont.className}`}
                            value={conatctData?.phone}
                            placeholder='Phone Number'
                            onChange={(e) => {
                                setConatctData((prevData) => (
                                    {
                                        ...prevData,
                                        phone: e.target.value
                                    }
                                ))
                            }}
                        />
                        <textarea
                            name="message"
                            id="message"
                            className={`bg-[#C1283E] py-[15px] mt-6 rounded-[23px] px-[40px] text-[24px] text-white outline-none placeholder:text-[#f6f1eb77] ${roslindaleFont.className}`}
                            value={conatctData?.messgae}
                            placeholder='Message'
                            onChange={(e) => {
                                setConatctData((prevData) => (
                                    {
                                        ...prevData,
                                        messgae: e.target.value
                                    }
                                ))
                            }}
                        />
                        <div className='w-full mt-6 '>
                            <p onClick={(e) => { sendEmail(e) }} className={`bg-[#FFF] py-[15px] cursor-pointer text-[#A80018] rounded-[23px] px-[40px] text-[24px] text-center ${roslindaleFont.className}`}>
                                Send
                            </p>
                            <p onClick={() => setOpenContactForm(!openContactForm)} className={`text-center cursor-pointer text-white  py-[10px] mt-6 ${roslindaleFont.className} `}>Close</p>
                        </div>
                    </div>

                </div>
            </CustomModal>
            <CustomModal isOpen={openMenu} onClose={() => setOpenMenu(!openMenu)}>
                <div className='w-[307px] flex flex-col justify-center items-center bg-[#A80018] py-[44px]'>
                    <Link href={'/Stills'} className={`text-center text-white text-[18px] ${roslindaleFont.className}`}>
                        Stills
                    </Link>
                    <Link href={'/Motions'} className={`text-center text-white text-[18px] ${roslindaleFont.className}`}>
                        Motions
                    </Link>
                    <Link href={'/AboutUs'} className={`text-center text-white text-[18px] ${roslindaleFont.className}`}>
                        About
                    </Link>

                </div>
            </CustomModal >
        </div >

    );
}

export default Header;
