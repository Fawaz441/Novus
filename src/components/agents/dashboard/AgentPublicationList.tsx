import React, { useState } from 'react';
import clsx from 'classnames';
import moment from 'moment';
import { ReactComponent as Status } from 'assets/icons/agents/status.svg';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { Calendar } from 'components/inputs';
import { Input } from 'components/inputs';
import AgentPublication from './AgentPublication';
import { PublicationStatus } from 'interfaces/publications';
import { Pagination } from 'components/general';

const TABS = [
	'Change of name',
	'Loss of document',
	'Age of declaration',
	'Obituary',
];

const publications: { id: string; text: string; status: PublicationStatus }[] =
	[
		{
			id: 'CON2345JHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'declined',
		},
		{
			id: 'CON2345JHFHGHIH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
		{
			id: 'CON2345JHFHGAGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'approved',
		},
		{
			id: 'CON2345JH2FHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'declined',
		},
		{
			id: 'CON2345JH4FHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
		{
			id: 'CON2345J9HFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'approved',
		},
		{
			id: 'CON23045JHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
	];

const AgentPublicationList = () => {
	const [statusFilter, setStatusFilter] = useState('');
	const [showCalendar, setShowCalendar] = useState(false);
	const [date, setDate] = useState<Date | null>(null);
	const [activeTab, setActiveTab] = useState(TABS[0]);
	return (
		<div className="flex-1 max-w-[693px] pb-[19px]">
			<Calendar
				value={date || new Date()}
				visible={showCalendar}
				onChange={setDate}
				onClose={() => setShowCalendar(false)}
			/>
			<div className="flex flex-col space-y-[19px]">
				<div className="flex space-x-[54px] items-center w-full">
					<div className="flex items-center space-x-3">
						<span className="text-[18px] font-inter text-black">
							Today <span className="font-semibold">Publications</span>
						</span>
						<button type="button" className="text-sm text-575555">
							See All
						</button>
					</div>
					<div className="flex space-x-[14px]">
						<Input
							hasFilterIcon={false}
							value={statusFilter}
							placeholder="Publication Status"
							onChange={({ target: { value } }) => setStatusFilter(value)}
							wrapperClassName="!max-w-[200px] !h-[41px] !border-[#9B9B9B] bg-white"
							icon={<Status />}
						/>
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
				<div className="flex flex-col space-y-5 w-full">
					<ul className="w-full flex justify-between">
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
					<div className="bg-white border-[0.5px] rounded-[3px] border-D9D9D9 px-[18px] py-4">
						<div className="flex flex-col space-y-4">
							{publications.map((publication, index) => (
								<AgentPublication
									key={index}
									status={publication.status}
									text={publication.text}
									id={publication.id}
								/>
							))}
						</div>
						<div className="mt-[37px] flex items-center justify-center">
							<Pagination />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgentPublicationList;
