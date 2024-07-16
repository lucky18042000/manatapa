import React from 'react'
import localFont from 'next/font/local';
import Header from '@/Components/Header';

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
            <div className='homepagesection2'>
                <div className='text-center'>
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>Preserving
                        <img className='homepagesection2img' src="https://s3-alpha-sig.figma.com/img/aad8/d46d/ea9ed141e5092da75c7ec0b31504bda3?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qzBMGHzs9XKNN9oS51emmd3sU7DuCtZyA6PIjD3yQfdl3DfeVNMPuNscbAl-J3RKOusUP-zBLTYWo-AYhlGXR3lZPfU6p3zfuSDXl27TSRpURslzqnen7foSTEycTubIXnnRLi-7wjCAbOIt-WfKGUmUyqZZZDM~UDG9oU91YDIpS7c6Z-LSX673q9MWD1nxi4bqSCeb64socH41KR6eFxlzq5e2BK6bTfMMYZuPPiMKv90v~FXR69M~aD8PbbYBfa-TumkjvB2dlZjtelz8PiUTbSkrzbxahAcZ3Zc00U75CbVqkf8Gk2IfaxJUwHpe9ky~VEPfn2n3B6oHcRCsUQ__" alt="" />
                        your moments into </p>
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>timeless memories
                        <img className='homepagesection2img' src="https://s3-alpha-sig.figma.com/img/aad8/d46d/ea9ed141e5092da75c7ec0b31504bda3?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qzBMGHzs9XKNN9oS51emmd3sU7DuCtZyA6PIjD3yQfdl3DfeVNMPuNscbAl-J3RKOusUP-zBLTYWo-AYhlGXR3lZPfU6p3zfuSDXl27TSRpURslzqnen7foSTEycTubIXnnRLi-7wjCAbOIt-WfKGUmUyqZZZDM~UDG9oU91YDIpS7c6Z-LSX673q9MWD1nxi4bqSCeb64socH41KR6eFxlzq5e2BK6bTfMMYZuPPiMKv90v~FXR69M~aD8PbbYBfa-TumkjvB2dlZjtelz8PiUTbSkrzbxahAcZ3Zc00U75CbVqkf8Gk2IfaxJUwHpe9ky~VEPfn2n3B6oHcRCsUQ__" alt="" />
                        through </p>
                    <br />
                    <p className={`homepagesection2text  ${roslindaleFont.className}`}>
                        <img className='homepagesection2img' src="https://s3-alpha-sig.figma.com/img/aad8/d46d/ea9ed141e5092da75c7ec0b31504bda3?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qzBMGHzs9XKNN9oS51emmd3sU7DuCtZyA6PIjD3yQfdl3DfeVNMPuNscbAl-J3RKOusUP-zBLTYWo-AYhlGXR3lZPfU6p3zfuSDXl27TSRpURslzqnen7foSTEycTubIXnnRLi-7wjCAbOIt-WfKGUmUyqZZZDM~UDG9oU91YDIpS7c6Z-LSX673q9MWD1nxi4bqSCeb64socH41KR6eFxlzq5e2BK6bTfMMYZuPPiMKv90v~FXR69M~aD8PbbYBfa-TumkjvB2dlZjtelz8PiUTbSkrzbxahAcZ3Zc00U75CbVqkf8Gk2IfaxJUwHpe9ky~VEPfn2n3B6oHcRCsUQ__" alt="" />
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
