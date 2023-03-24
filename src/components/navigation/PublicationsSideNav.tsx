import { PublicationButton } from 'components/publications';
import { ReactComponent as Download } from 'assets/icons/publications/download.svg';
import { ReactComponent as Add } from 'assets/icons/publications/add.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { useModal } from 'hooks';
import React from 'react';
import { APP_TERMS, MODALS, routes } from 'utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathIncludesName } from 'utils/ui-functions';

const PublicationsSideNav: React.FC = () => {
	const location = useLocation();
	const { showModal } = useModal();
	const navigate = useNavigate();
	return (
		<div className="w-[199px] pb-[135px] scrollbar-hide overflow-hidden flex flex-col space-y-[200px] fixed h-screen top-0 left-0 overflow-y-auto bg-white pt-[94px] pl-[13px]">
			<div className="flex flex-col space-y-10">
				<PublicationButton
					text={'Change Of Name'}
					isActive={pathIncludesName(location, APP_TERMS.CHANGE_OF_NAME)}
					onClick={() => navigate(routes.pub_forms.change_of_name)}
				/>
				<PublicationButton
					text={'Loss Of Document'}
					isActive={pathIncludesName(location, APP_TERMS.LOSS_OF_DOCUMENT)}
					onClick={() => navigate(routes.pub_forms.loss_of_document)}
				/>
				<PublicationButton text={'Age Declaration'} />
				<PublicationButton text={'Obituary'} />
			</div>
			<div className="flex flex-col space-y-10">
				<PublicationButton
					text={'Download Publication'}
					className="!bg-EADAFF font-semibold text-12 !text-black"
					icon={<Download />}
					onClick={() => showModal(MODALS.DOWNLOAD_PUBLICATION)}
				/>
				<PublicationButton
					text={'Create Publication'}
					className="!bg-EADAFF font-semibold text-12 !text-black"
					icon={<Add />}
					onClick={() => navigate(routes.pub_forms.change_of_name)}
				/>
				<PublicationButton
					text={'Check Publication'}
					className="!bg-EADAFF font-semibold text-12 !text-black"
					icon={<Check className="stroke-black" />}
					onClick={() => showModal(MODALS.CHECK_PUBLICATIONS)}
				/>
			</div>
		</div>
	);
};

export default PublicationsSideNav;
