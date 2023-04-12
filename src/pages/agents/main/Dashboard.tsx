import {
	AgentPublicationList,
	AgentSummaryAndType,
	Transactions,
} from 'components/agents/dashboard';
import { Wrapper } from 'components/agents/navigation';
import React from 'react';

const Dashboard = () => {
	return (
		<Wrapper>
			<div className="mt-[50px]">
				<AgentSummaryAndType />
				<div className="mt-[65px] flex space-x-[99px]">
					<AgentPublicationList />
					<Transactions />
				</div>
			</div>
		</Wrapper>
	);
};

export default Dashboard;
