import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import React, { useEffect, useRef, useState } from 'react'
import localFont from 'next/font/local';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Ensure ScrollTrigger is imported from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

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
    const [aboutUs, setAboutUs] = useState([]);
    const aboutuspage = collection(db, 'homepageVideo');
    const titleRef = useRef(null);
    const paraRef = useRef(null);

    const fetchAboutUs = async () => {
        try {
            const querySnapshot = await getDocs(aboutuspage);
            const links = querySnapshot.docs.map(doc => doc.data());
            setAboutUs(links);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const stillsdb = collection(db, 'aboutus');
    const [stills, setStills] = useState([]);
    const imgRefs = useRef([]); // Store references to each image
    useEffect(() => {
        const animateText = (element) => {
            if (!element) return;

            // Split text into words
            const words = element.innerText.split(' ');
            element.innerHTML = ''; // Clear original content

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.innerText = word + ' ';
                span.classList.add('word'); // Add class for styling/animation
                span.style.animationDelay = `${index * 0.1}s`; // Delay for stagger effect
                element.appendChild(span);
            });
        };

        // Trigger animation for title and paragraph
        animateText(titleRef.current);
        animateText(paraRef.current);

        // Observe the elements to apply animations when they enter the viewport
        const observerOptions = {
            root: null,
            threshold: 0.5, // Trigger when 50% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate'); // Add class to start animation
                    observer.unobserve(entry.target); // Stop observing after animation starts
                }
            });
        }, observerOptions);

        if (titleRef.current) observer.observe(titleRef.current);
        if (paraRef.current) observer.observe(paraRef.current);

        // Cleanup observer on component unmount
        return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
            if (paraRef.current) observer.unobserve(paraRef.current);
        };
    }, [isMounted]);

    const fetchStills = async () => {
        try {
            const querySnapshot = await getDocs(stillsdb);
            const links = querySnapshot.docs.map(doc => doc.data());
            setStills(links);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    // Mark the component as mounted to ensure it's client-side only
    useEffect(() => {
        fetchAboutUs()
        fetchStills()
        setIsMounted(true);
        if (!isMounted) return; // Ensure this code runs only on the client side

        // const sections = gsap.utils.toArray('.section'); // Adjust this if you have specific class names for sections

        // sections.forEach(section => {
        //     gsap.fromTo(
        //         section,
        //         { y: 100 },
        //         {
        //             y: 0,
        //             duration: 10,
        //             scrollTrigger: {
        //                 trigger: section,
        //                 start: 'top 50%',
        //                 end: 'bottom 50%',
        //                 scrub: true,
        //                 onEnter: () => gsap.to(section, { y: 0 }),
        //                 onLeaveBack: () => gsap.to(section, { y: -100 }),
        //             },
        //         }
        //     );
        // });

    }, [isMounted]);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const scrollSpeed = 2; // Adjust this value to change the scroll speed
        let scrollAmount = 0;

        // Duplicate the stills to create an infinite scroll illusion
        const duplicatedStills = [...stills, ...stills];

        const autoScroll = () => {
            if (scrollContainer) {
                scrollAmount += scrollSpeed;
                scrollContainer.scrollLeft = scrollAmount;

                // If the scroll reaches the halfway point (original length), reset it to the start
                if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                    scrollAmount = 0; // Reset scroll position
                }

                requestAnimationFrame(autoScroll);
            }
        };

        // Start the auto-scroll
        autoScroll();

        return () => {
            // Cleanup if necessary
            cancelAnimationFrame(autoScroll);
        };
    }, [isMounted]);
    useEffect(() => {
        if (!isMounted) return;

        // Helper function to calculate scroll progress
        const calculateScrollProgress = (element) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate the scroll progress as a value between 0 and 1
            const scrollProgress = Math.min(Math.max((windowHeight - elementTop) / (windowHeight + elementHeight), 0), 1);
            return scrollProgress;
        };

        // Adjust thresholds for mobile vs laptop
        const isMobile = window.innerWidth <= 768;
        const threshold = isMobile ? 0.05 : 0.2;  // Trigger earlier on mobile (10%) and normal on larger screens (20%)

        // Scroll-triggered animation for left and right images
        const leftImages = document.querySelectorAll('.left-image');
        const rightImages = document.querySelectorAll('.right-image');

        // Function to handle scrolling and animate based on progress
        const handleScroll = () => {
            leftImages.forEach(image => {
                const scrollProgress = calculateScrollProgress(image);

                // Animate the left image based on scroll progress
                image.style.transform = isMobile
                    ? `translateX(${(0.01 - scrollProgress) * 300}px)`
                    : `translateX(${(0.5 - scrollProgress) * 200}px)`;

                // Set opacity: if scrollProgress >= threshold, set opacity to 1
                image.style.opacity = scrollProgress >= threshold ? 1 : scrollProgress / threshold;
            });

            rightImages.forEach(image => {
                const scrollProgress = calculateScrollProgress(image);

                // Animate the right image based on scroll progress
                image.style.transform = isMobile
                    ? `translateX(${(scrollProgress - 0.01) * 300}px)`
                    : `translateX(${(scrollProgress - 0.5) * 200}px)`;

                // Set opacity: if scrollProgress >= threshold, set opacity to 1
                image.style.opacity = scrollProgress >= threshold ? 1 : scrollProgress / threshold;
            });
        };

        // Debounce scroll events for smoother performance
        let debounceTimeout;
        const debouncedScroll = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                handleScroll();
            }, 10); // Adjust the delay if needed (10ms is usually smooth)
        };

        // Add the scroll event listener
        window.addEventListener('scroll', debouncedScroll);

        // Initial call to set the positions correctly
        handleScroll();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
            clearTimeout(debounceTimeout);
        };
    }, [isMounted]);



    // Ensure component doesn't render server-side
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <Header />
            <div className='aboutussection1 section'>
                <h1 ref={titleRef} className={`aboutussection1Title ${roslindaleFont.className}`}>
                    About Us
                </h1>

                <video
                    className='aboutussection1Image'
                    src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/Laptop%20About%20us.mp4?alt=media&token=b66a2247-2029-4ae6-b843-9bc80803d694"
                    alt=""
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <p ref={paraRef} className={`aboutussection1para ${roslindaleFont.className}`}>Mantapa, the brainchild of visionary individuals Arth and Priyansh Patel, transcends conventional wedding cinematography by intricately weaving the ephemeral splendor of Indian matrimonial rituals with the nuanced artistry of filmmaking and design.</p>

            </div>
            <div className='aboutussection2 rotate-[-2deg] overflow-hidden '>
                <div
                    ref={scrollContainerRef}
                    className='scroll-container flex gap-2  overflow-hidden '
                    style={{
                        scrollBehavior: 'smooth',
                        overflow: 'hidden', // Hide scrollbar
                    }}
                >
                    {stills && stills.length > 0 ? (
                        [...stills, ...stills].map((item, index) => (
                            <img
                                key={index}
                                className='lg:w-[360px] w-[269px] h-[179px] lg:h-[256px]  lg:rounded-[12px] bg-[#E6DADB] '
                                src={item?.img}
                                alt=""
                            />
                        ))
                    ) : null}
                </div>
            </div>
            <div className='homepagesection4'>
                <div className="absolute z-10 lg:left-[-100px] left-[30px] h-full flex items-center">
                    <img
                        className="left-image bg-[#DBCBD1] lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[-2.8deg] rounded-[32px] -z-10"
                        src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/Container%20(2).png?alt=media&token=708901eb-464a-4273-b517-f469d3f02b29'
                        alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center w-[413px]' >
                    <p className='pb-[42px] !w-max uppercase inline-flex items-center gap-3 font-medium lg:text-[20px] text-[10px]  text-[#A80018]'>
                        NEW YORK
                        <span>
                            <svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27 6.5L0 13L5.90104e-07 0L27 6.5Z" fill="#A80018" />
                            </svg>

                        </span>
                        LONDON
                    </p>

                    <h1 className={`lg:text-[84.9px] text-[26px]  text-[#A80018] lg:leading-[98px] leading-[24px] font-bold text-center ${roslindaleFont.className}`}>Mantapa's  <br className='lg:hidden block ' /> Visionaries</h1>
                    {/* <p className='material-bubble lg:mt-[61px] !w-max uppercase'>Visual archive</p>
                    <p className='material-bubble1 mt-[24px] !w-max uppercase'>Visual archive</p> */}
                    <div className='flex lg:flex-row flex-col items-center lg:gap-5 gap-2 lg:mt-[61px] mt-[20px]'>
                        <div className='flex flex-col items-center'>
                            <p className='lg:text-[14px] text-[#A80018] text-[10px]'>Boston</p>
                            <p className='lg:text-[18px] font-semibold text-[#A80018] text-[12px]'>Krushesh patel</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='lg:text-[14px] text-[#A80018] text-[10px]'>Atlanta</p>
                            <p className='lg:text-[18px] font-semibold text-[#A80018] text-[12px]'>Sunny Patel</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='lg:text-[14px] text-[#A80018] text-[10px]'>Missouri</p>
                            <p className='lg:text-[18px] font-semibold text-[#A80018] text-[12px]'>Indu Patel</p>
                        </div>
                    </div>
                </div>
                <div className="absolute z-10 lg:right-[-100px] right-[15px] h-full flex items-center">
                    <img
                        className="right-image bg-[#DBCBD1] lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[2.8deg] rounded-[32px] -z-10"
                        src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3ccc6c2ce83328c9b669_Header20Right-p-1080.jpg.png?alt=media&token=228c7852-cec5-4a4a-a6c8-9ba408fd0582"
                        alt="Right Image"
                    />
                </div>
            </div>
            <div className='aboutussection3 '>
                <div className="absolute z-10 lg:left-[-100px] left-[30px] h-full flex items-center">
                    <img
                        className="left-image lg:w-[600px] bg-[#E6DADB] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[-2.8deg] rounded-[32px] -z-10"
                        src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/6.png?alt=media&token=02a0ca4b-e024-4eec-890f-b60abac9990c'
                        alt="" />
                </div>
                <div className='-z-10 flex flex-col justify-center items-center w-[413px]' >
                    <p className='pb-[42px] lg:!w-max uppercase inline-flex items-center gap-3 font-medium text-[20px]  text-[#A80018]'>
                        NEW YORK
                        <span><svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 6.5L0 13L5.90104e-07 0L27 6.5Z" fill="#A80018" />
                        </svg>
                        </span>
                        LONDON
                    </p>
                    <h1 className={`lg:text-[84.9px] text-[26px]  text-[#A80018] lg:leading-[98px] leading-[24px] font-bold text-center ${roslindaleFont.className}`}>Where we Work</h1>
                    <p className='lg:text-[18px] text-[14px]  text-[#A80018] leading-[19px] lg:leading-[29px] lg:mt-[61px] w-[254px] lg:w-full text-center capitalize'>From the bustling streets of New York to the historic charm of London, we are across the USA and UK, soon to embrace the vibrant and diverse landscapes of India.</p>
                </div>
                <div className="absolute z-10 lg:right-[-100px] right-[15px] h-full flex items-center">
                    <img
                        className="right-image lg:w-[600px] bg-[#E6DADB] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[2.8deg] rounded-[32px] -z-10"
                        src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/7.png?alt=media&token=f91f083f-3038-4178-8c31-37d3968c4e25"
                        alt="Right Image"
                    />
                </div>
            </div>
            <div className='aboutussection4 '>
                <h1 className={`text-[36px] lg:text-[84.9px] text-center text-[#A80018] leading-[98px] font-bold ${roslindaleFont.className}`}>Nature of Mantapa</h1>
                <div className='flex lg:flex-row flex-col gap-[65px] mt-[54px]'>
                    {/* <img className='w-[256px] lg:w-[600px] h-[290px] lg:h-[700px]  object-cover rounded-[32px] -z-10' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/dsdsds.png?alt=media&token=4a8804fb-428b-42c1-bf14-c2feeb1c64f7' alt="" /> */}
                    <p className={` lg:w-full text-center text-[18px] text-[#A80018] leading-[29px] lg:mt-[61px] capitalize ${roslindaleFont.className}`}>
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
