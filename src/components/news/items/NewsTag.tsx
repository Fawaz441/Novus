import React from 'react';
import clsx from 'classnames';

interface TagProps {
	name: string;
	className?: string;
}

const NewsTag: React.FC<TagProps> = ({ name, className }) => (
	<div
		className={clsx(
			'h-[30px] flex items-center justify-center rounded-6 font-bold text-[10px]',
			className
		)}
	>
		{name}
	</div>
);

export default NewsTag;
