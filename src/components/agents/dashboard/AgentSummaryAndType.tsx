import React from 'react';
import AgentSummaryCard from './AgentSummaryCard';

const AgentSummaryAndType = () => {
	return (
		<div className="flex space-x-12 items-center">
			<div className="flex space-x-[10.8px]">
				<AgentSummaryCard
					text="Made"
					bold_text="Publication"
					value={200}
					blob_color="#C89CFF"
				/>
				<AgentSummaryCard
					text="Earned"
					bold_text="Commission"
					value={200}
					blob_color="#FFA0A0"
				/>
				<AgentSummaryCard
					text="Agents"
					bold_text="Network"
					value={200}
					blob_color="#FFBB0B"
				/>
			</div>
			<div className="bg-F4F4F4 border-[0.5px] border-D9D9D9 rounded-6 flex space-x-[132px] items-center py-[26px] px-[29px]">
				<div className="max-w-[57px]">
					<span className="text-12 text-black leading-[15.6px] block">
						Agent
					</span>
					<span className="text-12 font-bold text-black leading-[15.6px] block">
						Type
					</span>
				</div>
				<h3 className="font-inter text-xl font-medium text-black">Manager</h3>
			</div>
		</div>
	);
};

export default AgentSummaryAndType;
