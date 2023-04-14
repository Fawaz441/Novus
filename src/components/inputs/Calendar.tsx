import clsx from 'classnames';
import DefaultCalendar from 'react-calendar';

interface CalendarProps {
	visible: boolean;
	onChange: (_date: Date) => void;
	value: Date | null;
	onClose: () => void;
	maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
	visible,
	onChange,
	value,
	onClose,
	maxDate,
}) => {
	return (
		<div
			className={clsx(
				'fixed z-[1000] top-0 left-0 h-screen w-full bg-black/[.8] flex items-center justify-center opacity-0 pointer-events-none',
				{
					'!opacity-100 cursor-pointer !pointer-events-auto': visible,
				}
			)}
			onClick={onClose}
		>
			<div onClick={(e) => e.stopPropagation()} className="cursor-default">
				<DefaultCalendar
					onChange={(date: Date) => {
						onChange(date);
						onClose();
					}}
					value={value || new Date()}
					maxDate={maxDate}
				/>
			</div>
		</div>
	);
};

export default Calendar;
