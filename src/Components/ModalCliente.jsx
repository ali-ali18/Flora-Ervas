import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from '@nextui-org/react';

const ModalCliente = ({
	isOpen,
	onOpenChange,
	titleModal = 'Titulo do modal',
	children,
	textButton = 'Fechar',
}) => {
	return (
		<Modal
			backdrop='opaque'
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			classNames={{
				backdrop:
					'bg-gradient-to-t from-black via-zinc-800 to-transparent backdrop-opacity-30',
			}}
			className='rounded-lg shadow-lg'
            size='xl'
		>
			<ModalContent className='bg-white dark:bg-zinc-900 rounded-lg shadow-2xl'>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1 text-center p-4'>
							<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
								{titleModal}
							</h2>
						</ModalHeader>
						<ModalBody className='p-6 text-gray-700 dark:text-gray-200'>
							{children}
						</ModalBody>
						<ModalFooter className='flex justify-center p-4'>
							<Button
								color='danger'
								variant='light'
								className='transition-all duration-300 hover:shadow-lg hover:bg-red-100 dark:hover:bg-red-900 text-sm md:text-base'
								onPress={onClose}
							>
								{textButton}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalCliente;
