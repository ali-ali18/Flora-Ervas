import { Card, CardHeader, CardBody, Divider, Image } from '@nextui-org/react';
import { memo } from 'react';

const CommentCard = memo(({ avatar, author, date, content }) => {
	const avatarSrc = avatar || 'https://via.placeholder.com/40'
	const displayAuthor = author || 'Sem autor'
	const displayDate = date || 'Sem data publicada'
	const displayContent = content || 'Nenhum comentário disponível no momento'
	return (
		<Card className="max-w-sm shadow-md rounded-md flex-shrink-0">
			<CardHeader className='flex gap-3'>
				<Image
					alt={`${author} avatar`}
					height={40}
					radius='sm'
					src={avatarSrc}
					width={40}
					loading='lazy'
				/>
				<div className='flex flex-col'>
					<p className='text-md font-semibold'>{displayAuthor}</p>
					<time className='text-small text-default-500'>
						{displayDate}
					</time>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p className='text-gray-700'>
					{displayContent}
				</p>
			</CardBody>
		</Card>
	);
});

export default CommentCard;
