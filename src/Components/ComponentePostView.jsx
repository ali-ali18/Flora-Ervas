import { Helmet } from 'react-helmet-async';

const ComponentPostView = ({ post }) => {
	return (
		<div className='max-w-5xl mx-auto p-6'>
			<Helmet>
				<title>Flora Ervas | {post.title}</title>
				<meta
					name='description'
					content={post.description}/>
			</Helmet>
			<h1 className='text-4xl font-bold mb-6 text-gray-800'>{post.title}</h1>
			{post.imageURL && (
				<div className='relative overflow-hidden rounded-lg mb-6'>
					<img
						src={post.imageURL}
						alt={post.title}
						className='w-full h-[500px] object-cover shadow-lg'
					/>
				</div>
			)}
			<p className='text-gray-500 text-sm mb-4 italic'>
				Publicado em{' '}
				{new Date(post.createdAt.seconds * 1000).toLocaleDateString('pt-BR', {
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				})}
			</p>
			<p className='text-lg mb-8 text-gray-700'>{post.description}</p>
			<div
				className='ql-editor prose prose-lg text-gray-800 leading-relaxed'
				dangerouslySetInnerHTML={{ __html: post.content }}
			></div>
		</div>
	);
};

export default ComponentPostView;
