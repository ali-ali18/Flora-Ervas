import { Divider } from '@nextui-org/react';
import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='bg-gray-800 text-gray-200 py-8'>
			<div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6'>
				{/* Sobre Nós */}
				<div>
					<h4 className='text-lg font-semibold mb-4'>Sobre Nós</h4>
					<p className='text-sm'>
						Na Flora Ervas, nossa missão é trazer produtos naturais de alta
						qualidade para ajudar você a viver uma vida mais saudável.
					</p>
				</div>

				{/* Links de Navegação */}
				<div>
					<h4 className='text-lg font-semibold mb-4'>Navegação</h4>
					<ul className='space-y-2'>
						<li>
							<a href='/' className='hover:underline'>
								Home
							</a>
						</li>
						<li>
							<a href='/seja-nosso-cliente' className='hover:underline'>
								Seja Nosso Cliente
							</a>
						</li>
						<li>
							<a href='/nossa-historia' className='hover:underline'>
								Nossa História
							</a>
						</li>
					</ul>
				</div>

				{/* Contato */}
				<div>
					<h4 className='text-lg font-semibold mb-4'>Contato</h4>
					<p className='text-sm'>Telefone: (99) 9999-9999</p>
					<p className='text-sm'>E-mail: contato@floraervas.com</p>
					<p className='text-sm'>Rua das Ervas, 123, São Paulo - SP</p>
					<div className='flex gap-4 mt-4'>
						<a
							href='https://facebook.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaFacebook size={24} />
						</a>
						<a
							href='https://instagram.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaInstagram size={24} />
						</a>
						<a
							href='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaLinkedin size={24} />
						</a>
						<a
							href='https://wa.me/559999999999'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaWhatsapp size={24} />
						</a>
					</div>
				</div>
			</div>

			<div className='container mx-auto text-center py-4 border-t border-gray-700 mt-8'>
				<p className='text-sm'>
					© {new Date().getFullYear()} Flora Ervas. Todos os direitos
					reservados.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
