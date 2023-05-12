import React from 'react';
import clsx from 'classnames';
import { ReactComponent as LossOfDocument } from 'assets/icons/loss-of-document.svg';
import { ReactComponent as Change } from 'assets/icons/publications/change.svg';
import { useNavigate } from 'react-router-dom';

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
	activeStep: Step;
	isLossOfDocument?: boolean;
	isAgent?: boolean;
}

const PublicationCreationSteps: React.FC<PublicationCreationStepsProps> = ({
	activeStep,
	isLossOfDocument,
	isAgent,
}) => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="mid:hidden flex space-x-[139px] items-center my-[22px]">
				<button
					onClick={() => navigate(-1)}
					className="text-[10px] leading-[11.74px] text-black">
					Back
				</button>
				<span className="text-[11px] font-bold text-7108F6 leading-[12.91px]">
					{stepList.find((item) => item.step === activeStep)?.name}
				</span>
			</div>
			<div className="hidden mid:flex items-center space-x-[193px]">
				<div className="flex items-center space-x-[14px]">
					{isAgent ? null : isLossOfDocument ? <LossOfDocument /> : <Change />}
					<span
						className={clsx(
							'text-sm leading-[16.44px] text-black font-semibold',
							{ '!text-7108F6 font-semibold': isAgent }
						)}>
						{isLossOfDocument ? 'Loss Of Document' : 'Change Of Name'}
					</span>
				</div>
				<div className="w-full max-w-[600px] flex items-center justify-between">
					{stepList.map((item) => (
						<div className="flex items-center space-x-[9px]" key={item.number}>
							<span
								className={clsx(
									'text-9B9B9B font-semibold text-sm leading-[16.44px]',
									{
										'!text-7108F6': activeStep === item.step,
									}
								)}>
								{item.number}
							</span>
							<span
								className={clsx(
									'text-575555 text-base font-medium leading-[16.44px]',
									{
										'!text-7108F6 !font-bold': activeStep === item.step,
									}
								)}>
								{item.name}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PublicationCreationSteps;
