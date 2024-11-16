import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../fireBaseConfig';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';
import CardPost from './CardPost';

const AllPosts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'posts'));
				const postData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setPosts(postData);
			} catch (error) {
				toast.error('Ocorreu um erro ao carregar os posts');
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
        fetchPosts();
	}, []);

	if (loading)
		return (
			<div className='min-h-screen flex justify-center items-center'>
				<Spinner
					label='Carregando, aguarde...'
					color='success'
					labelColor='success'
				/>
			</div>
		);

	return (
        <CardPost posts={posts} titlePost='Nossos posts'/>
	);
};
export default AllPosts;
