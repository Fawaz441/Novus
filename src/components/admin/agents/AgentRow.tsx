import React from 'react';
import { getRandomBoolean } from 'utils/ui-functions';

const AgentRow = () => {
	const isActive = getRandomBoolean();
	return (
		<div className="flex items-center">
			<div className="flex items-center space-x-[26px]">
				<div className="h-[58px] w-[58px] rounded-full bg-gray-400" />
				<span className="font-inter text-base text-black">Chinedu Olaitan</span>
			</div>
			<p className="ml-[30px] text-575555 text-12 leading-[20.09px]">23DVGB4</p>
			<p className="ml-6 text-575555 text-12 leading-[20.09px]">
				email@ymail.com
			</p>
			{isActive ? (
				<div className="ml-6 w-[122px] py-[5px] rounded-3 flex items-center justify-center bg-[#E9FFF6]">
					<span className="font-medium  text-12 text-[#009A49]">Active</span>
				</div>
			) : (
				<div className="ml-6 w-[122px] py-[5px] rounded-3 flex items-center justify-center bg-[#F1E7FF]">
					<span className="font-medium text-12 text-7108F6">Inactive</span>
				</div>
			)}
		</div>
	);
};

export default AgentRow;
