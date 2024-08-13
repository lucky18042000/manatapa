import React, { useEffect, useRef, useState } from 'react'
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { gsap } from "gsap";
import Footer from '@/Components/Footer';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});
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

    useEffect(() => {
        // Animate the video from the center to full size
        gsap.fromTo(videoRef.current,
            { scale: 0.5, transformOrigin: 'center center' },
            { scale: 1, duration: 1, ease: 'power2.out' }
        );
    }, []);
    return (
        <div className=''>
            <Header />
            <div className="homepagesection1">
                <video
                    ref={videoRef}
                    className='homepagesection1video border'
                    poster={videoLinks?.thumbnail}
                    src={videoLinks?.video}
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
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>Immortalizing
                        <img className='homepagesection2img' src={zoomoutImages?.image} alt="" />
                        the Profound Symphony </p>
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>of Love and
                        <img className='homepagesection2img' src={zoomoutImages?.image2} alt="" />
                        Symphony</p>
                    <br />
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>
                        in Each Frame.
                        <img className='homepagesection2img !w-[118px] 1h-[90px]' src={zoomoutImages?.image3} alt="" />
                    </p>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <p className='w-[60%] text-[#A80018] capitalize text-[20px] lg:mt-[72px]'>Mantapa is the heart's symphony, harmonizing the ephemeral beauty of tradition with the eternal essence of love. We sculpt memories with the delicate brushstrokes of innovation, infusing each frame with the soulful melody of cherished</p>
                        <p className='material-bubble lg:mt-[29px]'>Read More...</p>
                    </div>

                </div>

            </div>
            <div className='homepagesection3'>
                <div className='absolute left-[-100px] h-full flex items-center'>
                    <img className='w-[600px] h-[700px]  object-cover rotate-[-2deg] rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center w-[413px]' >
                    <h1 className={`text-[84.9px]  text-[#A80018] leading-[98px] font-bold text-center ${roslindaleFont.className}`}>Heartfelt Captures</h1>
                    <p className='material-bubble lg:mt-[61px] !w-max uppercase'>Visual archive</p>
                </div>
                <div className='absolute right-[-100px] h-full flex items-center'>
                    <img className='w-[600px] h-[700px]  object-cover rotate-[2deg] rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                </div>
            </div>
            <div className='homepagesection4'>
                <div className='absolute left-[-100px] h-full flex items-center'>
                    <img className='w-[600px] h-[700px]  object-cover rotate-[-2deg] rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center w-[413px]' >
                    <h1 className={`text-[84.9px]  text-[#A80018] leading-[98px] font-bold text-center ${roslindaleFont.className}`}>Mantapa's Visionaries</h1>
                    <p className='material-bubble lg:mt-[61px] !w-max uppercase'>About Us</p>
                </div>
                <div className='absolute right-[-100px] h-full flex items-center'>
                    <img className=' w-[600px] h-[700px]  object-cover rotate-[2deg] rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                </div>
            </div>
            <div className="homepagesection5">
                <h1 className={`text-[84.9px]  text-[#A80018] leading-[98px] font-bold text-center ${roslindaleFont.className}`}>
                    Films
                </h1>
                <div className='homepagesection5motion 3dtiltingcardeffect'>
                    <div className='w-[780px] h-[480px] z-10'>
                        <div class="motion-cms-play">
                            <svg width="20%" viewBox="0 0 20 23" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z" fill="#FFF"></path>
                            </svg>
                        </div>
                        <img className='rounded-[24px]' src="https://s3-alpha-sig.figma.com/img/86cb/3148/87b6774226a403b492c3ad21c6bd50f7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9VAbg8NIm7-jtVKmn9GRx1GPynUoBEbCiHmfEnHuZ4nOxAycLzS0YhwGGuOUVGzgxdG94kG-WTb8stuTYyf8s6hsqNVSDAWod4usk-XdNJydojkGVUwX5yw6kCDAmiQlhN1CORw3Mw8Gt5lpud-KPznf0cWnkomB1lSejjcfP7l88z0af~3691GH7OlaCAXK6qZ4p6i6TiYyzrF5WWBSvrgjUvzgSijyeIYn1EcTwvMpfIkXcQkUYVN1D~nm~FZljuuIOLvFvAhsBSEdR7aiwylYNwcF~IZYxKRyX2r4xKdnIubu~WJU5~QQspOpYXx7bK4RIy3LXEZQR-h6aupHw__" alt="" />
                    </div>
                    <div className='w-[247px] h-[175px] absolute top-[150px] left-[15%] z-10'>
                        <img className='rounded-[24px]' src='https://s3-alpha-sig.figma.com/img/61e0/0595/c7875b5b4a498b1a456aa039d8c0de29?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Txa5JHb1c0X8sxt-7j2PQHo8PychlW3mrdB7tenoXusGEQzMBMqKJzBOg5dd72L2THoNTIaHNGfubdfzJgYjsAkF2UbbsYXyPOH~-GBhhWV-2MmkJFZXMQO~PF5txUZBeBvjJzs2VJygg1o3U5vsyjGu9DGeEZheI8t3QyeyWHCe13uf1ngkmZQ0jLwbcbhOvEZqEMS0EmncL87Vm0Kbx-qJiqn2nU~vTzrOoqJJEL8OO-lGXeMbQ1gUdXYUeyhB4Dez7tlwOQx76tLw6ajutss3TU9kG5yEVtLMH0kUkHF0vUj0bHU4RImMRxNG7Isr8RvOFytQ02~yRyLODNX0zg__' alt="" />
                    </div>
                    <div className='w-[223px] h-[154px] absolute top-[-10%] right-[15%] -z-[10px]'>
                        <img className='rounded-[24px]' src='https://s3-alpha-sig.figma.com/img/61e0/0595/c7875b5b4a498b1a456aa039d8c0de29?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Txa5JHb1c0X8sxt-7j2PQHo8PychlW3mrdB7tenoXusGEQzMBMqKJzBOg5dd72L2THoNTIaHNGfubdfzJgYjsAkF2UbbsYXyPOH~-GBhhWV-2MmkJFZXMQO~PF5txUZBeBvjJzs2VJygg1o3U5vsyjGu9DGeEZheI8t3QyeyWHCe13uf1ngkmZQ0jLwbcbhOvEZqEMS0EmncL87Vm0Kbx-qJiqn2nU~vTzrOoqJJEL8OO-lGXeMbQ1gUdXYUeyhB4Dez7tlwOQx76tLw6ajutss3TU9kG5yEVtLMH0kUkHF0vUj0bHU4RImMRxNG7Isr8RvOFytQ02~yRyLODNX0zg__' alt="" />
                    </div>
                    <div className='w-[223px] h-[154px] absolute bottom-[-5%] right-[27%] z-10'>
                        <img className='rounded-[24px]' src='https://s3-alpha-sig.figma.com/img/61e0/0595/c7875b5b4a498b1a456aa039d8c0de29?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Txa5JHb1c0X8sxt-7j2PQHo8PychlW3mrdB7tenoXusGEQzMBMqKJzBOg5dd72L2THoNTIaHNGfubdfzJgYjsAkF2UbbsYXyPOH~-GBhhWV-2MmkJFZXMQO~PF5txUZBeBvjJzs2VJygg1o3U5vsyjGu9DGeEZheI8t3QyeyWHCe13uf1ngkmZQ0jLwbcbhOvEZqEMS0EmncL87Vm0Kbx-qJiqn2nU~vTzrOoqJJEL8OO-lGXeMbQ1gUdXYUeyhB4Dez7tlwOQx76tLw6ajutss3TU9kG5yEVtLMH0kUkHF0vUj0bHU4RImMRxNG7Isr8RvOFytQ02~yRyLODNX0zg__' alt="" />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <p className='material-bubble lg:mt-[29px]'>WATCH VIDEO</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default HomePage
