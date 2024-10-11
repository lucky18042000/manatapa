import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader">
            <video
                className="preloader-video w-full h-full"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/preloader.webm" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Preloader;
