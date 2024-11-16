import { Accordion, AccordionItem } from '@nextui-org/react';
import motionProps from './motion/MotionProps';

const AccordionComponent = ({ textExplicativo, arialLabel, title, itemKey }) => {
	return (
		<Accordion
			variant='bordered'
			motionProps={motionProps}
			className='w-full'
			selectionMode='single'
		>
			<AccordionItem
				key={itemKey ? itemKey : 1}

				aria-label={arialLabel ? arialLabel : 'accordion 1'}
				title={title ? title : 'Duvida x'}
			>
				{textExplicativo ? textExplicativo : 'Um texto aleatorio para o card'}
			</AccordionItem>
		</Accordion>
	);
};

export default AccordionComponent;
