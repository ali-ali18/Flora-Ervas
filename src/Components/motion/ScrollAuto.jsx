import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AutoScrollContainer = ({ children, scrollSpeed = 30 }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const scrollContent = () => {
			const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

			if (scrollLeft >= scrollWidth / 2) {
				containerRef.current.scrollLeft = 0; // Volta ao início ao chegar no meio do conteúdo duplicado
			} else {
				containerRef.current.scrollLeft += 1; // Controle da velocidade
			}
		};

		const intervalId = setInterval(scrollContent, scrollSpeed);

		return () => clearInterval(intervalId);
	}, [scrollSpeed]);

	return (
		<div
			ref={containerRef}
			className='overflow-x-scroll w-full scrollbar-hide flex gap-4'
		>
			<div className='flex gap-4'>
				{children}
				{children} {/* Duplicação para efeito de loop infinito */}
			</div>
		</div>
	);
};

export default AutoScrollContainer;
