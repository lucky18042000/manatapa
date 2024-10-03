import { useState, useEffect } from "react";
import "@/styles/globals.css";
import '@/styles/aboutus.css';
import '@/styles/motions.css';
import '@/styles/stills.css';
import Preloader from "@/components/Preloader"; // Make sure the path is correct

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleStop = () => {
      setLoading(false);
    };

    // Simulate loading delay for demonstration
    setTimeout(handleStop, 1000); // Ensure preloader stays for at least 1 second

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      {loading ? <Preloader /> : <Component {...pageProps} />}
    </>
  );
}
