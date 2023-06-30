import { AgentDetail } from 'components/admin/agents';
import { CoordinatorRow } from 'components/admin/coordinators';
import { Pagination } from 'components/general';
import { Input, Select } from 'components/inputs';
import React, { useState } from 'react';

const CoordinatorList = () => {
	const [agentSearch, setAgentSearch] = useState('');
	const [regionSearch, setRegionSearch] = useState('');

	return (
		<div>
			<div className="flex flex-col space-y-8">
				<div className="flex items-center justify-between">
					<div className="flex space-x-5">
						<div className="w-[200px]">
							<Select
								label="Role"
								options={[
									{ value: 'Agent', label: 'Agent' },
									{ value: 'Coordinator', label: 'Coordinator' },
								]}
								ClassNames={{
									control: (state) =>
										`h-[41px] !border-[0.2px] !border-9B9B9B outline-none !rounded-3 !text-12 font-inter font-semibold ${
											state.isFocused
												? 'outline-none border-none shadow-none'
												: ''
										}`,
								}}
							/>
						</div>
                        <div className="w-[221px]">
							<Input
								label="Region"
								value={regionSearch}
								placeholder="Ibeju - lekki"
								onChange={(x) => setRegionSearch(x.target.value)}
								inputClassName="!text-12 !font-medium"
								wrapperClassName="!h-[41px] !border-9B9B9B !border-[0.2px]"
								hasFilterIcon={false}
							/>
						</div>
						<div className="w-[221px]">
							<Input
								label="Search"
								value={agentSearch}
								placeholder="Agent ID, name, email"
								onChange={(x) => setAgentSearch(x.target.value)}
								inputClassName="!text-12 !font-medium"
								wrapperClassName="!h-[41px] !border-9B9B9B !border-[0.2px]"
								hasFilterIcon={false}
							/>
						</div>
					</div>
				</div>
				<div className="flex space-x-10 pb-3">
					<div className="relative">
						<div className="flex flex-col space-y-[10px] overflow-y-auto scrollbar-hidden pb-10">
							<CoordinatorRow />
							<CoordinatorRow />
							<CoordinatorRow />
							<CoordinatorRow />
							<CoordinatorRow />
							<CoordinatorRow />
							<CoordinatorRow />
						</div>
						<div className="absolute bottom-0 w-full flex items-center justify-center left-0">
							<Pagination isBlackTheme />
						</div>
					</div>
					<div className="w-[482px] flex-shrink-0">
						<AgentDetail />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoordinatorList;
