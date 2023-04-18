import React from 'react';
import samplePicture from 'assets/images/agents/sample-picture.png';
import { useModal } from 'hooks';
import { MODALS } from 'utils/constants';

interface EnlistedAgentProps {
	name: string;
	tag: string;
	email: string;
	active: boolean;
}

const EnlistedAgent: React.FC<EnlistedAgentProps> = ({
	name,
	tag,
	email,
	active,
}) => {
	const { showModal } = useModal();
	return (
		<div
			className="flex items-center"
			role="presentation"
			onClick={() => showModal(MODALS.AGENT_DETAILS)}
		>
			<div className="flex space-x-[26px] items-center mr-[16px]">
				<div className="h-[58px] w-[58px] rounded-full overflow-hidden">
					<img src={samplePicture} alt="im" className="object-cover" />
				</div>
				<span className="w-[139px] font-inter text-base leading-[20.8px]">
					{name}
				</span>
			</div>
			<span className="w-[74px] font-inter text-575555 text-base leading-[20.8px] mr-[38px]">
				{tag}
			</span>
			<span className="w-[132px] mr-[47px] text-base leading-[20.8px] text-575555">
				{email}
			</span>
			{active ? (
				<div className="flex-shrink-0 h-[30px] flex items-center justify-center bg-[#E9FFF6] rounded-3 w-[122px]">
					<span className="font-medium text-12 text-[#009A49] leading-[20.09px]">
						Active
					</span>
				</div>
			) : (
				<div className="flex-shrink-0 h-[30px] flex items-center justify-center bg-[#F4F4F4] rounded-3 w-[122px]">
					<span className="font-medium text-12 text-[#575555] leading-[20.09px]">
						Inactive
					</span>
				</div>
			)}
		</div>
	);
};

export default EnlistedAgent;
