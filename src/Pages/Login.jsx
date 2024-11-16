// src/components/Login.jsx
import { Button, Divider, Input, useDisclosure } from '@nextui-org/react';
import SpinnerIcon from '../Components/Spinner';
import { EyeFilledIcon } from '../Components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../Components/EyeSlashFilledIcon';
import { useLogin } from '../Hooks/useLogin';
import ModalCliente from '../Components/ModalCliente';
import { useState } from 'react';
import { auth } from '../fireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
	const {
		isVisible,
		toggleVisibility,
		backgroundImage,
		email,
		setEmail,
		password,
		setPassword,
		loading,
		handleSubmit,
	} = useLogin();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modalEmail, setModalEmail] = useState(''); // Email do modal de cadastro
	const [modalPassword, setModalPassword] = useState(''); // Senha do modal de cadastro
	const [registerLoading, setRegisterLoading] = useState(false); // Estado de carregamento para o cadastro

	// Função para cadastrar o usuário no Firebase Authentication
	const handleRegister = async () => {
		setRegisterLoading(true);

		try {
			// Cria um novo usuário no Firebase Authentication
			await createUserWithEmailAndPassword(auth, modalEmail, modalPassword);
			toast.success('Funcionário cadastrado com sucesso!');
			setModalEmail('');
			setModalPassword('');
			onOpenChange(false); // Fecha o modal após o cadastro
		} catch (error) {
			toast.error(`Erro ao cadastrar funcionário: ${error.message}`);
		} finally {
			setRegisterLoading(false);
		}
	};

	return (
		<div
			className='min-h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center lg:flex-row'
			style={{
				backgroundImage: `url(${backgroundImage})`,
			}}
		>
			<div className='w-full h-full flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-80 p-8 lg:w-2/5 lg:bg-opacity-100 lg:min-h-screen'>
				<div className='text-center mb-4'>
					<h1 className='text-3xl lg:text-4xl font-bold mb-2'>
						Acesso Restrito - Flora Ervas
					</h1>
					<p className='text-lg text-gray-700 mt-2'>
						Área exclusiva para funcionários. Insira suas credenciais para
						acessar o sistema.
					</p>
				</div>

				<Divider className='w-3/4 mb-6' />

				<form
					className='w-full max-w-xs lg:max-w-sm flex flex-col gap-6'
					onSubmit={handleSubmit}
				>
					<Input
						type='email'
						label='Email'
						isRequired
						required
						size='md'
						description='Email cadastrado para realizar o login'
						variant='float'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						label='Senha'
						isRequired
						required
						size='md'
						description='Digite sua senha'
						variant='float'
						type={isVisible ? 'text' : 'password'}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='focus:ring-2 focus:ring-primary-500 focus:outline-none'
						endContent={
							<button
								className='focus:outline-none'
								type='button'
								onClick={toggleVisibility}
								aria-label='toggle password visibility'
							>
								{isVisible ? (
									<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
								) : (
									<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
								)}
							</button>
						}
					/>

					<Button
						color='success'
						className='text-white text-lg'
						size='lg'
						type='submit'
						isLoading={loading}
						spinner={<SpinnerIcon />}
					>
						{loading ? 'Carregando' : 'Entrar'}
					</Button>
					<Button
						onPress={onOpen}
						variant='bordered'
						color='success'
						className='text-lg'
						size='lg'
					>
						Cadastrar-se
					</Button>
				</form>
			</div>

			<ModalCliente
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				titleModal='Cadastro de Funcionário'
				textButton='Fechar'
			>
				<Input
					label='Email'
					type='email'
					description='Email de cadastro'
					isRequired
					required
					value={modalEmail}
					onChange={(e) => setModalEmail(e.target.value)}
				/>
				<Input
					label='Senha'
					description='Senha de acesso'
					isRequired
					required
					endContent={
						<button
							className='focus:outline-none'
							type='button'
							onClick={toggleVisibility}
							aria-label='toggle password visibility'
						>
							{isVisible ? (
								<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
							) : (
								<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
							)}
						</button>
					}
					type={isVisible ? 'text' : 'password'}
					value={modalPassword}
					onChange={(e) => setModalPassword(e.target.value)}
				/>

				<Button
					color='success'
					variant='ghost'
					isLoading={registerLoading}
					onPress={handleRegister} // Chama a função de registro ao clicar
				>
					Cadastrar-se
				</Button>
			</ModalCliente>

			<div className='hidden lg:block lg:w-3/5 h-screen'>
				<div
					className='h-full w-full bg-cover bg-center'
					style={{
						backgroundImage: `url(${backgroundImage})`,
					}}
				></div>
			</div>
		</div>
	);
};

export default Login;
