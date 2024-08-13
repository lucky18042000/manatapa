import Link from 'next/link';
import React from 'react';

function Header() {
    return (
        <div className=' blurinheader lg:px-[64px] lg:py-[6px] px-[22px] py-[6px] '>
            <div className='flex justify-between items-center'>
                <div className='lg:hidden md:hidden block'>
                    <img className='w-[39px] h-[42px] ' src="/logo.png" alt="mantapalogo" />
                </div>
                <div className='flex gap-[10px]'>
                    <p className='material-bubble '>STILLS</p>
                    <p className='material-bubble'>MOTION</p>
                </div>
                <Link href={'/'} className='hidden md:block lg:block'>
                    <img className='w-[52px] h-[52px] ' src="/logo.png" alt="mantapalogo" />
                </Link>
                <div className='flex gap-[10px]'>
                    <Link href={'/AboutUs'} className='material-bubble '>ABOUT</Link>
                    <p className='material-bubble1'>CONTACT</p>
                </div>
                <div className='lg:hidden md:hidden block'>
                    <p className='material-bubble1 '>MENU</p>
                </div>
            </div>
            <div className='lg:hidden md:hidden hidden absolute  bg-white rounded-[23px] w-full'>
                <p className='text-center'>Stills</p>
                <p className='text-center'>Motion</p>
                <p className='text-center'>About</p>
                <p className='text-center'>Contact</p>
            </div>
        </div>
    );
}

export default Header;
