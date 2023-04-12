import React, { useState } from 'react';
import clsx from 'classnames';
import { NavLink } from 'react-router-dom';
import { STORAGE_KEYS, routes } from 'utils/constants';
import { ReactComponent as Dashboard } from 'assets/icons/agents/dashboard.svg';
import { ReactComponent as Commission } from 'assets/icons/agents/commission.svg';
import { ReactComponent as Settings } from 'assets/icons/agents/settings.svg';
import { ReactComponent as Add } from 'assets/icons/agents/add.svg';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { ReactComponent as Dropdown } from 'assets/icons/agents/dropdown.svg';
import { retrieveFromLS, storeToLS } from 'utils/functions';

const mainLinks = [
	{ path: routes.agents.dashboard, icon: <Dashboard />, text: 'Dashboard' },
	{ path: routes.agents.commission, icon: <Commission />, text: 'Commission' },
	{ path: routes.agents.settings, icon: <Settings />, text: 'Settings' },
];

const publicationLinks = [
	{ path: routes.agents.dashboard, icon: <Add />, text: 'Create Publication' },
	{ path: routes.agents.dashboard, icon: <Check />, text: 'Check Publication' },
];

const agentLinks = [
	{ path: routes.agents.dashboard, icon: <Add />, text: 'Enlist Agents' },
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

	return (
		<div className="fixed left-0 top-0 h-screen z-[30] w-[211px] border border-EEEEEE bg-white rounded-tr-6 rounded-br-6">
			<div className="h-screen overflow-y-auto scrollbar-hide">
				<div className="pt-7 pl-7 flex items-center space-x-[14px]">
					<div className="bg-7108F6 w-10 h-[37.14px] rounded flex items-center justify-center">
						<span className="text-white text-base font-bold">N</span>
					</div>
					<div className="flex flex-col space-y-[6px]">
						<p className="text-sm text-black leading-[14px]">
							Novus <span className="font-bold">Agent</span>
						</p>
						<span className="text-9B9B9B text-12 leading-[14px]">#23DE12</span>
					</div>
				</div>
				<div className="mt-[110.86px] flex flex-col space-y-[46px] pl-9 pb-[35px] border-b border-b-D9D9D9">
					{mainLinks.map((mainLink, index) => (
						<NavLink
							key={index}
							to={mainLink.path}
							className={({ isActive }) => getClassNames(isActive)}
						>
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
						)}
					>
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
							'flex flex-col max-h-[100px] space-y-[46px] transition-all duration-[400]',
							{
								'!max-h-0 overflow-hidden': !showPubLinks,
							}
						)}
					>
						{publicationLinks.map((mainLink, index) => (
							<NavLink
								key={index}
								to={mainLink.path}
								className={({ isActive }) => getClassNames(isActive)}
							>
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
						)}
					>
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
						)}
					>
						{agentLinks.map((mainLink, index) => (
							<NavLink
								key={index}
								to={mainLink.path}
								className={({ isActive }) => getClassNames(isActive)}
							>
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
	);
};

export default SideNav;
