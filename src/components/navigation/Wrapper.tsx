import {
	CheckPublicationModal,
	DownloadPublicationModal,
} from 'components/publications';
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
	showPublicationsButton?: boolean;
	categories?: any[];
	onCategoryChange?: (_category: string) => void;
	activeCategoryId?:string;
}

const Wrapper: React.FC<WrapperProps> = ({
	children,
	isPublications,
	showPublicationsButton = true,
	categories,
	onCategoryChange,
	activeCategoryId
}) => {
	React.useEffect(() => {
		document
			.querySelector('body')
			?.addEventListener('click', () => hideAllPublicationActions());
		document
			.querySelector('body')
			?.addEventListener('click', () =>
				toggleHiddenElement('.topnav-publication-actions', 'hide')
			);
		window.scroll(0, 0);

		return () => {
			document
				.querySelector('body')
				?.removeEventListener('click', () => hideAllPublicationActions());
			document
				.querySelector('body')
				?.removeEventListener('click', () =>
					toggleHiddenElement('.topnav-publication-actions', 'hide')
				);
		};
	}, []);
	return (
		<div className="min-h-screen">
			<CheckPublicationModal />
			<DownloadPublicationModal />
			{isPublications ? (
				<PublicationsSideNav />
			) : (
				<SideNav categories={categories} onCategoryChange={onCategoryChange}
				activeCategoryId={activeCategoryId}
				/>
			)}
			<TopNav
				showPublicationsButton={showPublicationsButton}
				isPublications={isPublications}
			/>
			<div className="mini:pl-[239px] pt-[60px] px-5 mini:pt-[90px] mini:pr-12 mini:px-[26px]">
				{children}
			</div>
		</div>
	);
};

export default Wrapper;
