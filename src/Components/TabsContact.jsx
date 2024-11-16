import { Tabs, Tab, Card, CardBody, Link } from '@nextui-org/react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

const contact = [
	{
		key: 'whatsapp',
		titulo: 'WhatsApp',
		content: 'Entre em contato conosco via WhatsApp para uma resposta rápida.',
		link: 'https://wa.me/559999999999',
		icon: <FaWhatsapp />,
	},
	{
		key: 'telefone',
		titulo: 'Telefone',
		content:
			'Ligue para nossa central e fale diretamente com nossos atendentes.',
		link: 'tel:+559999999999',
		icon: <FaPhone />,
	},
	{
		key: 'email',
		titulo: 'E-mail',
		content: 'Envie-nos um e-mail e responderemos o mais breve possível.',
		link: 'mailto:contato@floraervas.com',
		icon: <FaEnvelope />,
	},
];

const ContactTabs = ({textParagraph, textTitle}) => {
	return (
		<div className='flex w-full max-w-md lg:max-w-lg xl:max-w-xl flex-col mx-auto pt-0 p-4 lg:p-0'>
			<h2 className='text-3xl lg:text-4xl font-medium text-gray-800 border-b-4 border-green-600 pb-1 mb-4 text-center w-fit mx-auto'>
				{textTitle || ''}
			</h2>
			<p className='text-lg lg:text-xl text-gray-600 text-center mb-6 px-2 lg:px-0'>
				{textParagraph || ''}
			</p>
			<Tabs
				aria-label='Opções de Contato'
				items={contact}
				placement='top'
				className='w-full'
			>
				{(item) => (
					<Tab
						key={item.key}
						title={
							<div className='flex items-center gap-2 text-base lg:text-lg'>
								{item.icon}
								<span>{item.titulo}</span>
							</div>
						}
					>
						<Card className='mt-4 shadow-md rounded-md lg:text-lg'>
							<CardBody className='p-6'>
								<p className='text-gray-700 mb-2'>{item.content}</p>
								<Link
									isExternal
									href={item.link}
									showAnchorIcon
									color='success'
									className='underline'
								>
									Contatar via {item.titulo}
								</Link>
							</CardBody>
						</Card>
					</Tab>
				)}
			</Tabs>
		</div>
	);
};

export default ContactTabs;
