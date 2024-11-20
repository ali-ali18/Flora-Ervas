import { Link, Button } from '@nextui-org/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Counter = ({ target, prefix = '', duration = 5 }) => {
	const valueRef = useRef(); // Referência ao DOM para atualizar o valor diretamente
	const controls = useAnimation();

	useEffect(() => {
		const timeout = setTimeout(() => {
			controls.start({
				count: target,
				transition: { duration, ease: 'easeOut' },
			});
		}, 500); 

		return () => clearTimeout(timeout);
	}, [target, controls, duration]);

	return (
		<motion.span
			ref={valueRef}
			className='text-3xl lg:text-4xl font-semibold text-green-600'
			animate={controls}
			initial={{ count: 0 }}
			onUpdate={(latest) => {
				if (valueRef.current) {
					valueRef.current.textContent = `${prefix}${Math.round(latest.count)}`;
				}
			}}
		/>
	);
};

const BannerPrincipal = () => {
	const currentYear = new Date().getFullYear();
	const foundationYear = 1994;
	const yearsInMarket = currentYear - foundationYear;

	return (
		<section className='flex flex-col-reverse lg:flex-row items-center gap-8 px-6 lg:px-10 py-12 max-w-6xl mx-auto'>
			{/* Seção de Métricas com Contador */}
			<div className='w-full lg:w-1/2 flex flex-col lg:flex-row items-center justify-around bg-gray-100 p-6 lg:p-8 rounded-xl shadow-lg gap-6 lg:gap-8'>
				{[
					{ target: 500, label: 'Produtos', prefix: '+' },
					{ target: 2000, label: 'Clientes Satisfeitos', prefix: '+' },
					{ target: yearsInMarket, label: 'Anos de Mercado' },
				].map((item, index) => (
					<motion.div
						key={index}
						className='flex flex-col items-center'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						whileHover={{ scale: 1.1 }}
					>
						<Counter target={item.target} prefix={item.prefix} />
						<p className='text-gray-700 text-center text-base lg:text-lg'>
							{item.label}
						</p>
					</motion.div>
				))}
			</div>

			{/* Seção de Texto */}
			<div className='w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8'>
				<h1
					className='text-4xl lg:text-5xl font-semibold text-gray-800 border-b-4 border-green-600 inline-block'
					style={{ animation: 'none' }}
				>
					Flora Ervas
				</h1>
				<p className='text-lg lg:text-xl text-gray-700 max-w-lg mx-auto lg:mx-0 leading-relaxed'>
					Explore os benefícios da natureza com produtos feitos para promover
					seu bem-estar. Nossos produtos são cuidadosamente selecionados para
					levar o melhor da flora diretamente para você.
				</p>
				<Button
					href='#'
					as={Link}
					color='success'
					showAnchorIcon
					variant='solid'
					className='transition-all duration-200 text-white font-semibold'
					size='lg'
					radius='sm'
					shadow='true'
				>
					Entrar em contato
				</Button>
			</div>
		</section>
	);
};

export default BannerPrincipal;
