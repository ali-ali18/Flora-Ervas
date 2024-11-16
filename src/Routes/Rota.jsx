import { Route, Routes } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Home from '../Pages/Home';
import Error404 from '../Components/Error404';
import HistoryCardTeam from '../Pages/NossaHistoria';
import SejaCliente from '../Pages/PaginaSejaCliente';
import Login from '../Pages/Login';
import Contatos from '../Pages/Contatos';
import LayoutFuncionario from '../Layouts/LayoutFuncionario';
import Funcionario from '../Pages/Funcionario';
import { useSessionCheck } from '../Hooks/useSessionCheck';
import DashBoard from '../Pages/DashBoard';
import NewPost from '../Pages/NewPost';
import PostEdit from '../Pages/PostEdit';
import ViewPost from '../Components/ViewPost';
import AllPosts from '../Components/AllPosts';

const Rota = () => {
	useSessionCheck();

	return (
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
	);
};

export default Rota;
