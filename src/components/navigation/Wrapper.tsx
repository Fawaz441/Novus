import React from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface WrapperProps {
	children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
	<div className="min-h-screen">
		<SideNav />
		<TopNav />
		<div className="pl-[239px] pt-[90px] pr-12">{children}</div>
	</div>
);

export default Wrapper;
