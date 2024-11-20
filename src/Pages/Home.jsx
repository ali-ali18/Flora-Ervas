import { FaLongArrowAltRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Button, Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import BannerPrincipal from '../Components/BannerPrincipal';
import CardImg from '../Components/CardImg';
import AccordionComponent from '../Components/Accordion';
import ContactTabs from '../Components/TabsContact';
import AutoScrollContainer from '../Components/motion/ScrollAuto';
import CommentCard from '../Components/CardComment';
import CardPost from '../Components/CardPost';

import { categorias, comments, faq } from '../assets/Object';
import useFetchPosts from '../Hooks/useFecthPost';

const Home = () => {
	const { posts, loading } = useFetchPosts(6);
	const navigate = useNavigate();

	return (
		<main className='px-4 md:px-16 py-2 pb-12 bg-slate-100 min-h-screen'>
			<Helmet>
				<title>Flora Ervas | Apresentação</title>
				<meta
					name='description'
					content='A Flora Ervas oferece uma ampla variedade de produtos naturais de alta qualidade, incluindo chás, ervas, argilas e produtos para o bem-estar. Explore nossos produtos e encontre o equilíbrio que você merece.'
				/>
				<link rel='preload' as='image' href='https://images.unsplash.com/photo-1667229224351-a3719b5e7ef0?q=80&w=1887&auto=format&fit=crop.webp'/>
				<link rel='preload' as='image' href='https://images.unsplash.com/photo-1585185466836-93473377a6a5?q=80&w=2071&auto=format&fit=crop.wbep'/>
				{categorias.map((img, index) => (
					<link key={index}
					rel='preload'
					as='image'
					loading='lazy'
					href={img.img}
					/>
				))}
			</Helmet>

			{/* Banner inicial */}
			<BannerPrincipal />

			{/* Produtos */}
			<section className='flex justify-center w-full mt-0 flex-col'>
				<div className='flex items-center flex-col justify-center space-y-4'>
					<h2 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-2'>
						Nossos Produtos
					</h2>
					<p className='text-lg text-gray-700 text-center max-w-md mx-auto lg:mx-0 leading-relaxed'>
						Oferecemos uma ampla variedade de produtos naturais, incluindo
						argilas, chás, cereais, farinhas, frutas desidratadas, oleaginosas,
						temperos e muito mais. Ingredientes selecionados para atender ao seu
						bem-estar e estilo de vida saudável.
					</p>
					<span className='flex items-center gap-1 justify-center text-sm text-gray-600'>
						Role para ver as categorias <FaLongArrowAltRight />
					</span>
				</div>
				<div className='flex gap-3 overflow-x-auto p-5 scrollbar-hide'>
					{categorias.map((categoria) => (
						<CardImg
							caminho={categoria.img}
							categoria={categoria.categoria}
							key={categoria.categoria}
						/>
					))}
					<CardImg
						produto='Tudo isso pensado para você'
						categoria='E muito mais!'
						caminho='https://images.unsplash.com/photo-1667229224351-a3719b5e7ef0?q=80&w=1887&auto=format&fit=crop.webp'
					/>
				</div>
			</section>

			{/* Dúvidas Frequentes */}
			<section className='flex flex-col items-center mt-12'>
				<h3 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-1 mb-5'>
					Dúvidas Frequentes
				</h3>
				<aside className='flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl w-full'>
					<div className='hidden lg:block lg:w-1/2'>
						<img
							src='https://images.unsplash.com/photo-1585185466836-93473377a6a5?q=80&w=2071&auto=format&fit=crop.webp'
							alt='Perguntas Frequentes'
							className='rounded-lg'
						/>
					</div>
					<div className='w-full lg:w-1/2 p-4 lg:p-0 flex flex-col gap-2'>
						{faq.map((r, index) => (
							<AccordionComponent
								title={r.pergunta}
								textExplicativo={r.resposta}
								arialLabel={r.resposta}
								key={index}
								itemKey={index}
							/>
						))}
					</div>
				</aside>
			</section>

			{/* Contatos */}
			<section className='flex flex-col items-center mt-12'>
				<ContactTabs
					textParagraph='Selecione a opção de contato que mais lhe agrada'
					textTitle='Opções de Contato'
				/>
			</section>

			{/* Comentários */}
			<section className='mt-12 w-full flex flex-col items-center'>
				<h3 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-1 mb-1'>
					Comentários
				</h3>
				<p className='text-lg text-gray-600 text-center mb-6'>
					Descubra as experiências e opiniões de nossos clientes!
				</p>
				<AutoScrollContainer scrollSpeed={30}>
					{comments.map((r, index) => (
						<CommentCard
							author={r.author}
							avatar={r.avatar}
							content={r.content}
							date={r.date}
							key={index}
						/>
					))}
				</AutoScrollContainer>
			</section>

			{/* Blog */}
			{loading ? (
				<div className='min-h-auto mt-3 flex justify-center items-center bg-gray-100'>
					<Spinner
						label='Carregando, aguarde...'
						color='success'
						labelColor='success'
					/>
				</div>
			) : (
				<section className='flex flex-col items-center mt-12'>
					<CardPost
						heightMin='h-full flex flex-col items-center'
						posts={posts}
						titlePost='Veja nosso Blog'
						post={false}
					/>
					<Button
						color='success'
						size='lg'
						variant='solid'
						onClick={() => navigate('/posts')}
						className='text-white text-lg w-48 mt-4'
						radius='sm'
					>
						Ver Mais
					</Button>
				</section>
			)}
		</main>
	);
};

export default Home;
