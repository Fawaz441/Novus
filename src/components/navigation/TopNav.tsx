import React from 'react';
import { ReactComponent as NigerianFlag } from 'assets/icons/nigerian-flag.svg';

interface TopNavProps {
	isPublications?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ isPublications }) => {
	return (
		<div className="fixed w-full left-0 top-0 h-[90px] flex items-center pr-[38px] z-[12] bg-white max-w-extra">
			<div className="w-[199px] pl-[52px]">
				<h4 className="uppercase font-bold text-black text-base">NOVUS</h4>
			</div>
			<div className="flex-1 flex items-center justify-between px-11">
				<ul className="flex items-center space-x-10">
					<li>
						<span className="font-medium text-black text-sm">About Novus</span>
					</li>
					<li>
						<span className="font-medium text-black text-sm">Products</span>
					</li>
					<li>
						<span className="font-semibold text-green text-sm">Agent</span>
					</li>
				</ul>
				<div className="flex items-center">
					<div className="w-[149px] h-[37px] flex items-center justify-center bg-primary2 rounded-6">
						<span className="text-primary font-bold text-12">News Feed</span>
					</div>
					<div className="w-[149px] h-[37px] flex items-center justify-center bg-white rounded-6">
						<span className="text-black font-medium text-12">
							Classified Ads
						</span>
					</div>
					{isPublications && (
						<button className="ml-[30px] extra:ml-[97px] bg-primary rounded-6 h-10 w-[150px] text-white font-bold text-[10px]">
							PUBLICATION
						</button>
					)}
				</div>
				<div className="flex items-center space-x-[11px]">
					<NigerianFlag />
					<span className="font-oswald font-regular text-12 text-black">
						Thursday, 3rd March, 2023
					</span>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
