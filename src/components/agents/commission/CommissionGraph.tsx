import React, { useState } from 'react';
import clsx from 'classnames';
import { Select } from 'components/inputs';
import Commission from './Commission';

const COMMISSION_TYPES = [
	{ type: 'self', text: 'Earned By Self' },
	{ type: 'agents', text: 'Earned Through Agents' },
];

const getYears = () => {
	const currentYear = new Date().getFullYear();
	const years = [];
	for (var i = currentYear - 4; i <= currentYear; i++) {
		years.push({ label: i, value: i });
	}
	return years.reverse();
};

const CommissionGraph = () => {
	const [activeTab, setActiveTab] = useState(COMMISSION_TYPES[0].type);
	return (
		<div className="flex flex-col space-y-[35px] pb-5">
			<div className="flex items-center mt-[22px] justify-between">
				<div className="flex items-center space-x-[122px]">
					<div className="flex items-center space-x-2">
						{COMMISSION_TYPES.map((commissionType, index) => (
							<button
								type="button"
								key={index}
								className={clsx(
									'h-10 bg-F9F9F9 text-sm text-575555 flex font-medium items-center justify-center rounded-3 py-2 px-[23px]',
									{
										'!text-[#7600FF] !bg-EADAFF':
											commissionType.type === activeTab,
									}
								)}
								onClick={() => setActiveTab(commissionType.type)}
							>
								{commissionType.text}
							</button>
						))}
					</div>
					<div className="flex items-center space-x-[35px]">
						<p className="font-inter text-12 leading-[15.6px] text-575555">
							Commissions <span className="font-bold">Earned</span>
						</p>
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-1">
								<div className="bg-7108F6 h-3 w-3 rounded-full" />
								<span className="font-inter text-12 leading-[15.6px] mb-[-4px] text-575555">
									Month Earnings
								</span>
							</div>
							<div className="flex items-center space-x-1">
								<div className="bg-DFC7FF h-3 w-3 rounded-full" />
								<span className="font-inter text-12 leading-[15.6px] mb-[-4px] text-575555">
									Ranking Publication
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[127px]">
					<Select options={getYears()} defaultValue={getYears()[0]} />
				</div>
			</div>
			<div className="flex space-x-[124px]">
				<div className="w-[358px]">
					<div className="flex flex-col space-y-[22px]">
						<Commission />
						<Commission />
						<Commission />
						<Commission />
						<Commission />
						<Commission />
					</div>
					<div className="flex items-center justify-center">
						<button className="mx-auto text-center w-fit mt-[31px] font-inter font-medium text-13 leading-[16.9px]">
							View History
						</button>
					</div>
				</div>
				<div className="flex-1">
					<div className="flex-1 bg-[red] min-h-[300px] max-h-[369px]" />
					<div className="mt-[19px] flex">
						<span className="text-575555 ml-auto text-12 leading-[15.6px]">
							Months
						</span>
					</div>
					<div className="mt-[25px] border-[0.5px] border-D9D9D9 bg-white px-[42px] py-[30px] rounded-3 flex items-center space-x-20">
						<div className="flex flex-col space-y-[11px]">
							<span className="text-575555 text-12 leading-[15.6px] font-inter">
								Best Rated Month
							</span>
							<span className="text-black text-base leading-[20.8px] font-inter">
								October
							</span>
						</div>
						<div className="flex flex-col space-y-[11px]">
							<span className="text-575555 text-12 leading-[15.6px] font-inter">
								Best Rated Publication
							</span>
							<span className="text-black text-base leading-[20.8px] font-inter">
								Loss Of Document
							</span>
						</div>
						<div className="flex flex-col space-y-[11px]">
							<span className="text-575555 text-12 leading-[15.6px] font-inter">
								Gross Earnings
							</span>
							<span className="text-black text-base leading-[20.8px] font-inter">
								30,000
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommissionGraph;
