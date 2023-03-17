import React from 'react';
import {
	hideAllPublicationActions,
	toggleHiddenElement,
} from 'utils/ui-functions';
import PublicationsSideNav from './PublicationsSideNav';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface WrapperProps {
	children: React.ReactNode;
	isPublications?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ children, isPublications }) => {
	React.useEffect(() => {
		document
			.querySelector('body')
			?.addEventListener('click', hideAllPublicationActions);
		document
			.querySelector('body')
			?.addEventListener('click', () =>
				toggleHiddenElement('.topnav-publication-actions', 'hide')
			);

		return () => {
			document
				.querySelector('body')
				?.removeEventListener('click', hideAllPublicationActions);
			document
				.querySelector('body')
				?.removeEventListener('click', () =>
					toggleHiddenElement('.topnav-publication-actions', 'hide')
				);
		};
	}, []);
	return (
		<div className="min-h-screen">
			{isPublications ? <PublicationsSideNav /> : <SideNav />}
			<TopNav />
			<div className="pl-[239px] pt-[90px] pr-12">{children}</div>
		</div>
	);
};

export default Wrapper;
