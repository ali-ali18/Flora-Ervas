import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const Error404 = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800'>
			<h1 className='text-6xl font-bold mb-4'>404</h1>
			<p className='text-xl mb-4'>Página não encontrada</p>
			<p className='text-gray-600 mb-6 text-center max-w-md'>
				A página que você está procurando não existe ou foi movida. Verifique o
				endereço ou volte à página inicial.
			</p>
			<Link to='/'>
				<Button
					variant='solid'
					color='primary'
					className='bg-green-600 hover:bg-green-700 text-white font-semibold'
				>
					Voltar para a Home
				</Button>
			</Link>
		</div>
	);
};

export default Error404;
