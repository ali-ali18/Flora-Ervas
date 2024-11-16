import React from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
	Button,
} from '@nextui-org/react';
import { BiXCircle, BiInfoCircle } from 'react-icons/bi';

const CardColaborador = ({ colaborador, onDelete, onInfo }) => {
	return (
		<Card className='max-w-[340px] shadow-lg hover:shadow-2xl transition-shadow duration-300'>
			<CardHeader className='flex gap-4 p-4'>
				<Avatar
					isBordered
					radius='full'
					size='lg'
					src={`https://ui-avatars.com/api/?name=${encodeURIComponent(colaborador.nome)}&background=random`}
				/>
				<div className='flex flex-col gap-1'>
					<h4 className='text-lg font-semibold text-gray-700'>
						{colaborador.nome}
					</h4>
					<h5 className='text-md font-normal text-gray-500'>
						{colaborador.cargo?.label}
					</h5>
				</div>
			</CardHeader>

			<CardBody className='px-4 py-2 text-sm text-gray-600'>
				<p className='font-medium'>{colaborador.email}</p>
				<p className='pt-2 text-gray-500'>{colaborador.cargo?.description}</p>
			</CardBody>

			<CardFooter className='flex justify-between p-4 border-t border-gray-200'>
				<Button
					auto
					color='danger'
					size='sm'
					className='flex items-center gap-2 text-sm font-medium text-red-600'
					variant='flat'
					onPress={onDelete}
				>
					<BiXCircle size={20} />
					<span>Deletar</span>
				</Button>

				<Button
					auto
					color='primary'
					size='sm'
					className='flex items-center gap-2 text-sm font-medium text-blue-600'
					variant='flat'
					onPress={onInfo}
				>
					<BiInfoCircle size={20} />
					<span>Opções</span>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CardColaborador;
