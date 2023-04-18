import { Wrapper } from 'components/agents/navigation';
import React, { useState } from 'react';
import clsx from 'classnames';
import moment from 'moment';
import { ReactComponent as Status } from 'assets/icons/agents/status.svg';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { Calendar, Input } from 'components/inputs';
import { Pagination } from 'components/general';
import AgentPublication from 'components/agents/dashboard/AgentPublication';
import { PublicationStatus } from 'interfaces/publications';
import { isEmpty } from 'lodash';

const TABS = [
	'Change of name',
	'Loss of document',
	'Age of declaration',
	'Obituary',
	'Loss of document. Affi',
	'Change of name. Affi',
	'Age declaration. Affi',
];

const publications: { id: string; text: string; status: PublicationStatus }[] =
	[
		{
			id: 'CON2345JJHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'declined',
		},
		{
			id: 'CON2345AJHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
		{
			id: 'CON2345BJHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'approved',
		},
		{
			id: 'CON2345JHFHGHKLGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'declined',
		},
		{
			id: 'CON2345J1HFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
		{
			id: 'CON22345JHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'approved',
		},
		{
			id: 'CON2929345JHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
	];

const AgentPublications = () => {
	const [statusFilter, setStatusFilter] = useState('');
	const [refNo, setRefNo] = useState('');
	const [showCalendar, setShowCalendar] = useState(false);
	const [date, setDate] = useState<Date | null>(null);
	const [activeTab, setActiveTab] = useState(TABS[0]);
	return (
		<Wrapper>
			<Calendar
				value={date || new Date()}
				visible={showCalendar}
				onChange={setDate}
				onClose={() => setShowCalendar(false)}
			/>
			<div className="mt-[1px]">
				<h3 className="font-inter text-575555 text-[18px] leading-[23.4px]">
					Today <span className="font-semibold text-black">Publications</span>
				</h3>
				<div className="mt-[19px] flex space-x-[72px]">
					<div className="flex space-x-[17px]">
						<div className="flex flex-col space-y-[10px]">
							<span className="text-sm text-black leading-[16.44px]">
								Filter
							</span>
							<Input
								hasFilterIcon={false}
								value={statusFilter}
								placeholder="Publication Status"
								onChange={({ target: { value } }) => setStatusFilter(value)}
								wrapperClassName="!max-w-[200px] !h-[41px] !border-[#9B9B9B] bg-white"
								icon={<Status />}
							/>
						</div>
						<div className="flex flex-col space-y-[10px]">
							<span className="text-sm text-black leading-[16.44px] opacity-0 pointer-events-none">
								Filter
							</span>
							<Input
								hasFilterIcon={false}
								value={date ? moment(date).format('DD-MM-YYYY') : ''}
								placeholder="Enter a date"
								wrapperClassName="!max-w-[200px] !h-[41px] !border-[#9B9B9B] bg-white"
								icon={<Check className="fill-black h-[18px]" />}
								onClick={() => setShowCalendar(true)}
							/>
						</div>
					</div>
					<div className="flex space-x-[57px]">
						<div className="flex flex-col space-y-[10px]">
							<span className="text-sm text-black leading-[16.44px]">
								<span className="font-bold">Check</span> Publication
							</span>
							<Input
								hasFilterIcon={false}
								value={refNo}
								placeholder="Enter Reference Number"
								wrapperClassName="!max-w-[261px] !h-[41px] !border-[#9B9B9B] bg-white"
								icon={<Check className="fill-black h-[18px]" />}
								onChange={({ target: { value } }) => setRefNo(value)}
							/>
						</div>
						{!isEmpty(refNo?.trim()) && (
							<div className="flex flex-col space-y-[10px]">
								<span className="text-sm opacity-0 pointer-events-none text-black leading-[16.44px]">
									<span className="font-bold">Check</span> Publication
								</span>
								<button
									type="button"
									className="h-[39px] bg-7108F6 rounded-3 px-[65px]"
								>
									<span className="text-white text-sm leading-[18.2px]">
										Check <span className="font-bold">Publication</span>
									</span>
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col space-y-[36px] w-full mt-[33px]">
					<ul className="w-full flex space-x-[39px] overflow-x-auto whitespace-nowrap scrollbar-hide">
						{TABS.map((tab, index) => (
							<li key={index}>
								<button
									onClick={() => setActiveTab(tab)}
									className={clsx(
										'font-inter text-575555 text-sm leading-[18.2px] pb-[6px] border-b-[1.5px] border-b-transparent',
										{
											'!border-b-7108F6 font-semibold !text-7108F6':
												activeTab === tab,
										}
									)}
								>
									{tab}
								</button>
							</li>
						))}
					</ul>
					<div className="bg-white max-w-[793px]">
						<div className="flex flex-col space-y-4">
							{publications.map((publication, index) => (
								<AgentPublication
									key={index}
									status={publication.status}
									text={publication.text}
									id={publication.id}
									showType
								/>
							))}
						</div>
						<div className="my-[37px] flex items-center justify-center">
							<Pagination />
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default AgentPublications;
