import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader">
            <video
                className="preloader-video lg:w-full lg:h-full w-[326px] h-[400px] lg:object-cover object-scale-down"
                autoPlay
                muted
                loop
                playsInline
                preload="auto" // Ensures video preloads
            >
                <source src="/preloader.mp4" type="video/mp4" /> {/* Correct MIME type */}
                <source src="/preloader.webm" type="video/webm" /> {/* Optional WebM fallback */}
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Preloader;
