import React from 'react';
import clsx from 'classnames';
import { NavLink } from 'react-router-dom';
import { routes } from 'utils/constants';

const links = [
	{ name: 'Change Of Name', route: routes.pub_forms.change_of_name },
	{ name: 'Loss Of Document', route: routes.pub_forms.loss_of_document },
	{ name: 'Public Notice', route: routes.pub_forms.public_notice },
	{ name: 'Obituary', route: routes.pub_forms.obituary },
	// { name: 'Affidavit', route: routes.pub_forms.affidavit },
];

const listLinks = [
	{ name: 'Change Of Name', route: routes.change_of_name_publications },
	{ name: 'Loss Of Document', route: routes.lost_document_publications },
	{ name: 'Public Notice', route: routes.public_notice_publications },
	{ name: 'Obituary', route: routes.obituary_publications },
	// { name: 'Affidavit', route: routes.affidavit_publications },
];

const MobileFormsNavigation = ({
	className,
	isForm = true,
}: {
	className?: string;
	isForm?: boolean;
}) => {
	if (isForm) {
		return (
			<div className={clsx('mini:hidden flex items-center pt-2 whitespace-nowrap overflow-x-auto pr-5', className)}>
				{links.map((link, index) => (
					<NavLink
						to={link.route}
						key={index}
						className={({ isActive }) =>
							clsx(
								'bg-transparent px-3 py-[10px] rounded text-575555 text-[10px] font-semibold leading-[11.74px]',
								{
									'!bg-[#F1E7FF] !text-7108F6': isActive,
								}
							)
						}>
						{link.name}
					</NavLink>
				))}
			</div>
		);
	} else {
		return (
			<div
				className={clsx(
					'mini:hidden flex items-center pt-2 fixed top-[60px] w-full pb-2 left-0 pl-[17px] bg-white z-[14] whitespace-nowrap overflow-x-auto pr-5',
					className
				)}>
				{listLinks.map((link, index) => (
					<NavLink
						to={link.route}
						key={index}
						className={({ isActive }) =>
							clsx(
								'bg-transparent px-3 py-[10px] rounded text-575555 text-[10px] font-semibold leading-[11.74px]',
								{
									'!bg-[#F1E7FF] !text-7108F6': isActive,
								}
							)
						}>
						{link.name}
					</NavLink>
				))}
			</div>
		);
	}
};

export default MobileFormsNavigation;
