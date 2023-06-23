import React from 'react';

interface AdminSummaryCardProps {
	text: string;
	bold_text: string;
	value: any;
}

const AdminSummaryCard: React.FC<AdminSummaryCardProps> = ({
	text,
	bold_text,
	value,
}) => {
	return (
		<div className="h-[86px] relative w-full flex lg:flex-1 lg:max-w-[250.2px] pl-[29px] bg-[#4285F4] rounded-6 space-x-[10.75px]">
			<div className="flex items-center space-x-[53px] justify-center h-full">
				<div className="text-F4F4F4 text-12 max-w-[92px]">
					<span className="block">{text}</span>
					<span className="font-bold">{bold_text}</span>
				</div>
				<h3 className="font-inter text-xl leading-[26px] text-white font-bold">
					{(value !== undefined && value === null) || value === 0
						? 0
						: value || ''}
				</h3>
			</div>
		</div>
	);
};

export default AdminSummaryCard;
