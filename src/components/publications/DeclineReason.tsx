import React from 'react';

interface DeclineReasonProps {
	isAgent?: boolean;
}

const DeclineReason: React.FC<DeclineReasonProps> = ({ isAgent }) => {
	return (
		<div className="rounded-6 bg-F4F4F4 py-4 mini:py-[26px] px-[17px] mini:px-[22px] self-start max-w-[384px]">
			<div>
				<div className="flex items-center justify-between">
					<h4 className="font-bold text-[12px] leading-[14.09px] mini:text-sm mini:leading-[16.44px]">
						Why was it declined ?
					</h4>
					<div className="rounded-3 bg-FF012F text-[12px] mini:text-base text-white py-[11px] px-6">
						NOTE
					</div>
				</div>
				<p className="mt-[21px] text-[12px] leading-[18px] mini:text-sm mini:leading-[21px] text-black">
					Details on the document didn&apos;t matched what were in these fields
					; FIRSTNAME and LASTNAME
				</p>
				<p className="mt-6 text-[12px] leading-[14.09px] text-9B9B9B mini:text-sm mini:leading-[16.44px] font-semibold">
					You can edit the publication for re-submission by clicking on the edit
					publication button
				</p>
			</div>
			{/* agent */}
			<div>
				<div className="flex items-center justify-between mt-8">
					<h4 className="font-bold text-[12px] mini:text-sm leading-[16.44px]">
						Why Zero Commission
					</h4>
				</div>
				<p className="mt-3 mini:mt-[21px] text-[12px] leading-[18px] mini:text-sm mini:leading-[21px] text-black">
					Commissions are paid on successfully approved publication, you are
					advised to get in touch with your client to get the right
					documentation
				</p>
			</div>
		</div>
	);
};

export default DeclineReason;
