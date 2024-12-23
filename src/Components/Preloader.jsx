import React, { useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';

const Preloader = () => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [canPlayWithSound, setCanPlayWithSound] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const updateVideoSource = () => {
            const src = window.innerWidth < 768 ? '/Mobilepreloader.mp4' : '/preloader.mp4';
            if (src !== videoSrc) {
                setVideoSrc(src);
                setIsVideoLoaded(false);
            }
        };

        updateVideoSource();

        const debouncedResizeHandler = debounce(updateVideoSource, 200);
        window.addEventListener('resize', debouncedResizeHandler);

        return () => window.removeEventListener('resize', debouncedResizeHandler);
    }, [videoSrc]);

    const handleLoadedMetadata = () => {
        setIsVideoLoaded(true);
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
            if (!isMuted) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setCanPlayWithSound(true))
                        .catch(() => {
                            setIsMuted(true);
                            videoRef.current.muted = true;
                        });
                }
            }
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        <div className="preloader">
            {videoSrc && (
                <video
                    ref={videoRef}
                    className={`preloader-video lg:w-full lg:h-full w-[326px] h-[400px] lg:object-cover ${isVideoLoaded ? '' : 'hidden'
                        }`}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            )}
            {/* {!isVideoLoaded && <div className="loading-spinner">Loading...</div>} Show spinner */}
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
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>
        </div>
    );
};

export default Preloader;