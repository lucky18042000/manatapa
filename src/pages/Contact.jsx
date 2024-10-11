import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import localFont from 'next/font/local';
import React, { useState } from 'react'
import emailjs from 'emailjs-com';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});

function Contact() {
    const [conatctData, setConatctData] = useState({
        name: '',
        phone: '',
        messgae: '',
        email: '',
    })

    const sendEmail = (e) => {
        e.preventDefault(); // Prevent default form submission
        emailjs.send('service_6qgdkwi', 'template_2wcl128', conatctData, '_AqFyLIuk2rfH6qWK')
            .then((response) => {
                console.log('Email successfully sent!', response.status, response.text);
                // Clear the form after sending
                setConatctData({ name: '', phone: '', messgae: '', email: '' });
                setOpenContactForm(false); // Close modal
            })
            .catch((err) => {
                console.error('Failed to send email. Error:', err);
            });
    };
    return (
        <div>
            <Header />
            <div className='contactsection1'>
                <div className='contactsection1Container'>
                    <div className='flex flex-col items-center'>
                        <h1 className={`contactsection1Titlemobile ${roslindaleFont.className}`}>
                            Contact Us
                        </h1>
                        <img className='contactsection1Image' src="https://s3-alpha-sig.figma.com/img/13bf/d1b7/62256803f8fb41f01cb958a92dfb9a19?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=deLFYT4G2VJCQ-m8Jze8qxgde7euyh9AsReZbblefk2SCap~AYweJGmjBy1S1ptIQllyB~ztstAbtzIHOIz5EKzLtj6bpIBjWNP2VZKQnb5yv-iUyg1bX6xHGQ8h34hz7dbGWRiqHDjQ782wQPokbVz2PSzZsuM-WU2DflAACgn6268li54JE5zfRQsRN0ZMuRKFqi6gD6kqSgG6Ai6y8pmHE1IfyfJBcecRDGMAiwfqN~WhEACwdcaKT0AzccjtRFFpbz7oVMWFkzOSA7OneXpR31Q6SZ4ZI7aABHSvdbNc8pT5yzVpMPswPa40Xn6fYD8j9ewCgnVykiZHLqAeSQ__" alt="" />

                    </div>
                    <div className='flex flex-col items-center w-full'>
                        <h1 className={`contactsection1Title ${roslindaleFont.className}`}>
                            Contact Us
                        </h1>
                        <div className='w-full flex flex-col justify-center lg:px-[60px] px-[20px] mt-[56px]'>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className={`border-[#A80018] w-full border py-[15px] rounded-[20px] px-[40px] text-[24px] text-black outline-none placeholder:text-[#0000006B] ${roslindaleFont.className}`}
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
                                type="email"
                                name="email"
                                id="email"
                                className={`border-[#A80018] w-full border py-[15px] mt-6 rounded-[23px] px-[40px] text-[24px] text-black outline-none placeholder:text-[#0000006B] ${roslindaleFont.className}`}
                                value={conatctData?.email}
                                placeholder='Email'
                                onChange={(e) => {
                                    setConatctData((prevData) => (
                                        {
                                            ...prevData,
                                            email: e.target.value
                                        }
                                    ))
                                }}
                            />
                            <input
                                type="number"
                                name="number"
                                id="number"
                                className={`border-[#A80018] w-full border py-[15px] mt-6 rounded-[23px] px-[40px] text-[24px] text-black outline-none placeholder:text-[#0000006B] ${roslindaleFont.className}`}
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
                                className={`border-[#A80018] w-full border py-[15px] mt-6 rounded-[23px] px-[40px] text-[24px] text-black outline-none placeholder:text-[#0000006B] ${roslindaleFont.className}`}
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
                                <p onClick={(e) => { sendEmail(e) }} className={`bg-[#A80018] py-[15px] cursor-pointer text-[#FFF] rounded-[23px] px-[40px] text-[24px] text-center ${roslindaleFont.className}`}>
                                    Submit
                                </p>
                                {/* <p onClick={() => setOpenContactForm(!openContactForm)} className={`text-center cursor-pointer text-white  py-[10px] mt-6 ${roslindaleFont.className} `}>Close</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact