import { Card, CardHeader, CardBody, Divider, Image } from '@nextui-org/react';

const CommentCard = ({ avatar, author, date, content }) => {
	return (
		<Card className='w-[300px] md:w-[350px] shadow-md rounded-md flex-shrink-0'>
			<CardHeader className='flex gap-3'>
				<Image
					alt={`${author} avatar`}
					height={40}
					radius='sm'
					src={avatar || 'https://via.placeholder.com/40'}
					width={40}
				/>
				<div className='flex flex-col'>
					<p className='text-md font-semibold'>{author || 'Sem autor'}</p>
					<p className='text-small text-default-500'>
						{date || 'Sem data publicada'}
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p className='text-gray-700'>
					{content || 'Nenhum comentário disponível no momento'}
				</p>
			</CardBody>
		</Card>
	);
};

export default CommentCard;
