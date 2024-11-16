import { Button, Card, Input } from '@nextui-org/react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import QuillEditor from 'Components/quillEditor';
import { db } from 'fireBaseConfig';

const PostEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({ title: '', content: '', imageURL: '' });

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const docRef = doc(db, 'posts', id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setPost(docSnap.data());
				} else {
					toast.error('Post não encontrado');
				}
			} catch (error) {
				toast.error('Erro ao buscar post:', error);
			}
		};

		fetchPost();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPost((prev) => ({ ...prev, [name]: value }));
	};

	const handleContentChange = (content) => {
		setPost((prev) => ({ ...prev, content }));
	};

	const handleUpdatePost = async () => {
		try {
			const docRef = doc(db, 'posts', id);
			await updateDoc(docRef, post);
			toast.success('Post atualizado com sucesso!');
			navigate('/dashboard-blog');
		} catch (error) {
			toast.error('Erro ao atualizar post:');
		}
	};

	const handleDeletePost = async () => {
		try {
			const docRef = doc(db, 'posts', id);
			await deleteDoc(docRef);
			toast.success('Post excluído com sucesso!');
			navigate('/dashboard-blog'); // Redireciona para a página de posts após a exclusão
		} catch (error) {
			toast.error('Erro ao excluir post:');
		}
	};

	return (
		<div className='max-w-2xl mx-auto p-6 mt-8'>
			<h2 className='text-3xl font-bold text-center mb-4'>Editar Post</h2>
			<p className='text-center text-gray-500 mb-6'>
				Bem-vindo, escritor! Edite seu post abaixo:
			</p>

			{/* Imagem atual do post */}
			{post.imageURL && (
				<Card className='mb-6 p-4'>
					<div className='mb-4'>
						<h3 className='font-semibold'>Imagem Atual:</h3>
					</div>
					<img
						src={post.imageURL}
						alt={post.title}
						className='w-full h-40 object-cover rounded-md'
					/>
				</Card>
			)}

			{/* Campo para o título */}
			<div className='mb-4'>
				<Input
					fullWidth
					clearable
					label='Título'
					name='title'
					value={post.title}
					onChange={handleInputChange}
					placeholder='Digite o título do post'
					bordered
				/>
			</div>
			<div className='mb-4'>
				<Input
					fullWidth
					clearable
					label='URL da Imagem'
					name='imageURL'
					value={post.imageURL}
					onChange={handleInputChange}
					placeholder='Digite a URL da imagem'
					bordered
				/>
			</div>
			<div className='mb-4'>
				<Input
					fullWidth
					clearable
					label='Descrição'
					name='description'
					value={post.description}
					onChange={handleInputChange}
					placeholder='Digite a descrição do post'
					bordered
				/>
			</div>

			{/* QuillEditor para o conteúdo */}
			<div className='mb-4'>
				<p className='block text-sm font-medium text-gray-700 mb-2'>Conteúdo</p>
				<QuillEditor
					defaultContent={post.content} // Passe o conteúdo inicial do post
					onChange={handleContentChange} // Função para atualizar o conteúdo
				/>
			</div>

			{/* Botões de Salvar e Excluir */}
			<div className='flex gap-4'>
				<Button
					onClick={handleUpdatePost}
					color='primary'
					auto
					shadow
					className='w-full'
				>
					Salvar Alterações
				</Button>
                <Button
                variant='solid'
                onClick={handleDeletePost}
                className='w-full'
                color='danger'
                >
                    Deletar Post
                </Button>
			</div>
		</div>
	);
};

export default PostEdit;
