import React, { useState } from 'react';
import clsx from 'classnames';

const options = ['Finance', 'Politics', 'Sports', 'Government', 'Media'];

const OtherNewsTags = () => {
	const [active, setActive] = useState(options[0]);
	return (
		<div className="block mini:hidden py-[17px] !mt-0 !mb-[-19px]">
			<div className="flex flex-row">
				{options.map((option, index) => (
					<button
						key={index}
						className={clsx(
							'h-[33px] py-[10px] px-4 rounded-3 flex transition-all duration-300 items-center justify-center bg-transparent text-575555 text-[10px] font-semibold',
							{
								'!bg-[#F1E7FF] !text-7108F6': active === option,
							}
						)}
						onClick={() => setActive(option)}>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default OtherNewsTags;
