import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from "next/router";
import { useState , useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import Navbar from "../../components/Navbar";
import { Slide } from 'react-toastify';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export default function App({ Component, pageProps: { session, ...pageProps } }) {


  const [progress, setProgress] = useState(100);
  const [loader, setloader] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setProgress(30)
      setloader(true);
      setProgress(75)
    }
    const handleComplete = () => {
      setProgress(80)
      setloader(false);
      setProgress(100)
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return <>
  <GoogleReCaptchaProvider reCaptchaKey="6LczkGUoAAAAAIXyuPLX47O3M7mTx8Z8GFxSsV18">
  <SessionProvider session={session}>
    <LoadingBar
      color='#00425e'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
    
    <Navbar/>

    <Component {...pageProps} />
    </SessionProvider>
    </GoogleReCaptchaProvider>
  </>
}
