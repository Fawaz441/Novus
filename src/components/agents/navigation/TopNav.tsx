import React from 'react';
import { ReactComponent as Notifications } from 'assets/icons/agents/notifications.svg';
import samplePicture from 'assets/images/agents/sample-picture.png';

const TopNav = () => {
	return (
		<div className="fixed top-0 h-[90px] w-full bg-white z-[20] right-0 pl-[244px] pr-11 flex items-center justify-between">
			<p className="font-semibold text-12 text-black">
				Thursday, 3rd March, 2023
			</p>
			<div className="flex items-center space-x-[29px]">
				<div className="flex items-center space-x-4">
					<div className="h-[58px] w-[58px] rounded-full overflow-hidden">
						<img
							className="h-full w-full object-cover"
							alt="profile"
							src={samplePicture}
						/>
					</div>
					<p className="font-inter text-black text-sm">
						Tolani <span className="font-bold">Chukwudi</span>
					</p>
					<div className="h-[39px] bg-black rounded-6 px-5 flex items-center justify-center">
						<span className="text-08F692 text-12 font-bold">verified</span>
					</div>
				</div>
				<Notifications />
			</div>
		</div>
	);
};

export default TopNav;
