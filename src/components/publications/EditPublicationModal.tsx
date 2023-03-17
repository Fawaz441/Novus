import { Modal } from 'components/general';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { MODALS } from 'utils/constants';
import { useModal } from 'hooks';
import { ReactComponent as Mail } from 'assets/images/publications/mail.svg';

const EditPublicationModal = () => {
	const { closeModal, isVisible } = useModal();
	const inputRef = useRef<HTMLInputElement>(null);
	const [email, setEmail] = useState('');
	const [emailSent, setEmailSent] = useState<boolean>(false);

	const modalIsVisible = isVisible(MODALS.EDIT_PUBLICATION);

	useEffect(() => {
		if (modalIsVisible) {
			inputRef?.current?.focus();
		} else {
			setEmailSent(false);
			setEmail('');
		}
	}, [modalIsVisible]);

	const sendEmail = () => {
		setEmailSent(true);
	};

	return (
		<Modal name={MODALS.EDIT_PUBLICATION}>
			<div className="max-w-[578px] rounded-6 px-[30px] py-[35px] bg-white border border-9B9B9B lg:w-[578px]">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-xl leading-[23.48px] text-black">
						NOVUS
					</h3>
					{emailSent ? (
						<span className="text-9B9B9B font-medium text-12 leading-[14.09px]">
							There&apos;s something in your mailbox
						</span>
					) : (
						<div className="flex space-x-[6px] items-center">
							<span className="text-9B9B9B text-sm font-medium leading-[16.44px]">
								Edit publication
							</span>
							<Check className="stroke-9B9B9B" />
						</div>
					)}
				</div>
				<form
					className="mt-[18px] flex flex-col space-y-5"
					onSubmit={(e) => {
						e.preventDefault();
						sendEmail();
					}}
				>
					{emailSent ? (
						<div className="flex justify-between items-center">
							<p className="text-12 max-w-[358px] leading-[17.09px] text-black">
								A link has been sent to your email, click on the link to edit
								this publication then submit after editing. Re-submission is{' '}
								<span className="font-bold">free</span>
							</p>
							<Mail />
						</div>
					) : (
						<p className="text-12 max-w-[358px] leading-[17.09px] text-black">
							To edit this publication please enter the email address supplied
							while creating this publication or re-enter the reference number
						</p>
					)}
					{!emailSent && (
						<div className="flex items-center space-x-[52px]">
							<div className="flex-shrink-0 h-12 w-full flex items-center px-[15px] lg:w-[291px] max-w-[291px] bg-F9F9F9 rounded-6">
								<input
									placeholder={'abiodun@gmail.com'}
									ref={inputRef}
									value={email}
									onChange={({ target: { value } }) => setEmail(value)}
									className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-9B9B9B text-black text-12 font-medium"
								/>
								<button
									className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
									type="button"
								>
									<Filter className="fill-08F692 stroke-EEEEEE" />
								</button>
							</div>
							{email?.trim()?.length > 0 && (
								<button
									type="submit"
									className="font-semibold text-white text-sm bg-08F692 h-12 w-[179px] rounded-6"
								>
									Send Email
								</button>
							)}
						</div>
					)}
				</form>
				{emailSent && (
					<button
						className="font-medium mt-[2.69px] text-9B9B9B text-12 leading-[14.09px]"
						onClick={closeModal}
					>
						CLOSE
					</button>
				)}
			</div>
		</Modal>
	);
};

export default EditPublicationModal;
