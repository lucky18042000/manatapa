import React from 'react'

function Footer() {
    return (
        <div className='bg-[#F6F1EB] lg:pt-[75px] pt-[35px] lg:pb-[39px] pb-[16px] lg:px-[92px] px-[24px] mt-[84px] lg:mt-[194px]'>
            <div className='flex w-full justify-between'>
                <img className='' src="/logo.png" alt="" srcset="" />
                <ul className='uppercase flex flex-col gap-[14px]'>
                    <li className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>STILLS</li>
                    <li className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>Motion</li>
                    <li className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>About</li>
                    <li className='text-right text-[#A80018] lg:text-[14px] text-[12px] leading-[11px]'>contact</li>
                </ul>
            </div>
            <p className='w-full flex justify-center items-center gap-2 mt-[134px] text-[#A80018] text-[10px] leading-[11px] text-right'>DESIGN & DEV <span ><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#A80018" />
            </svg>
            </span>FIRST DAY STUDIOS</p>
        </div>
    )
}

export default Footer
