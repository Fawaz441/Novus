import { PublicationButton } from 'components/publications';
import { ReactComponent as Download } from 'assets/icons/publications/download.svg';
import { ReactComponent as Add } from 'assets/icons/publications/add.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { useModal } from 'hooks';
import React from 'react';
import { APP_TERMS, MODALS, PUBLICATION_TYPES_ACRONYMS, routes } from 'utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathIncludesName } from 'utils/ui-functions';
import SideNav from './SideNav';

const PublicationsSideNav: React.FC = () => {
	const location = useLocation();
	const { showModal } = useModal();
	const navigate = useNavigate();
	const isCreation = location.pathname.includes('create');
	return (
		<div>
			<div className="hidden w-[199px] pb-[135px] scrollbar-hide overflow-hidden mini:flex flex-col space-y-[200px] fixed h-screen top-0 left-0 overflow-y-auto bg-white pt-[94px] pl-[13px]">
				<div className="flex flex-col space-y-8">
					<PublicationButton
						text={'Change Of Name'}
						isActive={pathIncludesName(location, APP_TERMS.CHANGE_OF_NAME)||pathIncludesName(location, `publications/${PUBLICATION_TYPES_ACRONYMS.CHANGE_OF_NAME}-`)}
						onClick={() =>
							navigate(
								isCreation
									? routes.pub_forms.change_of_name
									: routes.change_of_name_publications
							)
						}
					/>
					<PublicationButton
						text={'Loss Of Document'}
						isActive={pathIncludesName(location, APP_TERMS.LOSS_OF_DOCUMENT)||pathIncludesName(location, `publications/${PUBLICATION_TYPES_ACRONYMS.LOSS_OF_DOCUMENT}-`)}
						onClick={() =>
							navigate(
								isCreation
									? routes.pub_forms.loss_of_document
									: routes.lost_document_publications
							)
						}
					/>
					<PublicationButton
						text={'Public Notice'}
						isActive={pathIncludesName(location, APP_TERMS.PUBLIC_NOTICE)||pathIncludesName(location, `publications/${PUBLICATION_TYPES_ACRONYMS.PUBLIC_NOTICE}-`)}
						onClick={() =>
							navigate(
								isCreation
									? routes.pub_forms.public_notice
									: routes.public_notice_publications
							)
						}
					/>
					<PublicationButton
						text={'Obituary'}
						isActive={pathIncludesName(location, APP_TERMS.OBITUARY)||pathIncludesName(location, `publications/${PUBLICATION_TYPES_ACRONYMS.OBITUARY}-`)}
						onClick={() =>
							navigate(
								isCreation
									? routes.pub_forms.obituary
									: routes.obituary_publications
							)
						}
					/>
					<PublicationButton
						text={'Affidavit'}
						isActive={pathIncludesName(location, APP_TERMS.AFFIDAVIT)}
						onClick={() =>
							navigate(
								routes.pub_forms.affidavit
							)
						}
					/>
				</div>
				<div className="flex flex-col space-y-10">
					{/* <PublicationButton
						text={'Download Publication'}
						className="!bg-EADAFF font-semibold text-12 !text-black"
						icon={<Download />}
						onClick={() => showModal(MODALS.DOWNLOAD_PUBLICATION)}
					/> */}
					<PublicationButton
						text={'Create Publication'}
						className="!bg-EADAFF font-semibold text-12 !text-black"
						icon={<Add />}
						onClick={() => navigate(routes.pub_forms.change_of_name)}
					/>
					{/* <PublicationButton
						text={'Check Publication'}
						className="!bg-EADAFF font-semibold text-12 !text-black"
						icon={<Check className="stroke-black" />}
						onClick={() => showModal(MODALS.CHECK_PUBLICATIONS)}
					/> */}
				</div>
			</div>
			<div className="mini:hidden">
				<SideNav />
			</div>
		</div>
	);
};

export default PublicationsSideNav;
