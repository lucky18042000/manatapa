import { useState, useEffect } from "react";
import "@/styles/globals.css";
import '@/styles/aboutus.css';
import '@/styles/motions.css';
import '@/styles/stills.css';
import '@/styles/contact.css';
import Preloader from "@/Components/Preloader";

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
    setTimeout(handleStop, 10000); // Ensure preloader stays for at least 1 second

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
