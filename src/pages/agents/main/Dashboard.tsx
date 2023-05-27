import {
	AgentPublicationList,
	AgentSummaryAndType,
	Transactions,
} from 'components/agents/dashboard';
import SmallInput from 'components/agents/dashboard/SmallInput';
import { Wrapper } from 'components/agents/navigation';
import React from 'react';
import { ReactComponent as Celebration } from 'assets/icons/agents/celebration.svg';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';

const Dashboard = () => {
	return (
		<Wrapper>
			<div className="mt-[26px] lg:mt-[50px] pb-[30px]">
				<AgentSummaryAndType />
				<div className="mt-[65px] md:flex md:flex-col xl:flex-row xl:space-x-[99px] hidden">
					<AgentPublicationList />
					<Transactions />
				</div>
				<div className="mt-6 lg:hidden">
					<div>
						<p className="font-inter text-12">
							View <span className="font-semibold">Publications</span>
						</p>
						<div className="flex space-x-1 mt-[6px] mb-[9px]">
							<div className="flex-shrink-0 flex-1">
								<SmallInput
									icon={<Celebration />}
									placeholder="Publication Status"
								/>
							</div>
							<div className="flex-shrink-0 flex-1">
								<SmallInput
									icon={<Check className="fill-575555" />}
									placeholder="Enter a date range"
								/>
							</div>
						</div>
						<button
							type="button"
							className="bg-black rounded-sm h-[35px] w-full text-white font-bold text-10">
							Check Publication
						</button>
					</div>
					<div className="mt-[29px]">
						<p className="font-inter font-medium text-575555 text-12">
							Transactions
						</p>
						<div className="flex space-x-1 mt-[6px] mb-[9px]">
							<div className="flex-shrink-0 flex-1">
								<SmallInput
									icon={<Celebration />}
									placeholder="Transaction Type"
								/>
							</div>
							<div className="flex-shrink-0 flex-1">
								<SmallInput
									icon={<Check className="fill-575555" />}
									placeholder="Enter a date range"
								/>
							</div>
						</div>
						<button
							type="button"
							className="bg-black rounded-sm h-[35px] w-full text-white font-bold text-10">
							View Transaction
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Dashboard;
