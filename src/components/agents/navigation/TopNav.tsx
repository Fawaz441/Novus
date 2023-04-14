import React from 'react';
import { ReactComponent as Notifications } from 'assets/icons/agents/notifications.svg';
import samplePicture from 'assets/images/agents/sample-picture.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';
import { ReactComponent as Withdraw } from 'assets/icons/agents/withdraw.svg';

const TopNav = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	return (
		<div className="fixed top-0 border-b border-b-[#ccc]/[.1] h-[90px] w-full bg-white z-[20] right-0 pl-[244px] pr-11 flex items-center justify-between">
			<p className="font-semibold text-12 text-black">
				Thursday, 3rd March, 2023
			</p>
			<div className="flex items-center">
				{pathname === routes.agents.commission && (
					<button
						type="button"
						onClick={() => navigate(routes.agents.withdraw_commission)}
						className="flex items-center bg-7108F6 rounded-6 mr-[35px] py-[15px] px-3 justify-center space-x-[19.66px]"
					>
						<Withdraw />
						<span className="text-white text-base leading-[20.8px]">
							Withdraw <span className="font-bold">Commissions</span>
						</span>
					</button>
				)}
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
		</div>
	);
};

export default TopNav;
