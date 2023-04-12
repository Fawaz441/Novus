import React, { ChangeEventHandler } from 'react';
import clsx from 'classnames';
import { ReactComponent as Required } from 'assets/icons/required.svg';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { RefCallBack } from 'react-hook-form';
import { doNothing } from 'utils/functions';

interface InputProps {
	labelClassName?: string;
	inputClassName?: string;
	wrapperClassName?: string;
	containerClassName?: string;
	hasRequiredIcon?: boolean;
	value: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	label?: string;
	hasError?: boolean;
	hasFilterIcon?: boolean;
	icon?: React.ReactNode;
	ref_?: RefCallBack;
	onClick?: () => void;
	[key: string]: any;
}

const Input: React.FC<InputProps> = ({
	label,
	placeholder,
	labelClassName,
	inputClassName,
	containerClassName,
	wrapperClassName,
	hasRequiredIcon,
	value,
	hasError,
	hasFilterIcon = true,
	onChange,
	onClick,
	icon,
	ref_,
	...rest
}) => {
	return (
		<div
			className={clsx('flex flex-col space-y-[7px]', containerClassName, {
				'cursor-pointer': onClick,
			})}
			onClick={onClick ?? doNothing}
		>
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
			<div
				className={clsx(
					'flex items-center pl-[15px] h-12 pr-[18px] rounded-3 border-[0.2px] border-black',
					!hasError && wrapperClassName,
					{ '!border-FF012F': hasError }
				)}
			>
				<input
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					ref={ref_ || null}
					disabled={!!onClick}
					{...rest}
					className={clsx(
						'placeholder:text-9B9B9B h-full flex-1 bg-transparent text-12 border-none outline-none font-medium leading-[14.09px]',
						inputClassName,
						{ 'cursor-pointer': onClick }
					)}
				/>
				{hasFilterIcon && (
					<div className="flex-shrink-0 h-7 w-7 flex items-center justify-center bg-F9F9F9 rounded-3">
						<Filter className="fill-9B9B9B stroke-EEEEEE" />
					</div>
				)}
				{icon && icon}
			</div>
		</div>
	);
};

export default Input;
