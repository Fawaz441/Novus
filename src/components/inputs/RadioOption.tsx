import React from 'react';
import clsx from 'classnames';

interface RadioOptionProps {
	value: any;
	selectedValue: any;
	valuePlaceholder?: any;
	onChange: (value: any) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
	value,
	selectedValue,
	onChange,
	valuePlaceholder,
}) => {
	return (
		<button
			type="button"
			onClick={() => {
				if (value !== selectedValue) {
					onChange(value);
				}
			}}
			className="min-w-[140px] h-[48px] flex items-center justify-between px-[17px] rounded-6 bg-white border-[0.2px] border-black"
		>
			<span className="uppercase font-bold text-12 leadig-[14.09px] text-575555">
				{valuePlaceholder ?? value}
			</span>
			<div
				className={clsx(
					'border border-[#D9D9D9] h-[14px] w-[14px] rounded-[7px]',
					{
						'!border-7108F6': value === selectedValue,
					}
				)}
			/>
		</button>
	);
};

export default RadioOption;
