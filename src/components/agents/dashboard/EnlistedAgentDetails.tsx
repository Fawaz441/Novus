import { Modal } from 'components/general';
import React from 'react';
import { MODALS } from 'utils/constants';
import samplePicture from 'assets/images/agents/sample-picture.png';

const EnlistedAgentDetails = () => {
	return (
		<Modal name={MODALS.AGENT_DETAILS}>
			<div className="bg-white rounded-6 border border-F4F4F4 px-[26px] py-[56px] flex space-x-[14px]">
				<div className="h-[58px] w-[58px] rounded-full overflow-hidden">
					<img src={samplePicture} alt="im" className="object-cover" />
				</div>
				<div className="flex flex-col space-y-[22px]">
					<div className="bg-7108F6 rounded-6  flex items-center space-x-[22px] py-[11px] px-[19px]">
						<div className="flex flex-col space-y-[6px]">
							<span className="text-13 leading-[17.68px] text-white">Name</span>
							<span className="font-inter text-base font-bold leading-[21.76px] text-white">
								Anthony Joshua
							</span>
						</div>
						<div className="flex flex-col space-y-[6px]">
							<span className="text-13 leading-[17.68px] text-white">
								Date Registered
							</span>
							<span className="font-inter text-base font-bold leading-[21.76px] text-white">
								12/12/21
							</span>
						</div>
						<div className="flex flex-col space-y-[6px]">
							<span className="text-13 leading-[17.68px] text-white">
								Agent ID
							</span>
							<span className="font-inter text-base font-bold leading-[21.76px] text-white">
								23DVGB4
							</span>
						</div>
					</div>
					<div className="flex flex-col space-y-10">
						<div className="flex space-x-[22px]">
							<div className="flex flex-col space-y-[3px]">
								<span className="font-inter text-12 leading-[16.32px] text-575555">
									Total Publication
								</span>
								<span className="font-inter text-base leading-[21.76px] text-575555 font-semibold">
									2000
								</span>
							</div>
							<div className="flex flex-col space-y-[3px]">
								<span className="font-inter text-12 leading-[16.32px] text-575555">
									Commission Earned
								</span>
								<span className="font-inter text-base leading-[21.76px] text-575555 font-semibold">
									20k
								</span>
							</div>
							<div className="flex flex-col space-y-[3px]">
								<span className="font-inter text-12 leading-[16.32px] text-575555">
									Agent Status
								</span>
								<div className="flex-shrink-0 h-[30px] flex items-center justify-center bg-[#E9FFF6] rounded-3 w-[122px]">
									<span className="font-medium text-12 text-[#009A49] leading-[20.09px]">
										Active
									</span>
								</div>
							</div>
						</div>
						<div className="flex space-x-[22px]">
							<div className="flex flex-col space-y-[3px]">
								<span className="font-inter text-12 leading-[16.32px] text-575555">
									Phone number
								</span>
								<span className="font-inter text-base leading-[21.76px] text-575555 font-semibold">
									0802347474
								</span>
							</div>
							<div className="flex flex-col space-y-[3px]">
								<span className="font-inter text-12 leading-[16.32px] text-575555">
									Email
								</span>
								<span className="font-inter text-base leading-[21.76px] text-575555 font-semibold">
									email@email.com
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default EnlistedAgentDetails;
