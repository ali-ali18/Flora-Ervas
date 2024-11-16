import { Link } from "react-router-dom";

const CardPost = ({posts, titlePost, heightMin}) => {
	return (
		<div className={`max-w-full ${heightMin ? heightMin : 'min-h-screen'} mx-auto p-6`}>
			<h1 className='text-3xl font-bold mb-6'>{titlePost ? titlePost : 'Sem titulo'}</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{posts.map((post) => (
					<Link
						to={`/post/${post.id}`}
						key={post.id}
						className='block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
					>
						<div className='w-full h-48 overflow-hidden'>
							<img
								src={post.imageURL}
								alt={post.title}
								className='w-full h-full object-cover'
								style={{ maxHeight: '400px' }}
							/>
						</div>
						<div className='p-4'>
							<h3 className='text-xl font-bold mb-2'>{post.title}</h3>
							<p className='text-gray-600 text-sm mb-4'>{post.description}</p>
							<p className='text-gray-500 text-xs'>
								{new Date(post.createdAt.seconds * 1000).toLocaleDateString(
									'pt-BR',
									{
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									},
								)}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CardPost