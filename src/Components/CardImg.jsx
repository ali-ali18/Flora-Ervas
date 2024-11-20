import { Card, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { motion, useAnimation } from 'framer-motion';
import { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CardImg = memo(({ categoria, caminho, produto }) => {
	const controls = useAnimation();
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		} else {
			controls.start('hidden');
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial='hidden'
			variants={{
				visible: { opacity: 1, y: 0 },
				hidden: { opacity: 0, y: 10 },
			}}
			transition={{ duration: 0.3 }}
			className='min-w-[300px] w-[300px] h-[400px] overflow-hidden'
		>
			{inView && (
				<Card className='w-[300px] h-[400px] overflow-hidden'>
					<CardHeader className='absolute z-10 top-1 flex-col !items-start'>
						<p className='text-tiny text-white/60 uppercase font-bold'>
							{produto || 'Categoria'}
						</p>
						<h4 className='text-white font-medium text-2xl'>
							{categoria || 'Sem categoria'}
						</h4>
					</CardHeader>
					<Image
						removeWrapper
						alt={`foto do produto da categoria ${categoria || 'Não especificada'}`}
						className='z-0 object-cover w-[300px] h-[400px]'
						src={caminho || 'https://nextui.org/images/card-example-3.jpeg'}
						lazyLoad
					/>
				</Card>
			)}
		</motion.div>
	);
})

export default CardImg;
