import { menuCliente } from '../assets/Object';
import Footer from '../Components/Footer';
import NavBarMenu from '../Components/NavBar';

const Layout = ({children}) => {
	return (
		<>
			<NavBarMenu menuItems={menuCliente} />
			<main>{children}</main>
			<Footer/>
		</>
	);
};

export default Layout