import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import suitedMan from 'assets/images/agents/suited-man.png';

const Welcome = () => {
	const navigate = useNavigate();
	return (
		<div className="w-1/2 h-screen fixed left-0 top-0 py-[60px] pl-[124px]">
			<button
				className="flex items-center space-x-3 mb-[67px]"
				onClick={() => navigate('/')}
			>
				<ArrowLeft />
				<span className="text-base font-semibold leading-[20.8px] text-black">
					Back to Novus News
				</span>
			</button>
			<div className="ml-[73px] h-[calc(100vh_-_211px)] max-w-[calc(100%_-_141px)] relative rounded-[10px]">
				<img
					src={suitedMan}
					alt="Suited man"
					className="h-full w-full object-cover rounded-[10px]"
				/>
				<div className="absolute top-0 rounded-[10px] left-0 h-full w-full bg-black/[.8] flex items-center justify-center">
					<div>
						<h4 className="text-[32px] leading-[53.57px] text-white">BECOME</h4>
						<h4 className="text-[32px] leading-[53.57px] text-white">
							A NOVUS <span className="font-bold">AGENT</span>
						</h4>
					</div>
				</div>
				<div className="absolute top-[-33px] left-[-73px] w-[311px] min-h-[135px] rounded-[20px] bg-7108F6 pt-[17px] pb-[21px] pl-[33px] pr-[41px]">
					<div className="flex items-center space-x-[119px]">
						<div className="h-[25px] w-[25px] bg-FBBC05 rounded-full" />
						<span className="text-sm font-semibold leading-[23.44px] text-white">
							Make Posts
						</span>
					</div>
					<div className="mt-[15px] flex flex-col space-y-3">
						<div className="bg-white/[.4] rounded-[6px] h-[10px] w-[60px]" />
						<div className="bg-white rounded-[6px] h-[10px] w-full" />
						<div className="bg-white/[.4] rounded-[6px] h-[10px] w-full" />
					</div>
				</div>
				<div className="extra:block hidden absolute bottom-[13%] right-[-68px] w-[311px] min-h-[135px] rounded-[20px] bg-black pt-[17px] pb-[21px] pl-[33px] pr-[41px]">
					<div className="flex items-center space-x-[91px]">
						<div className="h-[25px] w-[25px] bg-FBBC05 rounded-full" />
						<span className="text-sm font-semibold leading-[23.44px] text-white">
							Earn Commissions
						</span>
					</div>
					<div className="mt-[15px] flex flex-col space-y-3">
						<div className="bg-white/[.4] rounded-[6px] h-[10px] w-[60px]" />
						<div className="bg-white rounded-[6px] h-[10px] w-full" />
						<div className="bg-white/[.4] rounded-[6px] h-[10px] w-full" />
					</div>
				</div>
			</div>
			<div className="extra:hidden block absolute bottom-[30px] right-0 w-[311px] min-h-[135px] rounded-[20px] bg-black pt-[17px] pb-[21px] pl-[33px] pr-[41px]">
				<div className="flex items-center space-x-[91px]">
					<div className="h-[25px] w-[25px] bg-FBBC05 rounded-full" />
					<span className="text-sm font-semibold leading-[23.44px] text-white">
						Earn Commissions
					</span>
				</div>
				<div className="mt-[15px] flex flex-col space-y-3">
					<div className="bg-white/[.4] rounded-[6px] h-[10px] w-[60px]" />
					<div className="bg-white rounded-[6px] h-[10px] w-full" />
					<div className="bg-white/[.4] rounded-[6px] h-[10px] w-full" />
				</div>
			</div>
		</div>
	);
};

export default Welcome;
