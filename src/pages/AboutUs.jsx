import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import React, { useEffect, useRef, useState } from 'react'
import localFont from 'next/font/local';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Ensure ScrollTrigger is imported from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

// Dynamically import the AboutUs component with SSR disabled
const DynamicAboutUs = dynamic(() => import('@/pages/AboutUs'), { ssr: false });
const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});

gsap.registerPlugin(ScrollTrigger);

function AboutUs() {
    const mainRef = useRef(null); // Reference for the main container
    const [isMounted, setIsMounted] = useState(false);

    // Mark the component as mounted to ensure it's client-side only
    useEffect(() => {
        setIsMounted(true);
        if (!isMounted) return; // Ensure this code runs only on the client side

        const sections = gsap.utils.toArray('.section'); // Adjust this if you have specific class names for sections

        sections.forEach(section => {
            gsap.fromTo(
                section,
                { y: 100 },
                {
                    y: 0,
                    duration: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        scrub: true,
                        onEnter: () => gsap.to(section, { y: 0 }),
                        onLeaveBack: () => gsap.to(section, { y: -100 }),
                    },
                }
            );
        });

    }, [isMounted]);

    useGSAP(() => {
        if (typeof window === 'undefined') return; // Ensure this code runs only on the client side

        const leftImages = gsap.utils.toArray('.left-image');
        leftImages.forEach((leftImage) => {
            gsap.fromTo(
                leftImage,
                { x: '50%', opacity: 0 },
                {
                    x: '-100px',
                    opacity: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: leftImage,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        scrub: true,
                    },
                }
            );
        });

        const rightImages = gsap.utils.toArray('.right-image');
        rightImages.forEach((rightImage) => {
            gsap.fromTo(
                rightImage,
                { x: '-50%', opacity: 0 },
                {
                    x: '100px',
                    opacity: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: rightImage,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        scrub: true,
                    },
                }
            );
        });
    }, [isMounted]);


    // Ensure component doesn't render server-side
    if (!isMounted) {
        return null;
    }


    return (
        <div>
            <Header />
            <div className='aboutussection1 section'>
                <h1 className={`aboutussection1Title ${roslindaleFont.className}`}>
                    About Us
                </h1>
                <img className='aboutussection1Image' src="" alt="" />
                <p className={`aboutussection1para ${roslindaleFont.className}`}>Mantapa, the brainchild of visionary individuals Arth and Priyansh Patel, transcends conventional wedding cinematography by intricately weaving the ephemeral splendor of Indian matrimonial rituals with the nuanced artistry of filmmaking and design.</p>
            </div>
            <div className='aboutussection2 section'>
                <img src="" alt="" srcset="" />
            </div>
            {/* <div className='aboutussection3'>
                <div className='absolute lg:left-[-100px] left-[-100px] h-full flex items-center'>
                    <img className='lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[-2.8deg] rounded-[32px] -z-10' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612' alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center w-[413px]' >
                    <h1 className={`lg:text-[84.9px] text-[26px]  text-[#A80018] lg:leading-[98px] leading-[24px] font-bold text-center ${roslindaleFont.className}`}>Where we Work</h1>
                    <p className='lg:text-[18px] text-[14px]  text-[#A80018] leading-[19px] lg:leading-[29px] lg:mt-[61px] w-[254px] lg:w-full text-center capitalize'>From the bustling streets of New York to the historic charm of London, we are across the USA and UK, soon to embrace the vibrant and diverse landscapes of India.</p>
                </div>
                <div className='absolute lg:right-[-100px] right-[-115px] h-full flex items-center'>
                    <img className='lg:w-[600px] lg:h-[700px] w-[216px] h-[347px]  object-cover rotate-[2.8deg] rounded-[32px] -z-10' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612' alt="" />
                </div>
            </div> */}
            <div className='aboutussection3 section'>
                <div className='absolute lg:left-[-100px] left-[-100px] h-full flex items-center'>
                    <img
                        className="left-image lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[-2.8deg] rounded-[32px] -z-10"
                        src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612'
                        alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center w-[413px]' >
                    <h1 className={`lg:text-[84.9px] text-[26px]  text-[#A80018] lg:leading-[98px] leading-[24px] font-bold text-center ${roslindaleFont.className}`}>Where we Work</h1>
                    <p className='lg:text-[18px] text-[14px]  text-[#A80018] leading-[19px] lg:leading-[29px] lg:mt-[61px] w-[254px] lg:w-full text-center capitalize'>From the bustling streets of New York to the historic charm of London, we are across the USA and UK, soon to embrace the vibrant and diverse landscapes of India.</p>
                </div>
                <div className="absolute lg:right-[-100px] right-[-115px] h-full flex items-center">
                    <img
                        className="right-image lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[2.8deg] rounded-[32px] -z-10"
                        src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612"
                        alt="Right Image"
                    />
                </div>
            </div>
            <div className='aboutussection4 section'>
                <h1 className={`text-[36px] lg:text-[84.9px] text-[#A80018] leading-[98px] font-bold ${roslindaleFont.className}`}>Nature of Mantapa</h1>
                <div className='flex lg:flex-row flex-col gap-[65px] mt-[54px]'>
                    <img className='w-[256px] lg:w-[600px] h-[290px] lg:h-[700px]  object-cover rounded-[32px] -z-10' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/dsdsds.png?alt=media&token=4a8804fb-428b-42c1-bf14-c2feeb1c64f7' alt="" />
                    <p className={` lg:w-[712px] text-[18px] text-[#A80018] leading-[29px] lg:mt-[61px] capitalize ${roslindaleFont.className}`}>
                        At Mantapa, we weave the essence of Indian weddings into cinematic narratives that touch the heart. Our story began in India, where our passion for storytelling was ignited. This journey took us through advanced studies in the UK and the USA, each chapter refining our craft and deepening our connection to the art of visual storytelling.
                        <hr className='py-2 border-none' />
                        Our work is driven by a desire to capture the soul of each wedding. We focus on the genuine moments and intimate emotions that define your celebration. With a keen eye for detail and a commitment to using the finest equipment, we craft films that highlight the beauty of each moment with a subtle yet powerful elegance.
                        <hr className='py-2 border-none' />
                        In our experience spanning India, London, and New York, we’ve learned that beauty lies in simplicity. Our approach avoids distractions and instead, embraces the raw and heartfelt essence of your day. Every film we create is a tribute to the profound connections and joyous celebrations that make your story uniquely yours.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs
