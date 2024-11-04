import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [videoSrc, setVideoSrc] = useState(null); // Start as null to avoid black screen

    useEffect(() => {
        const updateVideoSource = () => {
            if (window.innerWidth < 768) {
                setVideoSrc('/Mobilepreloader.mp4');
            } else {
                setVideoSrc('/preloader.webm');
            }
        };

        // Set initial video source
        updateVideoSource();

        // Update video source on window resize
        window.addEventListener('resize', updateVideoSource);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', updateVideoSource);
    }, []);

    console.log(videoSrc, 'videoSrc'); // Log to ensure the correct source is set

    return (
        <div className="preloader">
            {videoSrc && ( // Render video only if videoSrc is set
                <video
                    className="preloader-video lg:w-full lg:h-full w-[326px] h-[400px] lg:object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src={videoSrc} type="video/mp4" />
                    {/* Optional WebM fallback if available */}
                    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default Preloader;
