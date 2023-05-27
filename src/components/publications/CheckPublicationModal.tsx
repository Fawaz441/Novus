import { Modal } from 'components/general';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { MODALS, routes } from 'utils/constants';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks';

const CheckPublicationModal = () => {
	const { closeModal, isVisible } = useModal();
	const inputRef = useRef<HTMLInputElement>(null);
	const [referenceNo, setReferenceNo] = useState('');

	const modalIsVisible = isVisible(MODALS.CHECK_PUBLICATIONS);

	useEffect(() => {
		if (modalIsVisible) {
			inputRef?.current?.focus();
		}
	}, [modalIsVisible]);

	const navigate = useNavigate();
	const goToPublication = () => {
		closeModal();
		navigate(routes.getPubDetailRoute(referenceNo));
	};
	return (
		<Modal name={MODALS.CHECK_PUBLICATIONS}>
			<div className="max-w-[578px] rounded-6 px-[30px] py-[35px] bg-white border border-9B9B9B lg:w-[578px]">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-xl leading-[23.48px] text-black">
						THE EPITOME NEWS
					</h3>
					<div className="flex space-x-[6px] items-center">
						<span className="text-9B9B9B text-sm font-medium leading-[16.44px]">
							Classified Ads Check
						</span>
						<Check className="stroke-9B9B9B" />
					</div>
				</div>
				<form
					className="mt-[18px] flex flex-col space-y-5"
					onSubmit={(e) => e.preventDefault()}>
					<span className="text-12 leading-[14.09px] text-black">
						Please enter publication reference number
					</span>
					<div className="flex items-center space-x-[52px]">
						<div className="flex-shrink-0 h-12 w-full flex items-center px-[15px] lg:w-[291px] max-w-[291px] bg-F9F9F9 rounded-6">
							<input
								placeholder={'RRT989XXXXX'}
								ref={inputRef}
								value={referenceNo}
								onChange={({ target: { value } }) => setReferenceNo(value)}
								className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-9B9B9B text-black text-12 font-medium"
							/>
							<button
								className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
								type="button">
								<Filter className="fill-08F692 stroke-EEEEEE" />
							</button>
						</div>
						{referenceNo?.trim()?.length > 0 && (
							<button
								type="button"
								onClick={goToPublication}
								className="font-semibold text-white text-sm bg-08F692 h-12 w-[179px] rounded-6">
								Go To Publication
							</button>
						)}
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default CheckPublicationModal;
