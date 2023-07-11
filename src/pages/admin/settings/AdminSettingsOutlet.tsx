import { Wrapper } from 'components/admin/navigation';
import React from 'react';
import clsx from 'classnames';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { routes } from 'utils/constants';

const links = [
	{ path: routes.admin.settings.roles, text: 'Create Roles' },
	{ path: routes.admin.settings.edit_role, text: 'Edit Roles' },
	{ path: routes.admin.settings.nis_settings, text: 'NIS' },
	{
		path: routes.admin.settings.newspaper,
		text: 'Newspaper',
	},
	{ path: routes.admin.settings.security, text: 'Security' },
];

const AdminSettingsOutlet = () => {
	const { pathname } = useLocation();
	return (
		<Wrapper wrapperClassName="!px-0">
			<div className="flex  pt-[85.81px]">
				<div className="flex flex-shrink-0 flex-col space-y-[38px]">
					{links.map((link, index) => (
						<NavLink
							to={link.path}
							key={index}
							className={({ isActive }) =>
								clsx(
									'text-black flex space-x-[30px] items-center',
									{
										'!text-7108F6 admin-setting-nav-active font-semibold':
											link.path === routes.admin.settings.roles
												? pathname === '/management/settings'
												: isActive,
									},
									{
										'admin-setting-nav-inactive':
											link.path === routes.admin.settings.roles
												? pathname !== '/management/settings'
												: !isActive,
									}
								)
							}>
							<div />
							<span className="mb-[-3px]">{link.text}</span>
						</NavLink>
					))}
				</div>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</Wrapper>
	);
};

export default AdminSettingsOutlet;
