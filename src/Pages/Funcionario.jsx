import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Input,
	Spinner,
	Tooltip,
	useDisclosure,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { EyeFilledIcon } from '../Components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../Components/EyeSlashFilledIcon';
import ModalCliente from '../Components/ModalCliente';
import CardColaborador from '../Components/CardFuncionario';
import AddFuncionario from '../auth/addFuncionario';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../fireBaseConfig';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const Funcionario = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isVisible, setIsVisible] = useState(false);
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [cargo, setCargo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [colaboradores, setColaboradores] = useState([]);
	const [isReauthOpen, setIsReauthOpen] = useState(false); // Para o modal de reautenticação
	const [adminPassword, setAdminPassword] = useState(''); // Para armazenar a senha do admin/dev

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleAddFuncionario = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!cargo) {
			toast.warn('Selecione um cargo válido');
			setLoading(false);
			return;
		}

		await AddFuncionario(
			nome,
			email,
			senha,
			cargo,
			() => {
				setNome('');
				setSenha('');
				setEmail('');
				setCargo(null);
				onOpenChange(false);
				loadColaboradores();
				setIsReauthOpen(true); // Abre o modal para reautenticação
			},
			(error) => {
				toast.error(
					`Erro ao adicionar o colaborador, caso o erro persista entre em contato com o suporte! ${error}`,
				);
			},
		);
		setLoading(false);
	};

	const handleReauthenticate = async () => {
		try {
			const currentUserEmail = auth.currentUser.email;
			const credential = EmailAuthProvider.credential(
				currentUserEmail,
				adminPassword,
			);

			// Reautentica o admin/dev
			await reauthenticateWithCredential(auth.currentUser, credential);
			toast.success('Reautenticado com sucesso');
			setIsReauthOpen(false); // Fecha o modal de reautenticação
			setAdminPassword(''); // Limpa a senha armazenada
		} catch (error) {
			toast.error(
				'Falha na reautenticação. Verifique sua senha e tente novamente.',
			);
		}
	};

	const handleSelect = (cargo) => {
		setCargo(cargo);
	};

	const loadColaboradores = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'colaboradores'));
			const colaboradoresData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setColaboradores(colaboradoresData);
		} catch (error) {
			toast.error('Erro ao carregar os colaboradores');
		}
	};

	useEffect(() => {
		loadColaboradores();
	}, []);

	const handleDeleteColaborador = async (colaboradorId) => {
		try {
			await deleteDoc(doc(db, 'colaboradores', colaboradorId));
			setColaboradores((prevColaboradores) =>
				prevColaboradores.filter(
					(colaborador) => colaborador.id !== colaboradorId,
				),
			);
			toast.success('Colaborador deletado com sucesso');
		} catch (error) {
			toast.error('Erro ao deletar o colaborador');
			console.log(error)
		}
	};

	return (
		<section className='bg-white min-h-screen p-8'>
			<div className='flex justify-between items-center mb-8'>
				<h2 className='text-3xl font-bold text-gray-800'>
					Gerenciar Colaboradores
				</h2>
				<Tooltip content='Adicionar novo colaborador'>
					<Button
						color='success'
						auto
						radius='full'
						icon={<FaPlus color='white' />}
						className='flex items-center'
						onPress={onOpen}
					>
						<FaPlus size={18} color='white' />
					</Button>
				</Tooltip>
			</div>

			<div className='flex flex-col gap-6 max-w-lg mx-auto mb-8'>
				<Input
					type='search'
					endContent={<FaSearch className='text-gray-500' />}
					description='Caso precise gerenciar um colaborador, busque por ele aqui!'
					variant='bordered'
					size='lg'
					color='primary'
					className='w-full'
				/>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{colaboradores.map((colaborador) => (
					<CardColaborador
						key={colaborador.id}
						colaborador={colaborador}
						onDelete={() => handleDeleteColaborador(colaborador.id)}
					/>
				))}
			</div>

			{/* Modal de Adicionar Colaborador */}
			<ModalCliente
				titleModal='Adicionar Colaborador'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				textButton='Fechar'
			>
				<form
					onSubmit={handleAddFuncionario}
					className='flex flex-col gap-4 p-4'
				>
					<Input
						description='Nome do colaborador'
						type='text'
						label='Nome'
						isRequired
						required
						className='text-black'
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>
					<Input
						description='Email para permitir o acesso do colaborador'
						type='email'
						label='Email'
						isRequired
						required
						className='text-black'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						description='Senha para permitir o login do colaborador'
						label='Senha'
						isRequired
						required
						type={isVisible ? 'text' : 'password'}
						className='text-black'
						value={senha}
						onChange={(e) => setSenha(e.target.value)}
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
					<Autocomplete
						label='Selecione o cargo do colaborador'
						onSelectionChange={(value) => {
							const cargoSelecionado = autoComplete.find(
								(cargo) => cargo.value === value,
							);
							handleSelect(cargoSelecionado);
						}}
						isRequired
						required
						defaultItems={autoComplete}
						description={
							cargo
								? cargo.description
								: 'Selecione um cargo para o colaborador'
						}
					>
						{(cargo) => (
							<AutocompleteItem key={cargo.value}>
								{cargo.label}
							</AutocompleteItem>
						)}
					</Autocomplete>
					<Button
						color='success'
						size='lg'
						className='mt-4 w-full'
						isLoading={loading}
						type='submit'
						spinner={<Spinner />}
					>
						Cadastrar
					</Button>
				</form>
			</ModalCliente>

			{/* Modal de Reautenticação */}
			<ModalCliente
				titleModal='Reautenticação Necessária'
				isOpen={isReauthOpen}
				onOpenChange={setIsReauthOpen}
				textButton='Fechar'
			>
				<div className='flex flex-col gap-4 p-4'>
					<Input
						description='Digite sua senha para confirmar a ação'
						type='password'
						label='Senha de Admin/Dev'
						isRequired
						required
						className='text-black'
						value={adminPassword}
						onChange={(e) => setAdminPassword(e.target.value)}
					/>
					<Button
						color='primary'
						size='lg'
						className='mt-4 w-full'
						onPress={handleReauthenticate}
					>
						Reautenticar
					</Button>
				</div>
			</ModalCliente>
		</section>
	);
};

export default Funcionario;
