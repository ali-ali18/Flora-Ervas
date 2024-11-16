import {
	Input,
	Button,
	Spacer,
	Textarea,
	useDisclosure,
} from '@nextui-org/react';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import ModalConfirmacao from './Modal';
import { db } from '../fireBaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const FormularioCliente = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onSubmit = async (formData) => {
		try {
			// Adiciona os dados na coleção "clientes" do Firestore
			await addDoc(collection(db, 'clientes'), {
				nome: formData.name,
				nome_fantasia: formData.fantasyName,
				telefone: formData.phone,
				cnpj: formData.cnpj,
				mensagem: formData.message,
				createdAt: new Date(),
			});
			onOpen();
		} catch (error) {
			toast.error(
				'Tivemos um erro ao enviar seus dados, tente outras opções de contato',
			);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6'
			>
				<h3 className='text-gray-700 text-xl font-semibold text-center mb-1'>
					Flora Ervas
				</h3>
				<span className='text-gray-500 text-center block text-sm mb-6'>
					Preencha o formulário abaixo para se tornar nosso cliente e receber
					mais informações.
				</span>

				<div>
					<Input
						fullWidth
						label='Nome Completo'
						description='Informe seu nome completo'
						{...register('name', { required: 'O nome é obrigatório.' })}
						isInvalid={!!errors.name}
						errorMessage={errors.name?.message}
						isRequired
						required
					/>
				</div>
				<div>
					<Input
						fullWidth
						label='Nome Fantasia'
						description='Informe o nome fantasia caso tenha'
						{...register('fantasyName')}
					/>
				</div>
				<div>
					<Controller
						name='phone'
						control={control}
						rules={{ required: 'O telefone é obrigatório.' }}
						render={({ field }) => (
							<InputMask mask='(99) 99999-9999' {...field}>
								{(inputProps) => (
									<Input
										{...inputProps}
										fullWidth
										label='Telefone'
										description='Informe seu telefone'
										isInvalid={!!errors.phone}
										errorMessage={errors.phone?.message}
										isRequired
										required
									/>
								)}
							</InputMask>
						)}
					/>
				</div>
				<div>
					<Controller
						name='cnpj'
						control={control}
						render={({ field }) => (
							<InputMask mask='99.999.999/9999-99' {...field}>
								{(inputProps) => (
									<Input
										{...inputProps}
										fullWidth
										label='CNPJ'
										description='Informe seu CNPJ caso se sinta confortável'
										isInvalid={!!errors.cnpj}
										errorMessage={errors.cnpj?.message}
									/>
								)}
							</InputMask>
						)}
					/>
				</div>
				<div>
					<Textarea
						fullWidth
						label='Mensagem'
						description='Escreva sua mensagem'
						{...register('message', { required: 'A mensagem é obrigatória.' })}
						isInvalid={!!errors.message}
						errorMessage={errors.message?.message}
						isRequired
						required
					/>
				</div>
				<Spacer y={1} />
				<Button
					type='submit'
					color='success'
					size='lg'
					className='w-full font-semibold text-white'
				>
					Enviar
				</Button>
			</form>

			<ModalConfirmacao isOpen={isOpen} onOpenChange={onOpenChange}>
				<Input type='email' label='Email' size='md' />
			</ModalConfirmacao>
		</>
	);
};

export default FormularioCliente;
