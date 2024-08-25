import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import React from 'react'
import localFont from 'next/font/local';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});
function AboutUs() {
    return (
        <div>
            <Header />
            <div className='aboutussection1'>
                <h1 className={`aboutussection1Title ${roslindaleFont.className}`}>
                    About Us
                </h1>
                <img className='aboutussection1Image' src="" alt="" />
                <p className={`aboutussection1para ${roslindaleFont.className}`}>Mantapa, the brainchild of visionary individuals Arth and Priyansh Patel, transcends conventional wedding cinematography by intricately weaving the ephemeral splendor of Indian matrimonial rituals with the nuanced artistry of filmmaking and design.</p>
            </div>
            <div className='aboutussection2'>
                <img src="" alt="" srcset="" />
            </div>
            <div className='aboutussection3'>
                <div className='absolute left-[-100px] h-full flex items-center'>
                    <img className='w-[600px] h-[700px]  object-cover rotate-[-2deg] rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center w-[413px]' >
                    <h1 className={`text-[84.9px]  text-[#A80018] leading-[98px] font-bold text-center ${roslindaleFont.className}`}>Where we Work</h1>
                    <p className='text-[18px]  text-[#A80018] leading-[29px] lg:mt-[61px] w-full text-center capitalize'>From the bustling streets of New York to the historic charm of London, we are across the USA and UK, soon to embrace the vibrant and diverse landscapes of India.</p>
                </div>
                <div className='absolute right-[-100px] h-full flex items-center'>
                    <img className=' w-[600px] h-[700px]  object-cover rotate-[2deg] rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                </div>
            </div>
            <div className='aboutussection4'>
                <h1 className={`text-[84.9px]  text-[#A80018] leading-[98px] font-bold ${roslindaleFont.className}`}>Nature of Mantapa</h1>
                <div className='flex gap-[65px] mt-[54px]'>
                    <img className='w-[600px] h-[700px]  object-cover rounded-[32px] -z-10' src='https://s3-alpha-sig.figma.com/img/391a/0753/75497c545d7e5af511caf2a98ffe8dbb?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=REZZqH-tavKR3cYd4DrTHgr43OguK1MahrcdT-02GvXHmoXMjGyo5cOjXC0b5LTLHfRY3quUqJ99hpdCkYj~RcKPbBY220E8ZpShjNKZ5Gjiq1pN3v7ABZSd3-OhDJb2R8tZmi9MJxFy0Nsoh8BNquL~jh03MdLcpHkJp4glEmuX4GLxxyn2ijO~-4nPkegHQyXqB49Fx4s72DRZdoW61WOCjHMNL9f85Dpnr1qzbS2yuTjowSxQM~WTYuMXGWB4KCaKFVh27XCZQNxyuM-canXEOeFgnyPpPG6QLoOQHr4hiQJFl6KkIFU9fEHQSo0blmpkwswOiN4GunjsGLT17Q__' alt="" />
                    <p className=' w-[712px] text-[18px] text-[#A80018] leading-[29px] lg:mt-[61px] capitalize'>
                        Mantapa is the heart's symphony, harmonizing the ephemeral beauty of tradition with the eternal essence of love. We sculpt memories with the delicate brushstrokes of innovation, infusing each frame with the soulful melody of cherished moments.
                        <hr className='my-2 border-none' />
                        Mantapa is the heart's symphony, harmonizing the ephemeral beauty of tradition with the eternal essence of love. We sculpt memories with the delicate brushstrokes of innovati
                        <hr className='my-2 border-none' />
                        Mantapa is the heart's symphony, harmonizing the ephemeral beauty of tradition with the eternal essence of love. We sculpt memories with the delicate brushstrokes of innovati
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs
