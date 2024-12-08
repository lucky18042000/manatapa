import React, { useEffect, useState, useRef } from 'react';

const Preloader = () => {
    const [videoSrc, setVideoSrc] = useState(null); // Start as null to avoid black screen
    const [isMuted, setIsMuted] = useState(true); // Track muted state
    const videoRef = useRef(null); // Reference to the video element

    useEffect(() => {
        const updateVideoSource = () => {
            if (window.innerWidth < 768) {
                setVideoSrc('/Mobilepreloader.mp4');
            } else {
                setVideoSrc('/preloader.mp4');
            }
        };

        // Set initial video source
        updateVideoSource();

        // Update video source on window resize
        window.addEventListener('resize', updateVideoSource);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', updateVideoSource);
    }, []);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    return (
        <div className="preloader">
            {videoSrc && (
                <video
                    ref={videoRef}
                    className="preloader-video lg:w-full lg:h-full w-[326px] h-[400px] lg:object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            )}
            <button
                onClick={toggleMute}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    padding: '5px 10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none'
                }}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>
        </div>
    );
};

export default Preloader;
