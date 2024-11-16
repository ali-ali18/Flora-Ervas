import { Spinner } from '@nextui-org/react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../fireBaseConfig'; // Certifique-se de que o caminho está correto.
import ComponentPost from './ComponentePostView';
import CardPost from './CardPost';

const ViewPost = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [otherPosts, setOtherPosts] = useState([]);
	const [loading, setLoading] = useState(true);

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
				toast.error('Ocorreu um erro ao carregar o post');
			} finally {
				setLoading(false);
			}
		};

		const fetchOtherPosts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'posts'));
				const postData = querySnapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((post) => post.id !== id);

				const shuffledPosts = postData
					.sort(() => 0.5 - Math.random())
					.slice(0, 6);

				setOtherPosts(shuffledPosts);
			} catch (error) {
				toast.error('Ocorreu um erro a procurar outros posts para você');
			}
		};
		fetchPost();
		fetchOtherPosts();
	}, [id]);

	if (loading)
		return (
			<div className='min-h-screen flex justify-center items-center bg-gray-100'>
				<Spinner
					label='Carregando, aguarde...'
					color='success'
					labelColor='success'
				/>
			</div>
		);

	if (!post) return null;

	return (
		<>
			<ComponentPost post={post} />
			<CardPost posts={otherPosts} titlePost='Outros posts' />
		</>
	);
};

export default ViewPost;
