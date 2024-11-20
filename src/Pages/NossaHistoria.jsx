import { Image, Button, Link } from '@nextui-org/react';
import { Helmet } from 'react-helmet-async';

const NossaHistoria = () => {
	return (
		<section className='bg-slate-100 py-12 px-6 space-y-20'>
			<Helmet>
				<title>Flora Ervas | Nossa História</title>
				<meta
					name='description'
					content='Explore a história da Flora Ervas, desde sua fundação em 1994. Com anos de experiência e dedicação, nos tornamos uma referência em produtos naturais de alta qualidade. Saiba mais sobre nossa trajetória e nosso compromisso em oferecer o melhor da natureza para você.'
				/>
			</Helmet>

			{/* Seção Inicial - Introdução */}
			<div className='flex flex-col items-center text-center space-y-4'>
				<h2 className='text-4xl font-bold text-gray-800'>Nossa História</h2>
				<p className='text-xl text-gray-600 max-w-3xl'>
					Desde 1994, a Flora Ervas está comprometida em trazer o melhor da
					natureza até você. Nossa trajetória é marcada por dedicação e paixão
					pelos produtos naturais, valorizando o bem-estar e a sustentabilidade.
				</p>
			</div>
			{/* Seção 1 - Fundação da Empresa */}
			<div className='flex flex-col lg:flex-row items-center gap-10'>
				<Image
					alt='Fundação da empresa'
					src='https://images.unsplash.com/photo-1590810430999-12ac899931ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					width={500}
					height={300}
					className='rounded-lg shadow-lg'
				/>
				<div className='lg:w-1/2 space-y-4'>
					<h3 className='text-3xl font-semibold text-gray-800'>
						1994: Fundação da Flora Ervas
					</h3>
					<p className='text-lg text-gray-600'>
						A Flora Ervas começou com uma pequena loja familiar em São Paulo,
						dedicada a oferecer produtos naturais de alta qualidade. Com o
						tempo, ganhamos a confiança dos clientes e expandimos nosso alcance.
					</p>
				</div>
			</div>
			{/* Seção 2 - Expansão e Crescimento */}
			<div className='flex flex-col lg:flex-row-reverse items-center gap-10'>
				<Image
					alt='Expansão da empresa'
					src='https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					width={500}
					height={300}
					className='rounded-lg shadow-lg'
				/>
				<div className='lg:w-1/2 space-y-4'>
					<h3 className='text-3xl font-semibold text-gray-800'>
						2000: Expansão e Crescimento
					</h3>
					<p className='text-lg text-gray-600'>
						Na virada do milênio, a Flora Ervas expandiu para novas localidades,
						levando nossos produtos para clientes em várias regiões. Nosso
						compromisso com a qualidade e a sustentabilidade continuou a ser o
						pilar do nosso crescimento.
					</p>
				</div>
			</div>
			{/* Seção Final - Conclusão com Card de Contato */}
			<div className='flex flex-col items-start justify-center gap-10 lg:items-center lg:text-center'>
				<div className='space-y-4 text-left lg:text-center'>
					<h3 className='text-3xl font-semibold text-gray-800'>
						Nossa Missão Continua
					</h3>
					<p className='text-lg text-gray-600 max-w-xl'>
						Desde a nossa fundação até hoje, a Flora Ervas permanece fiel à sua
						missão de oferecer produtos naturais e de alta qualidade, promovendo
						o bem-estar e o respeito à natureza. Agradecemos a todos os nossos
						clientes que fazem parte desta jornada.
					</p>
					<Button
						href='#'
						as={Link}
						color='success'
						showAnchorIcon
						variant='solid'
						size='lg'
						className='font-semibold text-base text-white'
					>
						Falar com um representante
					</Button>
				</div>
			</div>
		</section>
	);
};

export default NossaHistoria;
