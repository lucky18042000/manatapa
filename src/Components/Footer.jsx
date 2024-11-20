import Link from 'next/link'
import React from 'react'
import localFont from 'next/font/local';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});

function Footer() {
    return (
        <div className='bg-[#F6F1EB] lg:pt-[75px] z-50 pt-[35px] lg:pb-[39px] pb-[16px] lg:px-[92px] px-[24px] mt-[84px] lg:mt-[194px]'>
            <div className='flex w-full justify-between items-center'>
                <Link href={'/'}>
                <img className='w-[88px] h-[88px] lg:w-[133px] lg:h-[133px]' src="https://firebasestorage.googleapis.com/v0/b/mantapa-22cfd.appspot.com/o/Mantapa%20logo-01.png?alt=media&token=490eca97-fbe1-47de-85ab-af082178925e" alt="" srcset="" />
                </Link>
                <div className=' flex-col items-center lg:flex hidden'>
                    <p className='text-[#A80018] text-[16px]'>GET IN TOUCH</p>
                    <a href="mailto:support@mantapaweddings.com">
                        <h1 className={`mt-[24px] uppercase bg-[#FFFFFF] rounded-[26px] border-[#A8001880] text-[#A80018] font-semibold border border-dashed text-[42px] px-[56px] py-[25px] ${roslindaleFont.className}`}>
                            support@mantapaweddings.com
                        </h1>
                    </a>
                </div>
                <ul className='uppercase flex flex-col gap-[14px]'>
                    <Link href={'/Stills'} className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>STILLS</Link>
                    <Link href={'/Motions'} className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>Motion</Link>
                    <Link href={'/AboutUs'} className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>About</Link>
                    <Link href={'/Contact'} className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>contact</Link>
                </ul>
            </div>
            <div className=' flex-col items-center flex lg:hidden mt-[40px] w-full'>
                <p className='text-[#A80018] text-[16px]'>GET IN TOUCH</p>
                <div onClick={() => window.location.href = "mailto:support@mantapaweddings.com"}>
                    <h1 className={`mt-[14px] px-[8px] uppercase bg-[#FFFFFF] rounded-[10px] border-[#A8001880] text-[#A80018] font-semibold border border-dashed text-[14px] text-center w-full py-[15px] ${roslindaleFont.className}`}>
                        support@mantapaweddings.com
                    </h1>
                </div>

            </div>
            {/* <p className='w-full flex justify-center items-center gap-2 mt-[134px] text-[#A80018] text-[10px] leading-[11px] text-right'>DESIGN & DEV <span ><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#A80018" />
            </svg>
            </span>FIRST DAY STUDIOS</p> */}
        </div>
    )
}

export default Footer
