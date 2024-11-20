import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../fireBaseConfig';

const useFetchPostPages = (pageSize = 6) => {
	const [posts, setPosts] = useState([]);
	const [lastDoc, setLastDoc] = useState(null);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	const fetchPosts = async () => {
		setLoading(true);
		try {
			
			const q = lastDoc
				? query(
						collection(db, 'posts'),
						orderBy('createdAt', 'desc'),
						limit(pageSize),
						startAfter(lastDoc)
				  )
				: query(
						collection(db, 'posts'),
						orderBy('createdAt', 'desc'),
						limit(pageSize)
				  );

			const querySnapshot = await getDocs(q);

			// Mapear os novos posts
			const newPosts = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			// Atualizar o estado de posts
			setPosts((prev) => {
				const ids = prev.map((post) => post.id);
				const filteredPosts = newPosts.filter((post) => !ids.includes(post.id));
				return [...prev, ...filteredPosts];
			});
            
			// Atualizar o último documento visível
			setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

			// Atualizar o estado de "hasMore"
			if (newPosts.length < pageSize) {
				setHasMore(false);
			}
		} catch (error) {
			toast.error('Erro ao carregar os posts.');
			console.error('Erro:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return { posts, loading, hasMore, fetchPosts };
};

export default useFetchPostPages;
