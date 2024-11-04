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
    const [activeIndex, setActiveIndex] = useState(null); // Track the active index for fixed images

    const imgRefs = useRef([]); // Store references to each image
    const titleRef = useRef(null);
    const paraRef = useRef(null);
    const fetchStills = async () => {
        try {
            const querySnapshot = await getDocs(stillsdb);
            const links = querySnapshot.docs
                .map(doc => doc.data())
                .sort((a, b) => a.number - b.number); // Sorting by 'number' field
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

        const observerOptions = {
            root: null,
            threshold: 0.5,
        };

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
        // Intersection Observer to animate images on scroll in and out
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible'); // Add class when in view
                    } else {
                        entry.target.classList.remove('visible'); // Remove class when out of view (for reverse animation)
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 50% of the image is visible
        );

        // Observe each image
        imgRefs.current.forEach((imgRef) => {
            if (imgRef) {
                observer.observe(imgRef);
            }
        });

        // Cleanup observer on unmount
        return () => {
            imgRefs.current.forEach((imgRef) => {
                if (imgRef) {
                    observer.unobserve(imgRef);
                }
            });
        };
    }, [stills]);

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

            {/* Fixed div with brightness adjustment for corresponding image */}
            <div className='lg:fixed lg:block hidden -z-10 right-10 top-1/2 transform -translate-y-1/2 transition-all duration-300 overflow-y-auto max-h-[80vh]'>
                {stills?.map((item, ind) => (
                    <img
                        key={ind}
                        className={`w-[66px] h-[42px] rounded-md mb-4 transition-all duration-500 ${activeIndex === ind ? 'bright' : 'dim'
                            } ${ind % 2 === 0 ? 'lg:ml-5 ml-0' : 'lg:mr-5 ml-0'}`}
                        src={item?.img}
                        alt=""
                    />
                ))}
            </div>



            {/* Main image section with alignment */}
            <div className='flex flex-col lg:justify-center items-center lg:mt-[86px] mt-[50px]'>
                {stills?.map((item, ind) => (
                    <img
                        key={ind}
                        ref={(el) => (imgRefs.current[ind] = el)} // Store each image ref
                        data-index={ind} // Attach the index to each image for tracking
                        className={`still-image lg:w-[869px] w-[260px] rounded-[32px] mb-6 transition-all duration-1000 ease-out ${ind % 2 === 0 ? 'slide-in-left lg:ml-40 ml-0' : 'slide-in-right lg:mr-40 mr-0'
                            }`}
                        src={item?.img}
                        alt=""
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Stills;
