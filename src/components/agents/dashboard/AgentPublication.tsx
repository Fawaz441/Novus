import React from 'react';
import announcement from 'assets/images/publications/announcement.png';
import { PublicationStatus } from 'components/publications';
import { PublicationStatus as PublicationStatusType } from 'interfaces/publications';
import { toggleHiddenElement } from 'utils/ui-functions';
import PublicationActions from 'components/publications/PublicationActions';

interface AgentPublicationProps {
	status: PublicationStatusType;
	text: string;
	id: string;
	showType?: boolean;
}

const AgentPublication: React.FC<AgentPublicationProps> = ({
	status,
	text,
	id,
	showType,
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
				{showType && (
					<span className="flex-shrink-0 font-medium text-12 leading-[20.09px] text-575555">
						3rd Party Publication
					</span>
				)}
				<div className="flex-shrink-0">
					<PublicationStatus
						status={status}
						mini
						className="w-[122px] !h-[30px]"
					/>
				</div>
			</div>
			<div className="relative">
				<PublicationActions tag={id} isAgent />
				<button
					onClick={(e) => {
						e.stopPropagation();
						toggleHiddenElement(`#publication-${id}-actions`);
					}}
					type="button"
					className="flex flex-col pl-2 items-end space-y-[5px]"
				>
					<div className="bg-9B9B9B h-[4px] w-[4px] rounded-full border" />
					<div className="bg-9B9B9B h-[4px] w-[4px] rounded-full border" />
					<div className="bg-9B9B9B h-[4px] w-[4px] rounded-full border" />
				</button>
			</div>
		</div>
	);
};

export default AgentPublication;
