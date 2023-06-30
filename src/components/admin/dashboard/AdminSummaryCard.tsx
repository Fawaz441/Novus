import adminAPI, { DashboardSummaryResponse } from 'api/admin';
import { ErrorToast } from 'components/general';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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

const AdminSummaryCards: React.FC = () => {
	const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);

	const getSummary = async () => {
		try {
			const info = await adminAPI.getSummary();
			setSummary(info.data);
		} catch (e) {
			toast.custom((t) => (
				<ErrorToast
					message="There was an error fetching the summary"
					retry={() => getSummary()}
					t={t}
				/>
			));
		}
	};

	useEffect(() => {
		getSummary();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full lg:w-auto flex lg:flex-row lg:space-x-[10.8px] flex-col lg:space-y-0 space-y-[14px]">
			<AdminSummaryCard
				value={summary?.totalPublications}
				text="Total"
				bold_text="Publications"
			/>
			<AdminSummaryCard
				value={summary?.totalRevenue}
				text="Total"
				bold_text="Revenue"
			/>
			<AdminSummaryCard
				value={summary?.totalAgent}
				text="Agents"
				bold_text="Network"
			/>
			<AdminSummaryCard
				value={summary?.totalCoordinator}
				text="Total"
				bold_text="Coordinators"
			/>
		</div>
	);
};

export default AdminSummaryCards;
