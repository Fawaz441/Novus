import { Wrapper } from 'components/admin/navigation';
import { AdminSummaryCard } from 'components/admin/dashboard';
import {
	AdminPublicationsFilter,
	AdminPublicationsTabs,
	AdminPublications,
	AdminPublicationPreview,
} from 'components/admin/main';
import { useState } from 'react';
import { AdminPublicationsFilterDuration } from 'interfaces/admin';
import { PUBLICATION_TYPES } from 'utils/constants';

const Dashboard = () => {
	const [currentFilter, setCurrentFilter] =
		useState<AdminPublicationsFilterDuration>('today');
	const [activeTab, setActiveTab] = useState<PUBLICATION_TYPES>(
		PUBLICATION_TYPES.CHANGE_OF_NAME
	);
	return (
		<Wrapper>
			<div className="mt-[26px] lg:mt-[50px] pb-[30px]">
				<div className="w-full lg:w-auto flex lg:flex-row lg:space-x-[10.8px] flex-col lg:space-y-0 space-y-[14px]">
					<AdminSummaryCard value={200} text="Total" bold_text="Publications" />
					<AdminSummaryCard value={200} text="Total" bold_text="Revenue" />
					<AdminSummaryCard value={200} text="Agents" bold_text="Network" />
					<AdminSummaryCard value={400} text="Total" bold_text="Coordinators" />
				</div>
				<div className="mt-[45px]">
					<AdminPublicationsFilter
						currentFilter={currentFilter}
						onFilterChange={(filter: AdminPublicationsFilterDuration) =>
							setCurrentFilter(filter)
						}
					/>
					<div className="mt-[42px]">
						<AdminPublicationsTabs
							currentTab={activeTab}
							onTabChange={(tab) => setActiveTab(tab)}
						/>
					</div>
				</div>
				<div className="mt-7 flex space-x-[68px]">
					<div>
						<AdminPublications />
					</div>
					<div className="w-[501px] flex-shrink-0">
						<AdminPublicationPreview />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Dashboard;
