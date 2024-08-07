import React, { useEffect, useState } from 'react'
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from './firebaseConfig';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});
function HomePage() {
    const [videoLinks, setVideoLinks] = useState([]);
    const [zoomoutImages, setZoomImages] = useState([])
    const db = getFirestore(); // Assuming you've initialized Firebase properly
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
    console.log(zoomoutImages);

    return (
        <div className=''>
            <Header />
            <div className="homepagesection1">
                <video
                    className='homepagesection1video'
                    poster={videoLinks.thumbnail}
                    src={videoLinks.video}
                    autoPlay
                    loop
                    muted
                >
                    Your browser does not support the video tag.
                </video>
                <p className={`homepagesection1text ${roslindaleFont.className}`}>NewYork  Based  Event<br /> Photographer  & <br />Filmmaker</p>
            </div>
            <div className='homepagesection2'>
                <div className='text-center'>
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>Preserving
                        <img className='homepagesection2img' src={zoomoutImages?.image} alt="" />
                        your moments into </p>
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>timeless memories
                        <img className='homepagesection2img' src={zoomoutImages?.image2} alt="" />
                        through </p>
                    <br />
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>
                        <img className='homepagesection2img !w-[118px] 1h-[90px]' src={zoomoutImages?.image3} alt="" />
                        our lens... </p>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <p className='w-[60%] text-[#A80018] capitalize text-[20px] lg:mt-[72px]'>Lorem ipsum dolor sit amet consectetur. Non mi quis sit tellus amet nunc sem. Blandit auctor eu ridiculus pharetra vel non consequat. Nunc a ut dui accumsan nunc at urna. Libero id aliquam duis egestas aliquet vitae.eu ridiculus pharetra vel non consequat. Nunc a ut dui accumsan nunc at urna. Libero id aliquam duis egestas aliquet vitae.</p>
                        <p className='material-bubble lg:mt-[50px]'>Read More...</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HomePage
