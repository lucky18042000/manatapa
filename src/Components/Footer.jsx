import React from 'react'

function Footer() {
    return (
        <div className='bg-[#F6F1EB] pt-[75px] pb-[39px] px-[92px] mt-[194px]'>
            <div className='flex w-full justify-between'>
                <img src="/logo.png" alt="" srcset="" />
                <ul className='uppercase flex flex-col gap-[14px]'>
                    <li className='text-right text-[#A80018] text-[14px] leading-[11px]'>STILLS</li>
                    <li className='text-right text-[#A80018] text-[14px] leading-[11px]'>Motion</li>
                    <li className='text-right text-[#A80018] text-[14px] leading-[11px]'>About</li>
                    <li className='text-right text-[#A80018] text-[14px] leading-[11px]'>contact</li>
                </ul>
            </div>
            <p className='w-full flex justify-end items-center gap-2 mt-[134px] text-[#A80018] text-[10px] leading-[11px] text-right'>DESIGN & DEV <span ><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#A80018" />
            </svg>
            </span>FIRST DAY STUDIOS</p>
        </div>
    )
}

export default Footer
