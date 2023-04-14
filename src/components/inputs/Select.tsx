import React from 'react';
import clsx from 'classnames';
import ReactSelect, {
	Props,
	ClassNamesConfig,
	DropdownIndicatorProps,
	GroupBase,
} from 'react-select';
import { ReactComponent as DropDown } from 'assets/icons/dropdown.svg';
import { ReactComponent as Required } from 'assets/icons/required.svg';

interface SelectProps extends Props {
	label?: string;
	hasRequiredIcon?: boolean;
	ClassNames?: ClassNamesConfig;
	labelClassName?: string;
	[key: string]: any;
}

export interface OptionType {
	label: string;
	value: string;
}

const customClassNames: ClassNamesConfig = {
	control: (state) =>
		`h-12 !border-[0.2px] outline-none !border-black !rounded-3 !text-12 font-semibold ${
			state.isFocused ? 'outline-none border-none shadow-none' : ''
		}`,
	option: (state) =>
		state.data === state.selectProps.value
			? '!text-[#1e1e1e] !text-12 font-semibold !bg-[#EFEFEF]'
			: 'hover:bg-[#EFEFEF] !text-12 !text-[#1e1e1e]',
};

function Indicator({ isFocused }: DropdownIndicatorProps) {
	return (
		<div className="h-7 w-7 rounded-3 mr-[13px] bg-F9F9F9 flex items-center flex-shrink-0 justify-center">
			<DropDown
				className={clsx({
					'rotate-180': isFocused,
				})}
			/>
		</div>
	);
}

// const onBankChange = (bank: SingleValue<OptionType> | unknown | any) => {
//     onChange("selected_bank", bank)
//   }

export default function Select<
	Option = OptionType,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & SelectProps) {
	const { label, hasRequiredIcon, ClassNames, labelClassName, ...rest } = props;
	return (
		<div className="flex flex-col space-y-[6px] w-full">
			{label && (
				<div className="flex space-x-[5px]">
					<p
						className={clsx(
							'text-575555 font-medium text-12 leading-[14.09px]',
							labelClassName
						)}
					>
						{label}
					</p>
					{hasRequiredIcon && <Required />}
				</div>
			)}
			<ReactSelect
				placeholder=""
				classNames={{ ...customClassNames, ...ClassNames }}
				components={{
					DropdownIndicator: Indicator,
					IndicatorSeparator: null,
				}}
				{...rest}
			/>
		</div>
	);
}
