import { Route, Routes } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import LayoutFuncionario from '../Layouts/LayoutFuncionario';
import { useSessionCheck } from '../Hooks/useSessionCheck';
import React, { lazy, Suspense } from 'react';
import { Spinner } from '@nextui-org/react';

const Home = React.lazy(() => import('../Pages/Home'));
const Error404 = React.lazy(() => import('../Components/Error404'));
const HistoryCardTeam = React.lazy(() => import('../Pages/NossaHistoria'));
const SejaCliente = React.lazy(() => import('../Pages/PaginaSejaCliente'));
const Login = React.lazy(() => import('../Pages/Login'));
const Contatos = React.lazy(() => import('../Pages/Contatos'));
const Funcionario = React.lazy(() => import('../Pages/Funcionario'));
const DashBoard = React.lazy(() => import('../Pages/DashBoard'));
const NewPost = React.lazy(() => import('../Pages/NewPost'));
const PostEdit = React.lazy(() => import('../Pages/PostEdit'));
const ViewPost = React.lazy(() => import('../Components/ViewPost'));
const AllPosts = React.lazy(() => import('../Components/AllPosts'));

const Rota = () => {
	useSessionCheck();

	return (
		<Suspense fallback={<div className='flex items-center justify-center h-screen'>
			<Spinner color='success' label='Carregando, aguarde...' labelColor='success'/>
		</div>}>
			<Routes>
				{/* Area do cliente */}
				<Route
					path='/'
					element={
						<Layout>
							<Home />
						</Layout>
					}
				/>
				<Route
					path='/nossa-historia'
					element={
						<Layout>
							<HistoryCardTeam />
						</Layout>
					}
				/>
				<Route
					path='/seja-nosso-cliente'
					element={
						<Layout>
							<SejaCliente />
						</Layout>
					}
				/>
				<Route
					path='/posts'
					element={
						<Layout>
							<AllPosts />
						</Layout>
					}
				/>
				<Route
					path='/post/:id'
					element={
						<Layout>
							<ViewPost />
						</Layout>
					}
				/>
				{/* Pagina de ADM na empresa */}
				<Route path='/login' element={<Login />} />
				<Route
					path='/contato'
					element={
						<LayoutFuncionario>
							<Contatos />
						</LayoutFuncionario>
					}
				/>
				<Route
					path='/funcionario'
					element={
						<LayoutFuncionario>
							<Funcionario />
						</LayoutFuncionario>
					}
				/>
				<Route
					path='/dashboard-blog'
					element={
						<LayoutFuncionario>
							<DashBoard />
						</LayoutFuncionario>
					}
				/>
				<Route
					path='/new-post'
					element={
						<LayoutFuncionario>
							<NewPost />
						</LayoutFuncionario>
					}
				/>
				<Route
					path='/post-edit/:id'
					element={
						<LayoutFuncionario>
							<PostEdit />
						</LayoutFuncionario>
					}
				/>

				{/* Error em pag desconhecida... */}
				<Route
					path='*'
					element={
						<Layout>
							<Error404 />
						</Layout>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default Rota;
