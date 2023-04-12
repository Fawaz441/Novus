import React from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface WrapperProps {
	children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	React.useEffect(() => {
		window.scroll(0, 0);
		const html = document.querySelector('html');
		if (html) {
			html.scrollTop = 0;
		}
	}, []);

	return (
		<div className="h-screen flex">
			<SideNav />
			<div className="pl-[211px]">
				<TopNav />
				<div className="px-[33px] pt-[90px]">{children}</div>
			</div>
		</div>
	);
};

export default Wrapper;
