import React, { useState } from 'react';
import clsx from 'classnames';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { doNothing } from 'utils/functions';
import { Calendar, Select } from 'components/inputs';
import { CommissionDetail, CommissionRow } from 'components/admin/commission';
import { Pagination } from 'components/general';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';

const userTypes = ['Agents', 'Agent Manager', 'Coordinator'];

const selectClassNames = {
	control: (state: { isFocused: any }) =>
		`h-[41px] !border-[0.2px] outline-none !border-[#9B9B9B]/[.2] !rounded-3 !text-12 font-medium ${
			state.isFocused ? 'outline-none border-none shadow-none' : ''
		}`,
};

const CommissionList = () => {
	const navigate  = useNavigate()
	const [selectedUserType, setSelectedUserType] = useState(userTypes[0]);
	const [date, setDate] = useState<Date | null>(new Date());
	const [showCalendar, setShowCalendar] = useState(false);
	return (
		<>
			<Calendar
				value={date || new Date()}
				visible={showCalendar}
				maxDate={new Date()}
				onChange={(_date) => setDate(_date)}
				onClose={() => setShowCalendar(false)}
			/>

			<div className="flex flex-col space-y-[45px]">
				<div className="flex items-center">
					{userTypes.map((userType, index) => (
						<button
							className={clsx(
								'px-5 transition-all py-2 text-[#575555] font-medium text-sm rounded-3',
								{
									'bg-[#EBDBFF] px-[47px] font-semibold text-[#7600FF]':
										userType === selectedUserType,
								}
							)}
							key={index}
							onClick={
								userType !== selectedUserType
									? () => setSelectedUserType(userType)
									: doNothing
							}>
							{userType}
						</button>
					))}
					<div className="flex ml-[25px] items-center space-x-[5px]">
						<div className="max-w-[160px] flex-shrink-0">
							<Select
								placeholder="Change Of Name"
								options={[]}
								ClassNames={selectClassNames}
							/>
						</div>
						<div className="max-w-[160px] flex-shrink-0">
							<Select
								placeholder="Festac"
								options={[]}
								ClassNames={selectClassNames}
							/>
						</div>
						<button
							onClick={() => setShowCalendar(true)}
							className="h-[41px] py-[9px] px-[19px] text-575555 border border-9B9B9B/[0.2] font-medium text-12 leading-[14.09px rounded flex items-center space-x-4">
							<span>{date ? date?.toLocaleDateString() : ''}</span>
							<Check className="fill-black" />
						</button>
						<div className="ml-[10px] flex items-center space-x-[10px]">
							<button className="py-[13px] px-7 rounded-3 bg-black text-white font-bold text-12">
								Confirm
							</button>
							<button
							onClick={()=>navigate(routes.admin.commission.manage)}
							className="py-[13px] px-7 rounded-3 text-7108F6 font-semibold text-12 bg-[#E8D7FF]">
								Manage Commission
							</button>
						</div>
					</div>
				</div>
				<div className="flex space-x-[38px] pb-3">
					<div className="relative">
						<div className="flex flex-col space-y-[10px] overflow-y-auto scrollbar-hidden pb-10">
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
							<CommissionRow />
						</div>
						<div className="absolute bottom-0 w-full flex items-center justify-center left-0">
							<Pagination isBlackTheme />
						</div>
					</div>
					<div className="w-[482px] flex-shrink-0">
						<CommissionDetail />
					</div>
				</div>
			</div>
		</>
	);
};

export default CommissionList;
