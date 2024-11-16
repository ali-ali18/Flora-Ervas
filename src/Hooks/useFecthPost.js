import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../fireBaseConfig';

const useFetchPosts = (limit = 6) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// Busca os documentos da coleção `posts` no Firestore
				const querySnapshot = await getDocs(collection(db, 'posts'));
				const postData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				// Randomiza os posts e limita a quantidade ao valor de `limit`
				const shuffledPosts = postData
					.sort(() => 0.5 - Math.random())
					.slice(0, limit);

				setPosts(shuffledPosts);
			} catch (error) {
				// Mostra uma mensagem de erro ao usuário
				toast.error('Erro ao carregar os posts. Tente novamente mais tarde.');
			} finally {
				// Define o estado de carregamento como falso
				setLoading(false);
			}
		};

		fetchPosts();
	}, [limit]);

	return { posts, loading };
};

export default useFetchPosts;
