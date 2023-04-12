import React from 'react';
import announcement from 'assets/images/publications/announcement.png';
import { PublicationStatus } from 'components/publications';
import { PublicationStatus as PublicationStatusType } from 'interfaces/publications';

interface AgentPublicationProps {
	status: PublicationStatusType;
	text: string;
	id: string;
}

const AgentPublication: React.FC<AgentPublicationProps> = ({
	status,
	text,
	id,
}) => {
	return (
		<div className="flex items-center justify-between space-x-[60px]">
			<div className="flex space-x-8 items-center">
				<div className="flex space-x-4 items-center">
					<img
						src={announcement}
						alt="announcement"
						className="flex-shrink-0 pointer-events-none w-[60px] h-[55px] rounded-6"
					/>
					<div className="flex flex-col space-x-[6px]">
						<span className="text-black text-12 font-semibold leading-[14.09px]">
							{id}
						</span>
						<p className="text-9B9B9B text-12 font-medium">{text}</p>
					</div>
				</div>
				<div className="flex-shrink-0">
					<PublicationStatus
						status={status}
						mini
						className="w-[122px] !h-[30px]"
					/>
				</div>
			</div>
			<button
				// onClick={(e) => {
				// 	e.stopPropagation();
				// }}
				type="button"
				className="flex flex-col pl-2 items-end space-y-[5px]"
			>
				<div className="bg-9B9B9B h-[4px] w-[4px] rounded-full border" />
				<div className="bg-9B9B9B h-[4px] w-[4px] rounded-full border" />
				<div className="bg-9B9B9B h-[4px] w-[4px] rounded-full border" />
			</button>
		</div>
	);
};

export default AgentPublication;
