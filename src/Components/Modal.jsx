import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Divider,
} from '@nextui-org/react';

const ModalConfirmacao = ({ isOpen, onOpenChange }) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Muito Obrigado 💚
						</ModalHeader>
						<Divider/>
						<ModalBody>
							<p>
								Seus dados foram enviados com sucesso! Em breve, um de nossos
								representantes entrará em contato com você.
								<br />A equipe da Flora Ervas agradece a confiança depositada em
								nossos serviços. Estamos ansiosos para proporcionar uma
								experiência única e satisfatória!
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								Fechar
							</Button>

						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalConfirmacao;
