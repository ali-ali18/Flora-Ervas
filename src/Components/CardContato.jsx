import React from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
	Button,
} from '@nextui-org/react';

const CardContato = ({ contato, onOpen }) => {
	return (
		<Card className='max-w-[340px] my-4 shadow-md' shadow='lg'>
			<CardHeader className='flex justify-between items-center'>
				<div className='flex gap-5 items-center'>
					<Avatar
						isBordered
						radius='full'
						size='md'
						src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contato.nome)}&background=random`}
					/>
					<div className='flex flex-col gap-1'>
						<h4 className='text-base font-semibold text-default-600'>
							{contato.nome}
						</h4>
						<p className='text-small text-default-400'>{contato.email}</p>
					</div>
				</div>
			</CardHeader>
			<CardBody className='px-3 py-2'>
				<p className='text-small text-default-500'>
					Nome Fantasia: {contato.nomeFantasia || 'N/A'}
				</p>
				<p className='text-small text-default-500'>
					CNPJ: {contato.cnpj || 'N/A'}
				</p>
				<p className='text-small text-default-500'>
					Telefone: {contato.telefone}
				</p>
				<p className='text-small text-default-500 mt-2'>Mensagem:</p>
				<p className='text-sm text-default-700 italic'>"{contato.mensagem}"</p>
			</CardBody>
			<CardFooter className='flex justify-end'>
				<Button color='primary' radius='full' size='sm' onPress={onOpen}>
					Opções de contato
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CardContato;
