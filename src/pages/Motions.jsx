import React, { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { db } from '@/lib/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale',
});

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
        gloss.style.opacity = `${mapNumberRange(distanceToCenter, 0, maxDistance, 0, 0.6)}`;
    };

    const handleMouseLeave = () => {
        cardContent.style = null;
        gloss.style.opacity = 0;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
    };
};

function Motions() {
    const [motionData, setMotionData] = useState([]);
    const titleRef = useRef(null);
    const paraRef = useRef(null);
    const motionApis = collection(db, 'motions');

    const fetchMotions = async () => {
        try {
            const querySnapshot = await getDocs(motionApis);
            const links = querySnapshot.docs
                .map(doc => doc.data())
                .sort((a, b) => a.id - b.id); // Sort by 'id' field as a number
                setMotionData(links);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchMotions();

        // Initialize the 3D effect on each card
        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach((cardEl) => initCard(cardEl));
    }, [motionData]);

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
    }, []);

    return (
        <div>
            <Header />
            <div className='motionsection1'>
                <h1 ref={titleRef} className={`motionsection1Title ${roslindaleFont.className}`}>
                    Motion
                </h1>
                <p ref={paraRef} className={`motionsection1para ${roslindaleFont.className}`}>
                    Each film we craft is a cinematic tapestry, weaving fleeting moments of love, culture, and emotion. We capture not just grand gestures, but the intimate pauses, the breath before the vow, the tear before the smile—transforming your story into a timeless masterpiece.
                </p>
            </div>
            <div>
                {motionData?.map((item, index) => (
                    <div key={index} className="homepagesection5">
                        <h1 className={`lg:text-[84.9px] text-[26px] text-[#A80018] leading-[28px] lg:leading-[98px] font-bold text-center motion-title-${index} ${roslindaleFont.className}`}>
                            {item?.title}
                        </h1>
                        <div className="card">
                            <div className="card__content">
                                <div className="card__gloss"></div>
                                <div className="homepagesection5motion 3dtiltingcardeffect">
                                    <div className='lg:w-[780px] lg:h-[480px] w-[309px] h-[265px] z-10'>
                                        <a href={item?.ytLink} target='_blank' className="motion-cms-play">
                                            <svg width="20%" viewBox="0 0 20 23" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z" fill="#FFF"></path>
                                            </svg>
                                        </a>
                                        <a href={item?.ytLink} target='_blank' className="motion-cms-playmobile">
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
                                        </a>
                                        <img className='rounded-[24px] w-[309px] h-[265px] lg:w-[780px] lg:h-[480px] object-cover' src={item?.CenterImage} alt="" />
                                    </div>
                                    <div className='lg:w-[247px] w-[117px] h-[77px] lg:h-[175px] absolute lg:top-[150px] lg:left-[15%] top-[40%] left-[0%] z-10'>
                                        <img className='lg:rounded-[24px] rounded-[10px]' src={item?.leftImage} alt="" />
                                    </div>
                                    <div className='lg:w-[223px] w-[111px] h-[77px] lg:h-[154px] absolute lg:top-[-10%] lg:right-[15%] top-[-15%] right-[0%] z-10'>
                                        <img className='lg:rounded-[24px] rounded-[10px] object-cover' src={item?.topRightCornerImage} alt="" />
                                    </div>
                                    <div className='lg:w-[223px] lg:h-[154px] w-[111px] h-[77px] absolute lg:bottom-[10%] lg:right-[20%] bottom-[-1%] right-[-0%] z-20'>
                                        <img className='lg:rounded-[24px] rounded-[10px]' src={item?.bottomImage} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Motions;
