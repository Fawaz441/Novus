import React from 'react';
import { ReactComponent as Notifications } from 'assets/icons/agents/notifications.svg';
import { MOBILE_ADMIN_SIDENAV } from 'utils/constants';
import { ReactComponent as Hamburger } from 'assets/icons/agents/hamburger.svg';
import { toggleHiddenElement } from 'utils/ui-functions';
import moment from 'moment';

const TopNav = () => {
	return (
		<div className="fixed top-0 border-b border-b-[#ccc]/[.1] h-[60px] lg:h-[90px] w-full bg-white z-[20] right-0 px-9 lg:pl-[244px] lg:pr-11 flex items-center justify-between">
			<p className="font-semibold text-12 text-black hidden lg:block">
				{moment(new Date()).format('dddd, Do MMM, YYYY')}
			</p>
			<div className="hidden items-center lg:flex">
				<div className="flex items-center space-x-[29px]">
					<div className="h-[39px] bg-black rounded-6 px-5 flex items-center justify-center">
						<span className="text-08F692 text-12 font-bold">verified</span>
					</div>
					<Notifications />
				</div>
			</div>
			<div className="lg:hidden flex items-center space-x-3">
				<div className="w-10 h-[37.14px] bg-7108F6 rounded-sm flex items-center justify-center">
					<span className="text-base font-bold leading-[20.8px] text-white">
						E
					</span>
				</div>
				<div className="flex flex-col space-y-[6px]">
					<p className="text-black text-sm leading-[14px]">
						Epitome <span className="font-medium">Agent</span>
					</p>
					<span className="text-12 text-9B9B9B leading-[12px]">#23DE12</span>
				</div>
			</div>
			<div className="lg:hidden flex items-center space-x-6">
				<button
					onClick={() => toggleHiddenElement(MOBILE_ADMIN_SIDENAV, 'show')}>
					<Hamburger />
				</button>
			</div>
		</div>
	);
};

export default TopNav;
