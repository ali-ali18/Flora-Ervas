import { Card, Skeleton } from "@nextui-org/react";

const CardSkeleton = () => {
	return (
		<div className='flex'>
			<Card className='w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] p-4' radius='lg'>
				<Skeleton className='rounded-lg'>
					<div className='h-40 rounded-lg bg-default-300'></div>
				</Skeleton>
				<div className='mt-4 space-y-4'>
					<Skeleton className='w-3/4 rounded-lg'>
						<div className='h-5 w-3/5 rounded-lg bg-default-200'></div>
					</Skeleton>
					<Skeleton className='w-2/4 rounded-lg'>
						<div className='h-5 w-3/5 rounded-lg bg-default-200'></div>
					</Skeleton>
					<Skeleton className='w-3/4 rounded-lg'>
						<div className='h-5 w-3/5 rounded-lg bg-default-200'></div>
					</Skeleton>
				</div>
			</Card>
		</div>
	);
};

export default CardSkeleton