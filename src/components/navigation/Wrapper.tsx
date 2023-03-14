import React from 'react';
import PublicationsSideNav from './PublicationsSideNav';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface WrapperProps {
	children: React.ReactNode;
	isPublications?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ children, isPublications }) => (
	<div className="min-h-screen">
		{isPublications ? <PublicationsSideNav /> : <SideNav />}
		<TopNav isPublications={isPublications} />
		<div className="pl-[239px] pt-[90px] pr-12">{children}</div>
	</div>
);

export default Wrapper;
