import clsx from 'classnames';

interface EpitomeBoxProps {
	className?: string;
	textClassName?: string;
}

const EpitomeBox = ({ className, textClassName }: EpitomeBoxProps) => {
	return (
		<div
			className={clsx(
				className,
				'h-[37.14px] w-10 flex items-center justify-center bg-7108F6 rounded'
			)}>
			<span className={clsx(textClassName, 'font-bold text-base text-white')}>
				E
			</span>
		</div>
	);
};

export default EpitomeBox;
