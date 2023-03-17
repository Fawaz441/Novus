import { Modal } from 'components/general';
import React from 'react';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { MODALS } from 'utils/constants';

const CheckPublicationModal = () => {
	return (
		<Modal name={MODALS.CHECK_PUBLICATIONS}>
			<div className="max-w-[578px] rounded-6 px-[30px] py-[35px] bg-white border border-faintGray lg:w-[578px]">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-xl leading-[23.48px] text-black">
						NOVUS
					</h3>
					<div className="flex space-x-[6px] items-center">
						<span className="text-faintGray text-sm font-medium leading-[16.44px]">
							Classified Ads Check
						</span>
						<Check className="stroke-faintGray" />
					</div>
				</div>
				<form
					className="mt-[18px] flex flex-col space-y-5"
					onSubmit={(e) => e.preventDefault()}
				>
					<span className="text-12 leading-[14.09px] text-black">
						Please enter publication reference number
					</span>
					<div className="flex items-center space-x-[52px]">
						<div className="h-12 w-full flex items-center px-[15px] lg:w-[291px] max-w-[291px] bg-gray rounded-6">
							<input
								placeholder={'RRT989XXXXX'}
								className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-faintGray text-black text-12 font-medium"
							/>
							<button
								className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
								type="button"
							>
								<Filter className="fill-green stroke-border" />
							</button>
						</div>
						<button
							type="button"
							className="font-semibold text-white text-sm bg-green h-12 w-[179px] rounded-6"
						>
							Go To Publication
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default CheckPublicationModal;
