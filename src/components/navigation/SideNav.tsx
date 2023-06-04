import React from 'react';
import { ReactComponent as Google } from 'assets/icons/google.svg';
import { ReactComponent as Exit } from 'assets/icons/exit.svg';
import clsx from 'classnames';
import { MOBILE_SIDENAV, routes } from 'utils/constants';
import { NavLink } from 'react-router-dom';
import { toggleHiddenElement } from 'utils/ui-functions';

const mobileNavLinks = [
	{ name: 'News Feed', route: routes.home },
	{ name: 'Classified Ads', route: routes.change_of_name_publications },
	{
		name: 'Check Publication',
		route: `${routes.pub_forms.mobile_check_or_create}?check=true`,
	},
	{
		name: 'Create Publication',
		route: `${routes.pub_forms.mobile_check_or_create}?create=true`,
	},
	{ name: 'Affidavit', route: routes.pub_forms.change_of_name },
	{ name: 'Agents', route: routes.agents.login },
];

const SideNav: React.FC = () => {
	const hideMobileNav = () => toggleHiddenElement(MOBILE_SIDENAV, 'hide');
	return (
		<div>
			<div className="w-[199px] hidden mini:block scrollbar-hide overflow-hidden fixed h-screen top-0 left-0 overflow-y-auto bg-white pt-[94px] pl-[23px]">
				<div className="w-[176px] h-[90px] border-[0.5px] border-9B9B9B rounded-6 bg-white flex items-center justify-center space-x-[13px]">
					<div className="border border-EEEEEE h-11 w-11 rounded-full flex items-center justify-center">
						<Google />
					</div>
					<div className="flex flex-col space-y-[6px]">
						<span className="text-12 text-black leading-[14.09px]">Source</span>
						<h4 className="font-bold text-sm leading-[16.44px]">Google Inc.</h4>
					</div>
				</div>
				<div className="ml-[29px]">
					<h3 className="font-bold text-[18px] text-black mt-[31px] mb-[26px]">
						Category
					</h3>
					<ul className="flex flex-col space-y-5">
						<li>
							<span className="font-bold text-sm text-7108F6">Finance</span>
						</li>
						<li>
							<span className="text-sm text-575555">Politics</span>
						</li>
						<li>
							<span className="text-sm text-575555">Sports</span>
						</li>
						<li>
							<span className="text-sm text-575555">Media</span>
						</li>
						<li>
							<span className="text-sm text-575555">Energy</span>
						</li>
						<li>
							<span className="text-sm text-575555">Tourism</span>
						</li>
					</ul>
					<div className="mt-[64px] mb-4 w-[112px] h-[482px]  bg-[#F3F3F3] flex flex-col items-center justify-center">
						<h3 className="text-sm text-575555 font-bold">A</h3>
						<h3 className="text-sm text-575555 font-bold">D</h3>
						<h3 className="text-sm text-575555 font-bold">S</h3>
					</div>
				</div>
			</div>
			<div
				id="mobile-sidenav"
				className="transition-all duration-300 block shadow-[0_1px_10px_1px_rgba(0,0,0,0.25)] mini:hidden w-[229px] bg-F9F9F9 fixed left-[-300px] top-0 h-screen z-[15] pt-[59px]">
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
										className={({ isActive }) =>
											clsx(
												'text-13 font-medium text-575555 leading-[15.26px]',
												{ '!font-semibold': isActive },
												{
													'!text-08F692 !font-semibold':
														link.route === routes.agents.login,
												}
											)
										}>
										{link.name}
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
