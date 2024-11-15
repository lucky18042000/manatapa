import React, { useEffect, useState, useRef } from 'react';
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});

function Stills() {
    const stillsdb = collection(db, 'stills');
    const [stills, setStills] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loadedIndexes, setLoadedIndexes] = useState([]);

    const imgRefs = useRef([]); // Main images
    const fixedImgRefs = useRef([]); // Fixed sidebar images
    const fixedContainerRef = useRef(null); // Container of fixed images
    const titleRef = useRef(null);
    const paraRef = useRef(null);

    const fetchStills = async () => {
        try {
            const querySnapshot = await getDocs(stillsdb);
            const links = querySnapshot.docs
                .map(doc => doc.data())
                .sort((a, b) => a.id - b.id); // Sort by 'id' field as a number
            setStills(links);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    useEffect(() => {
        fetchStills();
    }, []);

    useEffect(() => {
        const animateText = (element) => {
            if (!element) return;

            const words = element.innerText.split(' ');
            element.innerHTML = '';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.innerText = word + ' ';
                span.classList.add('word');
                span.style.animationDelay = `${index * 0.1}s`;
                element.appendChild(span);
            });
        };

        animateText(titleRef.current);
        animateText(paraRef.current);

        const observerOptions = { root: null, threshold: 0.5 };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (titleRef.current) observer.observe(titleRef.current);
        if (paraRef.current) observer.observe(paraRef.current);

        return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
            if (paraRef.current) observer.unobserve(paraRef.current);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = entry.target.getAttribute("data-index");

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        setActiveIndex(Number(index));

                        // Mark image as loaded for lazy loading
                        setLoadedIndexes((prev) => [...new Set([...prev, Number(index)])]);
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            { threshold: 0.1 } // Trigger animation when 10% of the image is visible
        );

        imgRefs.current.forEach((imgRef) => {
            if (imgRef) observer.observe(imgRef);
        });

        return () => {
            imgRefs.current.forEach((imgRef) => {
                if (imgRef) observer.unobserve(imgRef);
            });
        };
    }, [stills]);

    useEffect(() => {
        if (activeIndex !== null && fixedImgRefs.current[activeIndex]) {
            const fixedContainer = fixedContainerRef.current;
            const activeImage = fixedImgRefs.current[activeIndex];
            const containerRect = fixedContainer.getBoundingClientRect();
            const activeRect = activeImage.getBoundingClientRect();

            // Check if the active image is close to top or bottom of the visible container
            if (activeRect.top < containerRect.top + 20) {
                fixedContainer.scrollTop -= containerRect.top - activeRect.top + 20;
            } else if (activeRect.bottom > containerRect.bottom - 20) {
                fixedContainer.scrollTop += activeRect.bottom - containerRect.bottom + 20;
            }
        }
    }, [activeIndex]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const updateVideoSource = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Set initial video source
        updateVideoSource();

        // Update video source on window resize
        window.addEventListener('resize', updateVideoSource);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', updateVideoSource);
    }, []);

    return (
        <div>
            <Header />
            <div className='stillsection1'>
                <h1 ref={titleRef} className={`stillsection1Title ${roslindaleFont.className}`}>
                    Stills
                </h1>
                <p ref={paraRef} className={`stillsection1para ${roslindaleFont.className}`}>
                    In every photo, we find the invisible threads that bind love, culture, and memory. Our photography goes beyond documenting moments; it captures the essence of the day, turning raw emotions and rituals into timeless, artful expressions.
                </p>
            </div>

            {!isMobile && (
                <div
                    ref={fixedContainerRef}
                    className='lg:fixed lg:-z-10 lg:right-10 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:transition-all lg:duration-300 lg:overflow-y-hidden max-h-[80vh]'
                >
                    {stills?.map((item, ind) => (
                        <img
                            key={ind}
                            ref={(el) => (fixedImgRefs.current[ind] = el)}
                            className={`lg:w-[66px] lg:h-[42px] lg:rounded-md lg:mb-4 lg:transition-all lg:duration-500 ${activeIndex === ind ? 'bright' : 'dim'
                                } ${ind % 2 === 0 ? 'lg:ml-5 ml-0' : 'lg:mr-5 ml-0'}`}
                            src={item?.img}
                            alt=""
                        />
                    ))}
                </div>
            )}

            <div className="flex flex-col lg:justify-center items-center lg:mt-[86px] mt-[50px]">
                {stills?.map((item, ind) => (
                    <img
                        key={ind}
                        ref={(el) => (imgRefs.current[ind] = el)} // Store each image ref
                        data-index={ind} // Attach the index to each image for tracking
                        loading="lazy" // Enable browser-level lazy loading
                        className={`still-image lg:w-[869px] w-[260px] rounded-[32px] mb-6 ${ind % 2 === 0 ? "slide-in-left lg:ml-40 ml-0" : "slide-in-right lg:mr-40 mr-0"
                            }`}
                        src={loadedIndexes.includes(ind) ? item?.img : ""} // Load image dynamically
                        alt=""
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Stills;
