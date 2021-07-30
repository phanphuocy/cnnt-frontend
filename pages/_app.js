import 'tailwindcss/tailwind.css';
import '../styles/font.css';

/* import contexts */
import { AuthProvider } from '@/contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
