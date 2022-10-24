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

function MyApp({ Component, pageProps }) {
  return <SSRProvider> <Component {...pageProps} /> </SSRProvider>
}



export default MyApp
