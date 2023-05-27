import React, { useEffect, useState } from 'react';
import clsx from 'classnames';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Exit } from 'assets/icons/exit.svg';
import { NavLink } from 'react-router-dom';
import { MOBILE_AGENT_SIDENAV, STORAGE_KEYS, routes } from 'utils/constants';
import { ReactComponent as Dashboard } from 'assets/icons/agents/dashboard.svg';
import { ReactComponent as Commission } from 'assets/icons/agents/commission.svg';
import { ReactComponent as Settings } from 'assets/icons/agents/settings.svg';
import { ReactComponent as Add } from 'assets/icons/agents/add.svg';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { ReactComponent as Dropdown } from 'assets/icons/agents/dropdown.svg';
import { retrieveFromLS, storeToLS } from 'utils/functions';
import { toggleHiddenElement } from 'utils/ui-functions';

const mainLinks = [
	{ path: routes.agents.dashboard, icon: <Dashboard />, text: 'Dashboard' },
	{ path: routes.agents.commission, icon: <Commission />, text: 'Commission' },
	{ path: routes.agents.settings, icon: <Settings />, text: 'Settings' },
];

const mobileNavLinks = [
	{ name: 'Dashboard', icon: <Dashboard />, route: routes.agents.dashboard },
	{ name: 'Commission', route: routes.agents.commission, icon: <Commission /> },
	{
		name: 'Settings',
		route: routes.agents.settings,
		icon: <Settings />,
	},
	{
		name: 'Create Publication',
		icon: <Add />,
		route: `${routes.pub_forms.mobile_check_or_create}?create=true`,
	},
	{
		name: 'Check Publication',
		path: routes.agents.check_publications,
		icon: <Check />,
	},
	{ name: 'Enlist Agents', route: routes.agents.enlist, icon: <Add /> },
	{ path: routes.agents.dashboard, icon: <Check />, text: 'View Agents' },
];

const publicationLinks = [
	{
		path: routes.agents.publications,
		icon: <Check />,
		text: 'My Publications',
	},
	{
		path: routes.agents.new_publication,
		icon: <Add />,
		text: 'Create Publication',
	},
	{
		path: routes.agents.check_publications,
		icon: <Check />,
		text: 'Check Publication',
	},
];

const agentLinks = [
	{ path: routes.agents.enlist, icon: <Add />, text: 'Enlist Agents' },
	{ path: routes.agents.dashboard, icon: <Check />, text: 'View Agents' },
];

const getClassNames = (isActive: boolean) =>
	clsx(
		'flex items-center space-x-[19px] inactive-agent-navlink text-9B9B9B text-12',
		{
			'!text-7108F6 !text-sm active-agent-navlink font-semibold': isActive,
		}
	);

const SideNav = () => {
	const [showPubLinks, setShowPubLinks] = useState(() =>
		retrieveFromLS(STORAGE_KEYS.SHOW_NOVUS_PUBLICATION_LINKS, true)
	);
	const [showAgentLinks, setShowAgentLinks] = useState(() =>
		retrieveFromLS(STORAGE_KEYS.SHOW_NOVUS_AGENT_LINKS, true)
	);

	const toggleLinks = (shouldDisplay: boolean, link_type: 'pub' | 'agent') => {
		if (link_type === 'pub') {
			setShowPubLinks(shouldDisplay);
			storeToLS(STORAGE_KEYS.SHOW_NOVUS_PUBLICATION_LINKS, shouldDisplay);
		}
		if (link_type === 'agent') {
			setShowAgentLinks(shouldDisplay);
			storeToLS(STORAGE_KEYS.SHOW_NOVUS_AGENT_LINKS, shouldDisplay);
		}
	};

	useEffect(() => {
		const lastScrollPos = retrieveFromLS(
			STORAGE_KEYS.NOVUS_AGENT_SCROLLBAR_POS
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
			storeToLS(STORAGE_KEYS.NOVUS_AGENT_SCROLLBAR_POS, lastScrollPos);
		}
	};
	const hideMobileNav = () => toggleHiddenElement(MOBILE_AGENT_SIDENAV, 'hide');

	return (
		<div>
			<div
				id="agent-sidenav"
				className="hidden lg:block fixed left-0 top-0 h-screen z-[30] w-[211px] border border-EEEEEE bg-white rounded-tr-6 rounded-br-6">
				<div
					className="h-screen overflow-y-auto scrollbar-hide"
					id="agent-sidenav-inner"
					onScroll={onScroll}>
					<div className="pt-7 pl-7 flex items-center space-x-[14px]">
						<div className="bg-7108F6 w-10 h-[37.14px] rounded flex items-center justify-center">
							<span className="text-white text-base font-bold">N</span>
						</div>
						<div className="flex flex-col space-y-[6px]">
							<p className="text-sm text-black leading-[14px]">
								Novus <span className="font-bold">Agent</span>
							</p>
							<span className="text-9B9B9B text-12 leading-[14px]">
								#23DE12
							</span>
						</div>
					</div>
					<div className="mt-[110.86px] flex flex-col space-y-[46px] pl-9 pb-[35px] border-b border-b-D9D9D9">
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
					{/* publication links */}
					<div className="py-[34px] bg-white z-[2] pl-9 transition-all duration-[400] border-b border-b-D9D9D9">
						<button
							type="button"
							onClick={() => toggleLinks(!showPubLinks, 'pub')}
							className={clsx(
								'flex pb-[39px] transition-all duration-[400] items-center font-semibold text-sm leading-[18.2px] text-575555 space-x-[11.8px]',
								{
									'!pb-0': !showPubLinks,
								}
							)}>
							<span>Publication</span>
							<Dropdown
								className={clsx(
									{ 'rotate-180': !showPubLinks },
									'transition duration-150'
								)}
							/>
						</button>
						<div
							className={clsx(
								'flex flex-col max-h-[300px] space-y-[46px] transition-all duration-[400]',
								{
									'!max-h-0 overflow-hidden': !showPubLinks,
								}
							)}>
							{publicationLinks.map((mainLink, index) => (
								<NavLink
									key={index}
									to={mainLink.path}
									className={({ isActive }) => getClassNames(isActive)}>
									{mainLink.icon}
									<span>{mainLink.text}</span>
								</NavLink>
							))}
						</div>
					</div>
					{/* agent links */}
					<div className="pt-[34px] pb-[60px]  pl-9  border-b border-b-D9D9D9">
						<button
							type="button"
							onClick={() => toggleLinks(!showAgentLinks, 'agent')}
							className={clsx(
								'flex pb-[39px] transition-all duration-[400] items-center font-semibold text-sm leading-[18.2px] text-575555 space-x-[11.8px]',
								{
									'!pb-0': !showAgentLinks,
								}
							)}>
							<span>Agents</span>
							<Dropdown
								className={clsx(
									{ 'rotate-180': !showAgentLinks },
									'transition duration-150'
								)}
							/>
						</button>
						<div
							className={clsx(
								'flex flex-col max-h-[100px] space-y-[46px] transition-all duration-150',
								{
									'!max-h-0 overflow-hidden': !showAgentLinks,
								}
							)}>
							{agentLinks.map((mainLink, index) => (
								<NavLink
									key={index}
									to={mainLink.path}
									className={({ isActive }) => getClassNames(isActive)}>
									{mainLink.icon}
									<span>{mainLink.text}</span>
								</NavLink>
							))}
						</div>
					</div>
					<div className="absolute pb-[30px] pt-[10px] bg-white flex items-center space-x-2 justify-center bottom-0 z-[3] left-0 w-full">
						<div className="h-[14px] w-[14px] rounded-full border-[0.2px] border-575555 flex items-center justify-center">
							<span className="text-10 text-black">c</span>
						</div>
						<span className="text-10 text-575555">Novus, 2023</span>
					</div>
				</div>
			</div>
			<div
				id="mobile-agent-sidenav"
				className="transition-all duration-300 block shadow-[0_1px_10px_1px_rgba(0,0,0,0.25)] mini:hidden w-[229px] bg-F9F9F9 fixed left-[-300px] top-0 h-screen z-[10000] pt-[18px]">
				<Logo className="pl-[17px] mb-[92px]" />
				<button
					className="absolute top-[25px] right-[21px]"
					onClick={hideMobileNav}>
					<Exit />
				</button>
				<ul className="flex flex-col space-y-[30px] pl-[25px]">
					{mobileNavLinks.map((link, index) => {
						if (link.route) {
							return (
								<li key={index}>
									<NavLink
										onClick={hideMobileNav}
										to={link.route}
										className={({ isActive }) => getClassNames(isActive)}>
										<div className="flex space-x-[21px] items-center">
											{link.icon}
											<p>{link.name}</p>
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
