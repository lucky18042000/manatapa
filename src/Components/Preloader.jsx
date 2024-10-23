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
