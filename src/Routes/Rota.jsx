import { Route, Routes } from 'react-router-dom';
import Error404 from '../Components/Error404';
import Layout from '../Layouts/Layout';
import LayoutFuncionario from '../Layouts/LayoutFuncionario';
import AllPosts from '../Pages/AllPosts';
import Contatos from '../Pages/Contatos';
import DashBoard from '../Pages/DashBoard';
import Funcionario from '../Pages/Funcionario';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import NewPost from '../Pages/NewPost';
import HistoryCardTeam from '../Pages/NossaHistoria';
import SejaCliente from '../Pages/PaginaSejaCliente';
import PostEdit from '../Pages/PostEdit';
import ViewPost from '../Pages/ViewPost';


const Rota = () => {

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
