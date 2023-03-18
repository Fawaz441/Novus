import React from 'react';
import clsx from 'classnames';
import { ReactComponent as Change } from 'assets/icons/publications/change.svg';

type Step = 'fill_forms' | 'preview' | 'payment';

interface StepListItem {
	step: Step;
	number: number;
	name: string;
}

const stepList: StepListItem[] = [
	{ name: 'Fill Forms', step: 'fill_forms', number: 1 },
	{ name: 'Preview', step: 'preview', number: 2 },
	{ name: 'Make Payment', step: 'payment', number: 3 },
];

interface PublicationCreationStepsProps {
	active_step: Step;
}

const PublicationCreationSteps: React.FC<PublicationCreationStepsProps> = ({
	active_step,
}) => {
	return (
		<div className="flex items-center space-x-[193px]">
			<div className="flex items-center space-x-[14px]">
				<Change />
				<span className="text-sm leading-[16.44px] text-black font-semibold">
					Change Of Name
				</span>
			</div>
			<div className="w-full max-w-[600px] flex items-center justify-between">
				{stepList.map((item) => (
					<div className="flex items-center space-x-[9px]" key={item.number}>
						<span
							className={clsx(
								'text-9B9B9B font-semibold text-sm leading-[16.44px]',
								{
									'!text-7108F6': active_step === item.step,
								}
							)}
						>
							{item.number}
						</span>
						<span
							className={clsx(
								'text-575555 text-base font-medium leading-[16.44px]',
								{
									'!text-7108F6 !font-bold': active_step === item.step,
								}
							)}
						>
							{item.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PublicationCreationSteps;
