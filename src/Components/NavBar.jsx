import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NavBarMenu = ({
	menuItems,
	brandTitle = 'Flora Ervas',
	activeColor = 'success',
}) => {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<Link to='/' className='font-bold text-inherit text-xl ml-1'>
						{brandTitle}
					</Link>
				</NavbarBrand>
			</NavbarContent>

			{/* Menu de Navegação para Desktop */}
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				{menuItems.map((item, index) => (
					<NavbarItem key={index} isActive={location.pathname === item.path}>
						<Link
							to={item.path}
							className={`text-${location.pathname === item.path ? activeColor : 'foreground'} `}
						>
							{item.name}
						</Link>
						{/* https://www.floraervasloja.com.br/ */}
					</NavbarItem>
				))}
			</NavbarContent>

			{/* Menu Responsivo */}
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem
						key={index}
						isActive={location.pathname === item.path}
					>
						<Link
							to={item.path}
							className={`w-full text-${location.pathname === item.path ? activeColor : 'foreground'} `}
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavBarMenu;
