import { AdminPublicationsFilterDuration } from 'interfaces/admin';
import React from 'react';
import clsx from 'classnames';
import moment from 'moment';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { Calendar, Input, Select } from 'components/inputs';

interface AdminPublicationsFilterProps {
	onFilterChange: (filter: AdminPublicationsFilterDuration) => void;
	currentFilter: AdminPublicationsFilterDuration;
	date: Date | null;
	setDate: (_date: Date | null) => void;
	status: 'Pending' | 'Published' | null;
	setStatus: (_status: 'Pending' | 'Published' | null) => void;
}

const AdminPublicationsFilter: React.FC<AdminPublicationsFilterProps> = ({
	currentFilter,
	onFilterChange,
	date,
	setDate,
	status,
	setStatus,
}) => {
	const [showCalendar, setShowCalendar] = React.useState(false);
	const options = [
		{ label: 'Pending', value: 'Pending' },
		{ label: 'Published', value: 'Published' },
	];

	const getSelectValue = () => {
		const query = options.find((value) => value.value === status);
		return query ? query : null;
	};
	return (
		<div className="flex items-center justify-between">
			<Calendar
				value={date || new Date()}
				visible={showCalendar}
				onClose={() => setShowCalendar(false)}
				onChange={(_date) => setDate(_date)}
				maxDate={new Date()}
			/>
			<div className="flex space-x-[15px] items-center">
				<p className="font-inter text-[18px] text-black">
					Today <span className="font-semibold">Publications</span>
				</p>
				<div className="flex">
					<button
						className={clsx(
							'px-[22px] py-[7px] rounded-3 font-inter text-12 text-black',
							{
								'!text-white !bg-black': currentFilter === 'today',
							}
						)}
						onClick={() => onFilterChange('today')}>
						Today
					</button>
					<button
						className={clsx(
							'px-[22px] py-[7px] rounded-3 font-inter text-12 text-black',
							{
								'!text-white !bg-black': currentFilter === 'yesterday',
							}
						)}
						onClick={() => onFilterChange('yesterday')}>
						Yesterday
					</button>
					<button
						className={clsx(
							'px-[22px] py-[7px] rounded-3 font-inter text-12 text-black',
							{
								'!text-white !bg-black': currentFilter === 'one-week',
							}
						)}
						onClick={() => onFilterChange('one-week')}>
						1 week
					</button>
				</div>
			</div>
			<div className="flex space-x-[25px] items-center">
				<Select
					placeholder="Select Publication Status"
					options={options}
					isClearable
					ClassNames={{
						control: (state) =>
							`!h-[41px] !border-[0.2px] !min-w-[200px] outline-none !border-575555/[.2] !rounded-3 !text-12 !text-black ${
								state.isFocused ? 'outline-none border-none shadow-none' : ''
							}`,
					}}
					value={getSelectValue()}
					onChange={(e: any) => setStatus(e?.value)}
				/>
				<Input
					hasFilterIcon={false}
					value={date ? moment(date).format('DD-MM-YYYY') : ''}
					placeholder="Enter a date"
					wrapperClassName="!max-w-[200px] !h-[41px] !border-[#9B9B9B] bg-white"
					icon={
						<button
							onClick={(e) => {
								e.stopPropagation();
								setDate(null);
							}}>
							<Check className="fill-black h-[18px]" />
						</button>
					}
					onClick={() => setShowCalendar(true)}
				/>
			</div>
		</div>
	);
};

export default AdminPublicationsFilter;
