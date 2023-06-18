import React from 'react';
import clsx from 'classnames';

interface LoaderProps {
	loading: boolean;
	mini?: boolean;
	transparent?: boolean;
	className?: string;
}

const Loader = ({ loading, mini, transparent, className }: LoaderProps) => {
	if (!loading) {
		return null;
	}
	return (
		<div
			className={clsx(
				'fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white/[.9] z-[10002]',
				{ '!bg-transparent !static !h-auto !z-[1]': mini },
				{ '!bg-white/[.3]': transparent },
				className
			)}>
			<div className="flex flex-col items-center justify-center space-y-2">
				{mini && (
					<svg
						className="animate-spin -ml-1 mr-3 h-5 w-5 text-7108F6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				)}
				{!mini && (
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}
				{!mini && (
					<h3 className="text-xl text-center text-7108F6">Loading...</h3>
				)}
			</div>
		</div>
	);
};

export default Loader;
