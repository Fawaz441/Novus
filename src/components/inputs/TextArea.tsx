import React, { ChangeEventHandler } from 'react';
import clsx from 'classnames';
import { ReactComponent as Required } from 'assets/icons/required.svg';

interface TextAreaProps {
	labelClassName?: string;
	inputClassName?: string;
	wrapperClassName?: string;
	containerClassName?: string;
	hasRequiredIcon?: boolean;
	value: string;
	placeholder?: string;
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
	label?: string;
	hasError?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
	label,
	placeholder,
	labelClassName,
	inputClassName,
	containerClassName,
	hasRequiredIcon,
	value,
	hasError,
	onChange,
}) => {
	return (
		<div className={clsx('flex flex-col space-y-[7px]', containerClassName)}>
			{label && (
				<div className="flex space-x-[3px]">
					<span
						className={clsx(
							'font-medium text-12 text-575555 leading-[14.09px]',
							labelClassName
						)}
					>
						{label}
					</span>
					{hasRequiredIcon && <Required />}
				</div>
			)}
			<textarea
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={clsx(
					'pl-[15px] pr-[18px] py-3 rounded-3 border-[0.2px] border-black outline-none placeholder:text-9B9B9B h-full bg-transparent text-12 font-medium leading-[14.09px]',
					inputClassName,
					{ '!border-FF012F': hasError }
				)}
			/>
		</div>
	);
};

export default TextArea;
