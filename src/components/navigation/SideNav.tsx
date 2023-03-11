import React from 'react';
import { ReactComponent as Google } from 'assets/icons/google.svg';

const SideNav: React.FC = () => {
	return (
		<div className="w-[199px] scrollbar-hide overflow-hidden fixed h-screen top-0 left-0 overflow-y-auto bg-white pt-[94px] pl-[23px]">
			<div className="w-[176px] h-[90px] border-[0.5px] border-faintGray rounded-6 bg-white flex items-center justify-center space-x-[13px]">
				<div className="border border-border h-11 w-11 rounded-full flex items-center justify-center">
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
						<span className="font-bold text-sm text-primary">Finance</span>
					</li>
					<li>
						<span className="text-sm text-boldGray">Politics</span>
					</li>
					<li>
						<span className="text-sm text-boldGray">Sports</span>
					</li>
					<li>
						<span className="text-sm text-boldGray">Media</span>
					</li>
					<li>
						<span className="text-sm text-boldGray">Energy</span>
					</li>
					<li>
						<span className="text-sm text-boldGray">Tourism</span>
					</li>
				</ul>
				<div className="mt-[64px] mb-4 w-[112px] h-[482px]  bg-[#F3F3F3] flex flex-col items-center justify-center">
					<h3 className="text-sm text-boldGrey font-bold">A</h3>
					<h3 className="text-sm text-boldGrey font-bold">D</h3>
					<h3 className="text-sm text-boldGrey font-bold">S</h3>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
