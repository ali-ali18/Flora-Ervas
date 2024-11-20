import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { NextUIProvider } from '@nextui-org/react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SpeedInsights } from '@vercel/speed-insights/react';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NextUIProvider>
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<ToastContainer autoClose={3000} stacked limit={3} />
					<App />
					<SpeedInsights />
				</QueryClientProvider>
			</HelmetProvider>
		</NextUIProvider>
	</StrictMode>,
);
