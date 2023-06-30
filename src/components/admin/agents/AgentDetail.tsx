import React from 'react';

const AgentDetail = () => {
	return (
		<div>
			<div className="flex flex-col space-y-[25px]">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-[13px]">
						<div className="h-[58px] w-[58px] rounded-full bg-gray-200 flex-shrink-0" />
						<span className="font-inter font-bold text-sm text-575555">
							Anthony Joshua
						</span>
					</div>
					<div className="py-2 px-[30px] rounded-3 bg-[#E9FFF6] flex items-center justify-center">
						<span className="font-inter text-sm font-medium text-[#009A49]">
							Active
						</span>
					</div>
				</div>
				<div className="flex flex-col space-y-[15px]">
					<div className="flex justify-between items-center px-[26px] py-7 rounded-6 bg-[#4285F4]">
						<div className="flex flex-col space-y-[7px]">
							<span className="text-center font-inter text-12 text-white">
								Email
							</span>
							<span className="text-white text-center font-semibold font-inter text-sm">
								email@email.com
							</span>
						</div>
						<div className="flex flex-col space-y-[7px]">
							<span className="text-center font-inter text-12 text-white">
								Date Registered
							</span>
							<span className="text-white text-center font-semibold font-inter text-sm">
								20k
							</span>
						</div>
						<div className="flex flex-col space-y-[7px]">
							<span className="text-center font-inter text-12 text-white">
								Agent ID
							</span>
							<span className="text-white text-center font-semibold font-inter text-sm">
								23DVGB4
							</span>
						</div>
					</div>
					<div className="flex justify-between items-center px-[26px] py-7 rounded-6 bg-[#4285F4]">
						<div className="flex flex-col space-y-[7px]">
							<span className="text-center font-inter text-12 text-white">
								Total Publication
							</span>
							<span className="text-white text-center font-semibold font-inter text-sm">
								2000
							</span>
						</div>
						<div className="flex flex-col space-y-[7px]">
							<span className="text-center font-inter text-12 text-white">
								Commission Earned
							</span>
							<span className="text-white text-center font-semibold font-inter text-sm">
								20k
							</span>
						</div>
						<div className="flex flex-col space-y-[7px]">
							<span className="text-center font-inter text-12 text-white">
								Phone number
							</span>
							<span className="text-white text-center font-semibold font-inter text-sm">
								0802347474
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-9 flex justify-between items-center mx-auto max-w-[474px]">
				<button className="border-[0.5px] border-black w-[200px] bg-white font-semibold text-12 h-10">
					Revoke Access
				</button>
				<button className="bg-black w-[200px] text-white font-semibold text-12 h-10">
					View Commission
				</button>
			</div>
		</div>
	);
};

export default AgentDetail;
