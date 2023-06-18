import React from 'react';
import { PUBLICATION_TYPES } from 'utils/constants';
import clsx from 'classnames';

interface AdminPublicationsTabsProps {
	currentTab: PUBLICATION_TYPES;
	onTabChange: (_tab: PUBLICATION_TYPES) => void;
}

const tabs = [
	{ name: 'Change of name', tab: PUBLICATION_TYPES.CHANGE_OF_NAME },
	{ name: 'Loss of document', tab: PUBLICATION_TYPES.LOSS_OF_DOCUMENT },
	{ name: 'Public Notice', tab: PUBLICATION_TYPES.PUBLIC_NOTICE },
	{ name: 'Obituary', tab: PUBLICATION_TYPES.OBITUARY },
	// { name: 'Affidavit', tab: PUBLICATION_TYPES.AFFIDAVIT },
];

const AdminPublicationsTabs: React.FC<AdminPublicationsTabsProps> = ({
	currentTab,
	onTabChange,
}) => {
	return (
		<div className="flex items-center space-x-[75px]">
			{tabs.map((tab) => (
				<button
					type="button"
					key={tab.tab}
					onClick={() => onTabChange(tab.tab)}
					className={clsx(
						'border-b-[1.5px] border-b-transparent font-inter text-sm text-575555',
						{
							'!text-7108F6 !border-b-7108F6 !font-semibold': currentTab === tab.tab,
						}
					)}>
					{tab.name}
				</button>
			))}
		</div>
	);
};

export default AdminPublicationsTabs;
