import React, { useEffect } from 'react';
import clsx from 'classnames';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Exit } from 'assets/icons/exit.svg';
import { NavLink } from 'react-router-dom';
import { MOBILE_ADMIN_SIDENAV, STORAGE_KEYS, routes } from 'utils/constants';
import { ReactComponent as Dashboard } from 'assets/icons/agents/dashboard.svg';
import { ReactComponent as Commission } from 'assets/icons/agents/commission.svg';
import { ReactComponent as Settings } from 'assets/icons/agents/settings.svg';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { retrieveFromLS, storeToLS } from 'utils/functions';
import { toggleHiddenElement } from 'utils/ui-functions';

const mainLinks = [
	{ path: routes.admin.dashboard, icon: <Dashboard />, text: 'Dashboard' },
	{ path: routes.admin.dashboard, icon: <Commission />, text: 'Commission' },
	{ path: routes.admin.dashboard, icon: <Check />, text: 'Coordinators' },
	{ path: routes.admin.dashboard, icon: <Check />, text: 'Agents' },
	{ path: routes.admin.settings.index, icon: <Settings />, text: 'Settings' },
];


const getClassNames = (isActive: boolean) =>
	clsx(
		'flex items-center space-x-[19px] inactive-agent-navlink text-9B9B9B text-12',
		{
			'!text-7108F6 !text-sm active-agent-navlink font-semibold': isActive,
		}
	);

const SideNav = () => {

	useEffect(() => {
		const lastScrollPos = retrieveFromLS(
			STORAGE_KEYS.NOVUS_ADMIN_SCROLLBAR_POS
		);
		if (lastScrollPos) {
			const inner = document.getElementById('agent-sidenav-inner');
			if (inner) {
				inner.scrollTop = lastScrollPos;
			}
		}
	}, []);

	const onScroll = () => {
		const inner = document.getElementById('agent-sidenav-inner');
		if (inner) {
			const lastScrollPos = inner.scrollTop;
			storeToLS(STORAGE_KEYS.NOVUS_ADMIN_SCROLLBAR_POS, lastScrollPos);
		}
	};
	const hideMobileNav = () => toggleHiddenElement(MOBILE_ADMIN_SIDENAV, 'hide');

	return (
		<div>
			<div
				id="admin-sidenav"
				className="hidden lg:block fixed left-0 top-0 h-screen z-[30] w-[211px] border border-EEEEEE bg-white rounded-tr-6 rounded-br-6">
				<div
					className="h-screen overflow-y-auto scrollbar-hide"
					id="admin-sidenav-inner"
					onScroll={onScroll}>
					<div className="pt-7 pl-7 flex items-center space-x-[14px]">
						<div className="bg-7108F6 w-10 h-[37.14px] rounded flex items-center justify-center">
							<span className="text-white text-base font-bold">E</span>
						</div>
						<div className="flex flex-col space-y-[6px]">
							<p className="text-sm text-black leading-[14px]">
								Epitome <span className="font-bold">Admin</span>
							</p>
						</div>
					</div>
					<div className="mt-[110.86px] flex flex-col space-y-[46px] pl-9 pb-[35px]">
						{mainLinks.map((mainLink, index) => (
							<NavLink
								key={index}
								to={mainLink.path}
								className={({ isActive }) => getClassNames(isActive)}>
								{mainLink.icon}
								<span>{mainLink.text}</span>
							</NavLink>
						))}
					</div>
					<div className="absolute pb-[30px] pt-[10px] bg-white flex items-center space-x-2 justify-center bottom-0 z-[3] left-0 w-full">
						<div className="h-[14px] w-[14px] rounded-full border-[0.2px] border-575555 flex items-center justify-center">
							<span className="text-10 text-black">c</span>
						</div>
						<span className="text-10 text-575555">The Epitome News, 2023</span>
					</div>
				</div>
			</div>
			<div
				id="mobile-admin-sidenav"
				className="transition-all duration-300 block shadow-[0_1px_10px_1px_rgba(0,0,0,0.25)] mini:hidden w-[229px] bg-F9F9F9 fixed left-[-300px] top-0 h-screen z-[10000] pt-[18px]">
				<Logo className="pl-[17px] mb-[92px]" />
				<button
					className="absolute top-[25px] right-[21px]"
					onClick={hideMobileNav}>
					<Exit />
				</button>
				<ul className="flex flex-col space-y-[30px] pl-[25px]">
					{mainLinks.map((link, index) => {
						if (link.path) {
							return (
								<li key={index}>
									<NavLink
										onClick={hideMobileNav}
										to={link.path}
										className={({ isActive }) => getClassNames(isActive)}>
										<div className="flex space-x-[21px] items-center">
											{link.icon}
											<p>{link.text}</p>
										</div>
									</NavLink>
								</li>
							);
						}
						return null;
					})}
				</ul>
				<div className="absolute bottom-[34px] left-[25px] flex items-center space-x-[54px]">
					<span className="text-13 leading-[15.26px] text-575555">
						About Us
					</span>
					<span className="text-13 leading-[15.26px] text-575555">
						{new Date().getFullYear()}
					</span>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
