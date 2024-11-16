import { FaLongArrowAltRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Button, Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

// Lazy Loading para componentes pesados
import { lazy, Suspense } from 'react';
const BannerPrincipal = lazy(() => import('../Components/BannerPrincipal'));
const CardImg = lazy(() => import('../Components/CardImg'));
const AccordionComponent = lazy(() => import('../Components/Accordion'));
const ContactTabs = lazy(() => import('../Components/TabsContact'));
const AutoScrollContainer = lazy(
	() => import('../Components/motion/ScrollAuto'),
);
const CommentCard = lazy(() => import('../Components/CardComment'));
const CardPost = lazy(() => import('../Components/CardPost'));

import { categorias, comments, faq } from '../assets/Object';
import useFetchPosts from '../Hooks/useFecthPost';

const Home = () => {
	const { posts, loading } = useFetchPosts(6); // Hook personalizado para buscar posts
	const navigate = useNavigate();

	return (
		<main className='px-4 md:px-16 py-2 pb-12 bg-slate-100 min-h-screen'>
			<Helmet>
				<title>Flora Ervas | Apresentação</title>
				<meta
					name='description'
					content='A Flora Ervas oferece uma ampla variedade de produtos naturais de alta qualidade. Explore nossos produtos e encontre o equilíbrio que você merece.'
				/>
			</Helmet>

			{/* Lazy-loaded Components */}
			<Suspense
				fallback={
					<Spinner label='Carregando...' color='success' labelColor='success' />
				}
			>
				<BannerPrincipal />

				{/* Produtos */}
				<section className='flex flex-col items-center mt-12'>
					<div className='flex items-center flex-col space-y-4'>
						<h2 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-2'>
							Nossos Produtos
						</h2>
						<p className='text-lg text-gray-700 text-center max-w-md leading-relaxed'>
							Oferecemos uma ampla variedade de produtos naturais, como argilas,
							chás, cereais e muito mais.
						</p>
						<span className='flex items-center gap-1 text-sm text-gray-600'>
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
					</div>
				</section>

				{/* Dúvidas Frequentes */}
				<section className='flex flex-col items-center mt-12'>
					<h3 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-1 mb-5'>
						Dúvidas Frequentes
					</h3>
					<div className='flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full'>
						<div className='hidden lg:block lg:w-1/2'>
							<img
								src='https://images.unsplash.com/photo-1585185466836-93473377a6a5?q=80&w=2071&auto=format&fit=crop'
								alt='Perguntas Frequentes'
								className='rounded-lg'
							/>
						</div>
						<div className='w-full lg:w-1/2'>
							{faq.map((r, index) => (
								<AccordionComponent
									title={r.pergunta}
									textExplicativo={r.resposta}
									key={index}
								/>
							))}
						</div>
					</div>
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
				<section className='flex flex-col items-center mt-12'>
					{loading ? (
						<Spinner
							label='Carregando, aguarde...'
							color='success'
							labelColor='success'
						/>
					) : (
						<>
							<CardPost
								posts={posts}
								titlePost='Veja nosso Blog'
								heightMin='h-full'
							/>
							<Button
								color='success'
								onClick={() => navigate('/posts')}
								className='mt-4'
							>
								Ver Mais
							</Button>
						</>
					)}
				</section>
			</Suspense>
		</main>
	);
};

export default Home;
