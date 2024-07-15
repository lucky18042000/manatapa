import Header from '@/Components/Header'
import React from 'react'
import localFont from 'next/font/local';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});
function HomePage() {
    return (
        <div className=''>
            <Header />
            <div className="homepagesection1">
                <video
                    className='homepagesection1video'
                    src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/Teaser.mp4?alt=media&token=97687974-3321-46b1-b1dc-4de878bf0f3f"
                    autoPlay
                    loop
                    muted
                >
                    Your browser does not support the video tag.
                </video>
                <p className={`homepagesection1text ${roslindaleFont.className}`}>NewYork  Based  Event<br /> Photographer  & <br />Filmmaker</p>
            </div>
        </div>
    )
}

export default HomePage
