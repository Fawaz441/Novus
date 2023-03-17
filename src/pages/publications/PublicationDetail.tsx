import { Wrapper } from 'components/navigation';
import React from 'react';
import { ReactComponent as LinkIcon } from 'assets/icons/news/link.svg';
import { ReactComponent as Change } from 'assets/icons/publications/change.svg';
import { ReactComponent as Camera } from 'assets/images/publications/camera.svg';
import {
	DeclineReason,
	EditPublicationModal,
	PublicationStatus,
} from 'components/publications';
import { ReactComponent as PublicationSample } from 'assets/images/publications/sample.svg';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks';
import { MODALS } from 'utils/constants';
import { getRandomBoolean } from 'utils/ui-functions';

const PublicationDetail = () => {
	const navigate = useNavigate();
	const { showModal } = useModal();
	const isApproved = getRandomBoolean();
	return (
		<Wrapper isPublications showPublicationsButton={false}>
			<EditPublicationModal />
			<div className="flex items-center space-x-[41px]">
				<div className="flex items-center space-x-[14px]">
					<Change />
					<span className="font-semibold text-black text-sm">
						Change Of Name
					</span>
				</div>
				<div className="flex items-center space-x-5">
					<PublicationStatus status={isApproved ? 'approved' : 'declined'} />
					{!isApproved && (
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="text-sm font-bold text-black"
						>
							Back
						</button>
					)}
				</div>
			</div>
			<div className="mt-7 flex space-x-[31px]">
				<div className="flex-shrink-0 h-[175px] w-[169px] bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
					<Camera />
					<p className="max-w-[82px] text-12 text-center text-black">
						Passport Photograph
					</p>
				</div>
				<div>
					<h3 className="font-medium text-xl leading-[23.48px] text-black">
						<span className="font-bold">CHANGE OF NAME :</span> Mrs Deborah
						Barak
					</h3>
					{isApproved ? (
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-10 mt-[31px] mb-[34px]">
								<div className="flex items-center space-x-[7px]">
									<span className="text-12 leading-[14.09px] text-black">
										Date :
									</span>
									<span className="text-sm font-bold leading-[16.44px] text-575555">
										13 Jan 2023
									</span>
								</div>
								<div className="flex items-center space-x-[7px]">
									<span className="text-12 leading-[14.09px] text-black">
										By :
									</span>
									<span className="text-sm font-bold leading-[16.44px] text-575555">
										Novus News
									</span>
								</div>
								<div className="flex items-center space-x-[7px]">
									<span className="text-12 leading-[14.09px] text-black">
										Paper :
									</span>
									<span className="text-sm font-bold leading-[16.44px] text-575555">
										Vanguard, 4 weeks from approval
									</span>
								</div>
							</div>
							<button className="flex items-center space-x-2">
								<div className="h-[30px] w-[30px] rounded-full bg-F4F4F4 border border-575555 flex items-center justify-center">
									<LinkIcon className="stroke-575555" />
								</div>
								<span className="font-medium text-12 text-[#1E1E1E]">
									Copy Link
								</span>
							</button>
						</div>
					) : (
						<button
							type="button"
							onClick={() => showModal(MODALS.EDIT_PUBLICATION)}
							className="mt-[26px] text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 mb-[18px] bg-EEEEEE flex items-center justify-center"
						>
							Edit Publication
						</button>
					)}
					<p className="max-w-[960px] text-black leading-6">
						“I, formerly known and addressed as Miss Victoria Vihimga Iyorkaa,
						henceforth wish to be known and addressed as Mrs. Victoria Vihimga
						Terseer Gundu. All former documents remain valid. Federal Inland
						Revenue Service (FIRS) Management and the general public to take
						note”
					</p>
				</div>
			</div>
			<div className="mt-8 flex space-x-[250px] mb-8">
				<PublicationSample className="flex-shrink-0" />
				{!isApproved && <DeclineReason />}
			</div>
		</Wrapper>
	);
};

export default PublicationDetail;
