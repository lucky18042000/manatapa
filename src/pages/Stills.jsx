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
    const [visibleIndex, setVisibleIndex] = useState(null); // To track visible image index

    const imgRefs = useRef([]); // To store references to each image

    const fetchStills = async () => {
        try {
            const querySnapshot = await getDocs(stillsdb);
            const links = querySnapshot.docs.map(doc => doc.data());
            setStills(links);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchStills();
    }, []);

    useEffect(() => {
        // Intersection Observer to track which image is in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleIndex(index);
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the image is visible
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
                <h1 className={`stillsection1Title ${roslindaleFont.className}`}>
                    Stills
                </h1>
                <p className={`stillsection1para ${roslindaleFont.className}`}>
                In every photo, we find the invisible threads that bind love, culture, and memory. Our photography goes beyond documenting moments; it captures the essence of the day, turning raw emotions and rituals into timeless, artful expressions.
                </p>
            </div>

            {/* Fixed div with brightness adjustment for corresponding image */}
            <div className='fixed top-[50%] right-10 transition-all duration-300'>
                {stills?.map((item, ind) => (
                    <img
                        key={ind}
                        className={`w-[66px] h-[32px] mb-4 transition-all duration-500 ${ind % 2 === 0 ? 'ml-5' : 'mr-5'}`}
                        src={item?.img}
                        alt=""
                        style={{
                            filter: visibleIndex === ind ? 'brightness(1)' : 'brightness(0.5)', // Highlight the corresponding image
                        }}
                    />
                ))}
            </div>

            {/* Main image section with alignment */}
            <div className='flex flex-col justify-center items-center lg:mt-[86px]'>
                {stills?.map((item, ind) => (
                    <img
                        key={ind}
                        ref={(el) => (imgRefs.current[ind] = el)} // Store each image ref
                        data-index={ind} // Attach the index to each image for tracking
                        className={`w-[869px] rounded-[32px] mb-6 transition-all duration-500 ${ind % 2 === 0 ? 'ml-40' : 'mr-40'}`}
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
