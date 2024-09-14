import React, { useEffect, useRef, useState } from 'react'
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { gsap } from "gsap";
import Footer from '@/Components/Footer';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
    const [videoLinks, setVideoLinks] = useState([]);
    const [zoomoutImages, setZoomImages] = useState([])
    const homepageVideoCollectionRef = collection(db, 'homepageVideo');
    const homepageZoomOutImagesCollectionRef = collection(db, 'homepageZoomOutImages');

    const fetchVideoData = async () => {
        try {
            const querySnapshot = await getDocs(homepageVideoCollectionRef);
            const links = querySnapshot.docs.map(doc => doc.data());
            setVideoLinks(links[0]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const fetchZoomOutImages = async () => {
        try {
            const querySnapshot = await getDocs(homepageZoomOutImagesCollectionRef);
            const links = querySnapshot.docs.map(doc => doc.data());
            setZoomImages(links[0]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    useEffect(() => {
        fetchVideoData();
        fetchZoomOutImages();
    }, []);
    const videoRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // Animate the video from the center to full size
        gsap.fromTo(videoRef.current,
            { scale: 0.5, transformOrigin: 'center center' },
            { scale: 1, duration: 1, ease: 'power2.out' }
        );
    }, []);
    useEffect(() => {
        // Apply the ScrambleText animation to the text element
        gsap.fromTo(
          textRef.current,
          { opacity: 0 }, // Initial state
          {
            opacity: 1, // End state
            duration: 2,
            scrambleText: {
              text: "Your, Majestic Matrimonial Miracles.", // The target text
              chars: "lowerCase", // Scramble effect with lowercase letters
              speed: 0.6, // Speed of the scramble
            },
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%', // Start when the text is 80% into the viewport
              end: 'bottom 50%',
              scrub: 1, // Smooth scrubbing effect
            },
          }
        );
      }, []);
    const main = useRef(); // Reference for the container element


    useGSAP(() => {
        // Select all left-image elements and apply the animation
        const leftImages = gsap.utils.toArray('.left-image');
        leftImages.forEach((leftImage) => {
            gsap.fromTo(
                leftImage,
                { x: '50%', opacity: 0 }, // Start from the center and opacity 0
                {
                    x: '-100px', // Move to the left
                    opacity: 1, // Fade in
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: leftImage,
                        start: 'top 50%', // Start when the top of the image hits 50% of the viewport
                        end: 'bottom 50%', // End when the bottom of the image hits 50% of the viewport
                        scrub: true, // Smooth scrubbing based on scroll
                    },
                }
            );
        });

        // Select all right-image elements and apply the animation
        const rightImages = gsap.utils.toArray('.right-image');
        rightImages.forEach((rightImage) => {
            gsap.fromTo(
                rightImage,
                { x: '-50%', opacity: 0 }, // Start from the center and opacity 0
                {
                    x: '100px', // Move to the right
                    opacity: 1, // Fade in
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: rightImage,
                        start: 'top 50%', // Start when the top of the image hits 50% of the viewport
                        end: 'bottom 50%', // End when the bottom of the image hits 50% of the viewport
                        scrub: true, // Smooth scrubbing based on scroll
                        toggleActions: 'play reverse play reverse', // Play when scrolling down, reverse when scrolling up
                        markers: false, // Disable markers
                    },
                }
            );
        });
    }, { scope: main });

    const mapNumberRange = (n, a, b, c, d) => {
        return ((n - a) * (d - c)) / (b - a) + c;
    };
    const initCard = (card) => {
        const cardContent = card.querySelector('.card__content');
        const gloss = card.querySelector('.card__gloss');

        requestAnimationFrame(() => {
            gloss.classList.add('card__gloss--animatable');
        });

        const handleMouseMove = (e) => {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const cardRect = card.getBoundingClientRect();

            const halfWidth = cardRect.width / 2;
            const halfHeight = cardRect.height / 2;

            const cardCenterX = cardRect.left + halfWidth;
            const cardCenterY = cardRect.top + halfHeight;

            const deltaX = pointerX - cardCenterX;
            const deltaY = pointerY - cardCenterY;

            const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const maxDistance = Math.max(halfWidth, halfHeight);

            const degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 10);

            const rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1);
            const ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1);

            cardContent.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`;

            gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`;

            gloss.style.opacity = `${mapNumberRange(
                distanceToCenter,
                0,
                maxDistance,
                0,
                0.6
            )}`;
        };

        const handleMouseLeave = () => {
            cardContent.style = null;
            gloss.style.opacity = 0;
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    };

    useEffect(() => {
        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach((cardEl) => initCard(cardEl));
    }, []);
    return (
        <div className=''>
            <Header />
            <div className="homepagesection1">
                <video
                    ref={videoRef}
                    className="homepagesection1video border"
                    poster={videoLinks?.thumbnail}
                    src={videoLinks?.video}
                    autoPlay
                    loop
                    muted
                >
                    Your browser does not support the video tag.
                </video>
                <p ref={textRef} className={`homepagesection1text uppercase ${roslindaleFont.className}`}>
                    Your, Majestic <br /> Matrimonial Miracles.
                </p>
            </div>
            <div className='homepagesection2'>
                <div className='text-center'>
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>Immortalizing
                        <img className='homepagesection2img' src={zoomoutImages?.image} alt="" />
                        the Profound</p>
                    <br />
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>Symphony of Love and
                        <img className='homepagesection2img' src={zoomoutImages?.image2} alt="" />
                    </p>
                    <br />
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>
                        Legacy in Each Frame.
                        <img className='homepagesection2img hidden lg:block lg:!w-[118px] lg:h-[90px]' src={zoomoutImages?.image3} alt="" />
                    </p>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <p className='lg:w-[60%] w-[90%]  text-[#A80018] capitalize text-[16px] lg:text-[20px] mt-[24px] lg:mt-[72px]'>Mantapa is the heart's symphony, harmonizing the ephemeral beauty of tradition with the eternal essence of love. We sculpt memories with the delicate brushstrokes of innovation, infusing each frame with the soulful melody of cherished</p>
                        <p className='material-bubble lg:mt-[29px]'>Read More...</p>
                        <p className='material-bubble1 mt-[31px]'>Read More...</p>
                    </div>
                </div>
            </div>
            <div className='' ref={main}>
                <div className="homepagesection3" >
                    <div className="absolute lg:left-[-100px] left-[-100px] h-full flex items-center">
                        <img
                            className="left-image lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[-2.8deg] rounded-[32px] -z-10"
                            src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612"
                            alt="Left Image"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center w-[413px]">
                        <h1
                            className={`lg:text-[84.9px] text-[26px] text-[#A80018] lg:leading-[98px] leading-[24px] font-bold text-center ${roslindaleFont.className}`}
                        >
                            Heartfelt <br className="lg:hidden block" /> Captures
                        </h1>
                        <p className="material-bubble lg:mt-[61px] !w-max uppercase">
                            Visual archive
                        </p>
                        <p className="material-bubble1 mt-[24px] !w-max uppercase">
                            Visual archive
                        </p>
                    </div>
                    <div className="absolute lg:right-[-100px] right-[-115px] h-full flex items-center">
                        <img
                            className="right-image lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[2.8deg] rounded-[32px] -z-10"
                            src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612"
                            alt="Right Image"
                        />
                    </div>
                </div>
                <div className='homepagesection4'>
                    <div className='absolute lg:left-[-100px] left-[-100px] h-full flex items-center'>
                        <img
                            className="left-image lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[-2.8deg] rounded-[32px] -z-10"
                            src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612'
                            alt="" />
                    </div>
                    <div className=' flex flex-col justify-center items-center w-[413px]' >
                        <h1 className={`lg:text-[84.9px] text-[26px]  text-[#A80018] lg:leading-[98px] leading-[24px] font-bold text-center ${roslindaleFont.className}`}>Mantapa's  <br className='lg:hidden block ' /> Visionaries</h1>
                        <p className='material-bubble lg:mt-[61px] !w-max uppercase'>Visual archive</p>
                        <p className='material-bubble1 mt-[24px] !w-max uppercase'>Visual archive</p>
                    </div>
                    <div className="absolute lg:right-[-100px] right-[-115px] h-full flex items-center">
                        <img
                            className="right-image lg:w-[600px] lg:h-[700px] w-[216px] h-[347px] object-cover rotate-[2.8deg] rounded-[32px] -z-10"
                            src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/647e3cc83822b06137a15c00_Header20Left-p-1080.jpg.png?alt=media&token=6ab2cded-a4c7-4a21-9602-e33866957612"
                            alt="Right Image"
                        />
                    </div>
                </div>
            </div>
            <div className="homepagesection5">
                <h1 className={`lg:text-[84.9px]  text-[26px] text-[#A80018] leading-[28px] lg:leading-[98px] font-bold text-center ${roslindaleFont.className}`}>
                    Films
                </h1>

                <div class="card">
                    <div class="card__content">
                        <div class="card__gloss"></div>
                        <div className='homepagesection5motion 3dtiltingcardeffect'>
                            <div className='lg:w-[780px] lg:h-[480px] w-[349px] h-[295px] z-10'>
                                <div className="motion-cms-play">
                                    <svg width="20%" viewBox="0 0 20 23" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z" fill="#FFF"></path>
                                    </svg>
                                </div>
                                <div className="motion-cms-playmobile">
                                    <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_b_491_185)">
                                            <rect width="52.53" height="52.7758" rx="26.265" fill="#0E1012" fill-opacity="0.5" />
                                            <path d="M32.0703 26.3968C32.7736 26.8031 32.7736 27.8189 32.0703 28.2252L23.7622 33.0249C23.0589 33.4312 22.1797 32.9233 22.1797 32.1107L22.1797 22.5113C22.1797 21.6987 23.0589 21.1908 23.7622 21.5971L32.0703 26.3968Z" fill="#F3F6FA" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_b_491_185" x="-5.99999" y="-5.99999" width="64.5293" height="64.7754" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
                                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_491_185" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_491_185" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>

                                </div>
                                <img className='rounded-[24px] w-[349px] h-[295px] lg:w-[780px] lg:h-[480px] object-cover' src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/636012bd2248e8047dc4d4e4_amelia-cover-p-1080.jpg.png?alt=media&token=08b40ad0-8dca-40b0-91f3-97bd3e4bb346" alt="" />
                            </div>
                            <div className='w-[247px] h-[175px] absolute top-[150px] left-[15%] z-10'>
                                <img className='rounded-[24px]' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/636012bd2248e8047dc4d4e4_amelia-cover-p-1080.jpg.png?alt=media&token=08b40ad0-8dca-40b0-91f3-97bd3e4bb346' alt="" />
                            </div>
                            <div className='lg:w-[223px] w-[111px] h-[77px] lg:h-[154px] absolute top-[-10%] right-[15%] -z-[10px]'>
                                <img className='rounded-[24px] object-cover' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/638dbe66153918a719590b8a_amelia-small-1%2520(1).jpg.png?alt=media&token=cd4b5333-d45d-435c-bede-c895713a40aa' alt="" />
                            </div>
                            <div className='lg:w-[223px] lg:h-[154px] absolute bottom-[-5%] right-[27%] z-10'>
                                <img className='rounded-[24px]' src='https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/638dbe6fdd44deb587cacf33_amelia-small-3%2520(1).jpg.png?alt=media&token=295a4906-2dc5-4ec0-82d6-934fc5cdd97f' alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col justify-center items-center'>
                    <p className='material-bubble lg:mt-[29px]'>WATCH VIDEO</p>
                    <p className='material-bubble1 mt-[42px]'>WATCH VIDEO</p>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
