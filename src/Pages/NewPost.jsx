import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import QuillEditor from 'Components/quillEditor';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'fireBaseConfig';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewPost = () => {
	const [title, setTitle] = useState('');
	const [imageURL, setImageURL] = useState('');
	const [content, setContent] = useState('');
	const [description, setDescription] = useState(''); // Novo estado para a descrição
	const [tags, setTags] = useState([]);
	const [tagInput, setTagInput] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handlePostSubmit = async () => {
		try {
			await addDoc(collection(db, 'posts'), {
				title,
				imageURL,
				content,
				description, // Incluindo a descrição ao salvar no Firestore
				tags,
				createdAt: new Date(),
			});
			toast.success('Post adicionado com sucesso!');
			// Limpar campos após a publicação
			setTitle('');
			setImageURL('');
			setContent('');
			setDescription('');
			setTags([]);
		} catch (e) {
			toast.error('Erro ao adicionar o post: ', e);
		}
	};

	const addTag = () => {
		if (tagInput && !tags.includes(tagInput)) {
			setTags([...tags, tagInput]);
			setTagInput('');
		}
	};

	const removeTag = (tagToRemove) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-6'>
			<div className='w-full max-w-2xl space-y-6'>
				<h2 className='text-3xl font-bold text-center mb-4'>Criar Novo Post</h2>
				<Input
					label='URL da Imagem'
					placeholder='Insira o URL da imagem'
					fullWidth
					value={imageURL}
					onChange={(e) => setImageURL(e.target.value)}
					className='focus:outline-none bg-transparent text-lg'
				/>
				<Input
					label='Título'
					placeholder='Insira o título do post'
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='focus:outline-none bg-transparent text-lg'
				/>
				<Input
					label='Descrição'
					placeholder='Insira uma breve descrição do post'
					fullWidth
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='focus:outline-none bg-transparent text-lg'
				/>
				<div className='border border-gray-300 rounded-lg p-4 bg-white'>
					<QuillEditor onChange={setContent} />
				</div>

				<div className='flex flex-col space-y-4'>
					<h3 className='font-semibold text-lg'>Tags</h3>
					<div className='flex items-center gap-2'>
						<Input
							placeholder='Adicionar uma tag'
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							className='focus:outline-none bg-transparent text-lg'
						/>
						<Button color='primary' onClick={addTag}>
							Adicionar Tag
						</Button>
					</div>
					<div className='flex gap-2 flex-wrap'>
						{tags.map((tag) => (
							<div
								key={tag}
								className='bg-gray-200 text-black px-2 py-1 rounded-lg flex items-center gap-1'
							>
								<span>{tag}</span>
								<button
									type='button'
									onClick={() => removeTag(tag)}
									className='text-red-500 ml-1'
								>
									x
								</button>
							</div>
						))}
					</div>
				</div>

				<div className='flex gap-4 mt-4'>
					<Button
						color='primary'
						onClick={handlePostSubmit}
						className='w-full py-3 text-lg font-semibold'
					>
						Publicar Post
					</Button>
					<Button
						variant='bordered'
						onClick={() => onOpen()}
						className='w-full py-3 text-lg font-semibold'
					>
						Pré-visualizar
					</Button>
				</div>
			</div>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size='5xl'
				scrollBehavior='outside'
			>
				<ModalContent>
					<ModalHeader>
						<h2 className='text-4xl font-extrabold text-center mb-4'>
							Pré-visualização
						</h2>
					</ModalHeader>
					<ModalBody
						className='modal-content'
						style={{ maxHeight: '400px', overflowY: 'auto' }}
					>
						<h3 className='text-3xl font-bold mb-2'>{title}</h3>
						{imageURL && (
							<img
								src={imageURL}
								alt='Post'
								className='w-full max-h-96 rounded mb-4'
							/>
						)}
						<p className='text-lg mb-4'>{description}</p>
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</ModalBody>
					<ModalFooter>
						<Button color='danger' onClick={() => onOpenChange(false)}>
							Fechar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default NewPost;
