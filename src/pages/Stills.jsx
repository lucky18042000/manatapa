import React from 'react'
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});
function Stills() {
    return (
        <div>
            <Header />
            <div className='motionsection1'>
                <h1 className={`motionsection1Title ${roslindaleFont.className}`}>
                    Stills
                </h1>
                <p className={`motionsection1para ${roslindaleFont.className}`}>Mantapa, the brainchild of visionary individuals Arth and Priyansh Patel, transcends conventional wedding cinematography by intricately weaving the ephemeral splendor of Indian matrimonial rituals with the nuanced artistry of filmmaking and design.</p>
            </div>
            <Footer />
        </div>
    )
}

export default Stills
