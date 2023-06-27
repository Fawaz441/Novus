import React from 'react';
import clsx from 'classnames';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface WrapperProps {
	children: React.ReactNode;
	wrapperClassName?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, wrapperClassName }) => {
	React.useEffect(() => {
		window.scroll(0, 0);
		const body = document.body;
		if (body) {
			body.scrollTop = 0;
		}
	}, []);

	return (
		<div className="h-screen flex">
			<SideNav />
			<div className="lg:pl-[211px] w-full">
				<TopNav />
				<div
					className={clsx(
						'px-[33px] pt-[60px] lg:pt-[90px] w-full',
						wrapperClassName
					)}
					id="admin-wrapper">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Wrapper;
