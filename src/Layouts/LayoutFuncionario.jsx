import { menuFuncionario } from '../assets/Object';
import Footer from '../Components/Footer';
import NavBarMenu from '../Components/NavBar';

const LayoutFuncionario = ({children}) => {
	return (
		<>
			<NavBarMenu menuItems={menuFuncionario} />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default LayoutFuncionario