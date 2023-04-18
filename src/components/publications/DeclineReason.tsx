import React from 'react';

interface DeclineReasonProps {
	isAgent?: boolean;
}

const DeclineReason: React.FC<DeclineReasonProps> = ({ isAgent }) => {
	return (
		<div className="rounded-6 bg-F4F4F4 py-[26px] px-[22px] self-start max-w-[384px]">
			<div>
				<div className="flex items-center justify-between">
					<h4 className="font-bold text-sm leading-[16.44px]">
						Why was it declined ?
					</h4>
					<div className="rounded-3 bg-FF012F text-white py-[11px] px-6">
						NOTE
					</div>
				</div>
				<p className="mt-[21px] text-sm leading-[21px] text-black">
					Details on the document didn&apos;t matched what were in these fields
					; FIRSTNAME and LASTNAME
				</p>
				<p className="mt-6 text-9B9B9B text-sm leading-[16.44px] font-semibold">
					You can edit the publication for re-submission by clicking on the edit
					publication button
				</p>
			</div>
			{/* agent */}
			<div>
				<div className="flex items-center justify-between">
					<h4 className="font-bold text-sm leading-[16.44px]">
						Why Zero Commission
					</h4>
				</div>
				<p className="mt-[21px] text-sm leading-[21px] text-black">
					Commissions are paid on successfully approved publication, you are
					advised to get in touch with your client to get the right
					documentation
				</p>
			</div>
		</div>
	);
};

export default DeclineReason;
