import CardContato from '../Components/CardContato';
import ModalCliente from '../Components/ModalCliente';
import { Button, Link, useDisclosure } from '@nextui-org/react';
import { FaRegTrashAlt, FaWhatsapp } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { CiPhone } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { db } from '../fireBaseConfig';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const Contatos = () => {
	const [contatos, setContatos] = useState([]);
	const [selectedContato, setSelectedContato] = useState(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		const fetchContatosCliente = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'clientes'));
				const contatosData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setContatos(contatosData);
			} catch (error) {
				toast.error('Erro ao carregar os contatos, tente novamente');
			}
		};
		fetchContatosCliente();
	}, []);

	const handleOpenModal = (contato) => {
		setSelectedContato(contato);
		onOpen();
	};

	const handleDeleteContato = async () => {
		try {
			await deleteDoc(doc(db, 'clientes', selectedContato.id));
			setContatos((prevData) =>
				prevData.filter((contato) => contato.id !== selectedContato.id),
			);
			toast.success('Cliente deletado com sucesso');
		} catch (error) {
			toast.error('Ocorreu um erro ao tentar excluir o cliente');
		}
		onOpenChange(false);
	};

	return (
		<>
			<div className='container px-auto p-8 bg-slate-100 min-h-screen max-w-full flex flex-col items-center'>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					Lista de Contatos
				</h2>
				{contatos.length === 0 ? (
					<p className='text-gray-600 text-lg font-semibold mt-4'>
						Nenhuma tentativa de contato encontrada
					</p>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{contatos.map((contato) => (
							<CardContato
								key={contato.id}
								contato={contato}
								onOpen={() => handleOpenModal(contato)}
							/>
						))}
					</div>
				)}
			</div>
			{selectedContato && (
				<ModalCliente
					titleModal={`Opções de contato para ${selectedContato.nome}`}
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<div className='flex flex-col gap-4 items-center justify-center'>
						<span className='text-lg text-center w-full p-2 mb-3'>
							Selecione a opção de atendimento que mais lhe agrada
						</span>
						<Button
							startContent={<FaWhatsapp size={25} />}
							as={Link}
							target='__blank'
							href={`https://wa.me/${selectedContato.telefone.replace(/[\(\)\-\s]/g, '')}?text=Olá%20${selectedContato.nome},%20como%20posso%20ajudar?`}
							size='lg'
							className='w-full text-white text-lg'
							color='success'
						>
							Conversar via WhatsApp
						</Button>
						<Button
							startContent={<BiLogoGmail size={25} />}
							as={Link}
							target='__blank'
							href={`mailto:${selectedContato.email}`}
							size='lg'
							className='w-full text-white text-lg'
							color='success'
						>
							Conversar via Email
						</Button>
						<Button
							startContent={<CiPhone size={25} />}
							as={Link}
							target='__blank'
							href={`tel:${selectedContato.telefone}`}
							size='lg'
							className='w-full text-white text-lg'
							color='success'
						>
							Conversar via Telefone
						</Button>
						<Button
							startContent={<FaRegTrashAlt size={25} />}
							size='lg'
							className='w-full text-white text-lg'
							color='danger'
							onPress={handleDeleteContato}
						>
							Deletar contato
						</Button>
					</div>
				</ModalCliente>
			)}
		</>
	);
};

export default Contatos;
