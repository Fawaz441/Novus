import { Wrapper } from 'components/agents/navigation';
import React from 'react';
import { ReactComponent as Coin } from 'assets/images/agents/coin.svg';
import { CommissionGraph } from 'components/agents/commission';

const Commissions = () => {
	return (
		<Wrapper>
			<div className="mt-[23px] lg:mt-[13px]">
				<h4 className="hidden lg:block text-[18px] font-semibold leading-[23.4px] text-black mb-[26px]">
					Commissions
				</h4>
				<div className="lg:hidden flex items-center justify-between mb-4">
					<p className="font-inter text-12 leading-[15.6px] text-575555">
						Commissions <span className="font-bold">Breakdown</span>
					</p>
					<button className="text-7108F6 text-10 leading-[13px] font-inter font-bold">
						Show Chart
					</button>
				</div>
				<div className="w-full h-[88px] bg-[#4285F4] rounded-6 px-[17.01px] py-[17.84px] flex items-center space-x-11">
					{/* total commission earned */}
					<div className="flex items-center space-x-[21px]">
						<Coin />
						<div className="flex items-center space-x-[5px]">
							<div>
								<span className="block font-bold text-12 leading-[15.6px] text-white">
									Total Commissions
								</span>
								<span className="text-12 text-white">Earned</span>
							</div>
							<h3 className="text-white font-medium text-[30px] leading-[39px]">
								&#8358;200k
							</h3>
						</div>
					</div>
					{/* commissions earned by self */}
					<div className="flex items-center space-x-[27px]">
						<div>
							<span className="block font-bold text-12 leading-[15.6px] text-white">
								Commissions Earned
							</span>
							<span className="text-12 text-white">By Self</span>
						</div>
						<h3 className="text-white font-medium text-[30px] leading-[39px]">
							150k
						</h3>
					</div>
					{/* commissions earned through agents */}
					<div className="flex items-center space-x-[27px]">
						<div>
							<span className="block font-bold text-12 leading-[15.6px] text-white">
								Commissions Earned
							</span>
							<span className="text-12 text-white">Through Agents</span>
						</div>
						<h3 className="text-white font-medium text-[30px] leading-[39px]">
							50k
						</h3>
					</div>
					{/* active period */}
					<div className="flex items-center space-x-[27px]">
						<div>
							<span className="block font-bold text-12 leading-[15.6px] text-white">
								Active
							</span>
							<span className="text-12 text-white">Period</span>
						</div>
						<h3 className="text-white font-medium text-[30px] leading-[39px]">
							100 <span className="text-[10px] leading-[13px]">days</span>
						</h3>
					</div>
				</div>
				<p className="mt-[17px] font-inter text-base leading-[20.8px] text-575555">
					Commissions <span className="font-bold">Breakdown</span>
				</p>
				<CommissionGraph />
			</div>
		</Wrapper>
	);
};

export default Commissions;
