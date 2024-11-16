import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import CardPost from '../Components/CardPost';
import { db } from '../fireBaseConfig';

const PostList = () => {
	const [posts, setPosts] = useState([]);
    const navigate = useNavigate()

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
				console.error('Erro ao buscar posts:', error);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className='max-w-screen-lg mx-auto p-4 min-h-screen'>
			{posts.length <= 0 ? (
				<div className='flex flex-col items-center justify-center gap-3'>
					<p className='text-center text-lg'>
						Não temos nenhum post no momento <br /> vamos criar um?
					</p>

                    <Button color='success' size='lg' onClick={() => navigate('/new-post')}>
                        Criar um novo post
                    </Button>
				</div>
			) : (
				<CardPost posts={posts} titlePost='Todos os Posts' post/>
			)}
		</div>
	);
};

export default PostList;
