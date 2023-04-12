import React from 'react';
import { ReactComponent as Blob } from 'assets/images/agents/blob.svg';

interface AgentSummaryCardProps {
	text: string;
	bold_text: string;
	value: number;
	blob_color: string;
}

const AgentSummaryCard: React.FC<AgentSummaryCardProps> = ({
	text,
	bold_text,
	value,
	blob_color,
}) => {
	return (
		<div className="h-[86px] flex flex-1 max-w-[250.2px] pl-[29px] bg-7108F6 rounded-6 space-x-[10.75px]">
			<div className="flex items-center justify-center h-full">
				<div className="text-F4F4F4 text-12 max-w-[92px]">
					<span className="block">{text}</span>
					<span className="font-bold">{bold_text}</span>
				</div>
			</div>
			<div className="w-[118.82px] ml-auto h-full relative flex items-center justify-center">
				<Blob className="absolute right-[-1px]" style={{ fill: blob_color }} />
				<span className="text-xl relative font-bold text-white">{value}</span>
			</div>
		</div>
	);
};

export default AgentSummaryCard;
