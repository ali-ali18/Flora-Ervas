import { Button } from '@nextui-org/react';
import CardPost from '../Components/CardPost';
import CardSkeleton from '../Components/CardSkeleton';
import useFetchPostPages from '../Hooks/useFecthPostPage';

const AllPosts = () => {
	const { posts, loading, hasMore, fetchPosts } = useFetchPostPages();

	if (loading)
		return (
			<div className='h-auto grid gap-2 justify-center items-center place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4'>
				{Array.from({ length: 3 }).map((_, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		);

	if (!loading && posts.length === 0)
		return <p className='text-center'>Nenhum post encontrado.</p>;

	return (
		<div>
			<CardPost posts={posts} titlePost='Nossos posts' heightMin='h-auto'/>
			{hasMore && (
				<div className='flex justify-center my-6'>
					<Button
						onClick={fetchPosts}
						color='success'
						size='size'
					>
						Carregar Mais
					</Button>
				</div>
			)}
		</div>
	);
};

export default AllPosts;
