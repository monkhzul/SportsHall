import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "rsuite/dist/rsuite.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import {SSRProvider} from '@react-aria/ssr'; 
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    storage.setItem('prevPath', storage.getItem('currentPath'));
    storage.setItem('currentPath', globalThis.location.pathname);

  },[router.asPath])
  return <SSRProvider> <Component {...pageProps} /> </SSRProvider>
}

export default MyApp
