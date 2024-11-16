import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { NextUIProvider } from '@nextui-org/react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NextUIProvider>
			<HelmetProvider>
				<ToastContainer autoClose={3000} stacked limit={3}/>
				<App />
			</HelmetProvider>
		</NextUIProvider>
	</StrictMode>,
);
