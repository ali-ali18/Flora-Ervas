import { Divider } from '@nextui-org/react';
import FormularioCliente from '../Components/Formulario';
import ContactTabs from '../Components/TabsContact';
import { Helmet } from 'react-helmet-async';

const PaginaCliente = () => {
	return (
		<main className='min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center'>
			<Helmet>
				<title>Flora Ervas | Seja Nosso Cliente</title>
				<meta
					name='description'
					content='Entre em contato com a Flora Ervas! Escolha a melhor forma de atendimento: WhatsApp, telefone ou e-mail. Estamos prontos para responder suas dúvidas e ajudar com seus pedidos.'
				/>
			</Helmet>
			{/* Título e introdução das opções de contato */}
			<ContactTabs
				textTitle='Opções de Contato'
				textParagraph='Escolha a opção que mais lhe agrada para entrar em contato'
			/>

			{/* Divisão visual para separação */}
			<div className='flex items-center gap-4 my-10 w-full max-w-lg'>
				<Divider className='flex-1 bg-gray-300' />
				<p className='text-gray-500 font-semibold text-sm tracking-widest'>
					OU
				</p>
				<Divider className='flex-1 bg-gray-300' />
			</div>

			{/* Formulário de cliente */}
			<FormularioCliente />
		</main>
	);
};

export default PaginaCliente;
