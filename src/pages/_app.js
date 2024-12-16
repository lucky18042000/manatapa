import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import "@/styles/aboutus.css";
import "@/styles/motions.css";
import "@/styles/stills.css";
import "@/styles/contact.css";
import Preloader from "@/Components/Preloader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PRELOADER_DELAY = 8000;

export default function App({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Handle the initial load
        if (router.pathname === "/") {
            setLoading(true);
            const timeout = setTimeout(() => setLoading(false), PRELOADER_DELAY);
            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [router.pathname]);

    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            if (url === "/") {
                setLoading(true);
            }
        };

        const handleRouteChangeComplete = () => {
            setLoading(false);
        };

        // const handleRouteChangeComplete = (url) => {
        //     // Hide the preloader once the route change is complete
        //     if (url === "/") {
        //         const timeout = setTimeout(() => setLoading(false), PRELOADER_DELAY);
        //         return () => clearTimeout(timeout);
        //     } else {
        //         setLoading(false);
        //     }
        // };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [router]);

    return loading && router.pathname === "/" ? (
        <Preloader />
    ) : (
        <Component {...pageProps} />
    );

    // return (
    //     <>
    //         {loading ? <Preloader /> : <Component {...pageProps} />}
    //     </>
    // );
}