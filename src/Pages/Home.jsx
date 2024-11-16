import { FaLongArrowAltRight } from 'react-icons/fa';
import BannerPrincipal from '../Components/BannerPrincipal';
import CardImg from '../Components/CardImg';
import { Button, Image, Spinner } from '@nextui-org/react';
import AccordionComponent from '../Components/Accordion';
import ContactTabs from '../Components/TabsContact';
import AutoScrollContainer from '../Components/motion/ScrollAuto';
import CommentCard from '../Components/CardComment';
import { categorias, comments, faq } from '../assets/Object';
import { Helmet } from 'react-helmet-async';
import CardPost from '../Components/CardPost';
import { useEffect, useState } from 'react';
import { db } from '../fireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'posts'));
				const postData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				const shuffledPosts = postData
					.sort(() => 0.5 - Math.random())
					.slice(0, 6);
				setPosts(shuffledPosts);
			} catch (error) {
				toast.error('Ocorreu um erro ao carregar os posts');
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);
	return (
		<main className='px-4 md:px-16 py-2 pb-12 bg-slate-100 min-h-screen'>
			<Helmet>
				<title>Flora Ervas | Apresentação</title>
				<meta
					name='description'
					content='A Flora Ervas oferece uma ampla variedade de produtos naturais de alta qualidade, incluindo chás, ervas, argilas e produtos para o bem-estar. levamos até você o que há de melhor para sua saúde e equilíbrio. Explore nossos produtos e encontre o equilíbrio que você merece.
'
				/>
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
						caminho='https://images.unsplash.com/photo-1667229224351-a3719b5e7ef0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					/>
				</div>
			</section>

			{/* Dúvidas Frequentes */}
			<section className='flex flex-col items-center mt-12'>
				<h3 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-1 mb-5'>
					Dúvidas Frequentes
				</h3>
				<aside className='flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl w-full'>
					{/* Ocultar imagem em telas menores que "lg" */}
					<div className='hidden lg:block lg:w-1/2'>
						<Image
							width={1000}
							removeWrapper
							src='https://images.unsplash.com/photo-1585185466836-93473377a6a5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt='Perguntas Frequentes'
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

			{/* Contact */}
			<section className='flex flex-col items-center mt-12'>
				<ContactTabs
					textParagraph='Selecione a opção de contato que mais lhe agrada'
					textTitle='Opções de Contato'
				/>
			</section>

			{/* Comments */}
			<section className='mt-12 w-full flex flex-col items-center'>
				<h3 className='text-3xl font-medium text-gray-800 border-b-4 border-green-600 pb-1 mb-1 inline-block'>
					Comentários
				</h3>
				<p className='text-lg lg:text-xl text-gray-600 text-center mb-6 px-2 lg:px-0'>
					Descubra as experiências e opiniões de nossos clientes!
				</p>
				<AutoScrollContainer scrollSpeed={30}>
					{/* Reduzido para uma rolagem mais suave */}
					{comments.map((r, index) => (
						<CommentCard
							author={r.author}
							avatar={r.avatar}
							content={r.content}
							date={r.date}
							key={index}
							className='min-w-[250px] max-w-[300px] whitespace-nowrap' // Largura consistente
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
				<section className='flex flex-col items-center '>
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
						className='text-white text-lg w-48'
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
