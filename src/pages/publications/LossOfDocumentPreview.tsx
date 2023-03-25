import { Wrapper } from 'components/navigation';
import { ReactComponent as Camera } from 'assets/images/publications/camera.svg';
import React, { useEffect } from 'react';
import { PublicationCreationSteps } from 'components/publications';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const LossOfDocumentPreview = () => {
	const navigate = useNavigate();
	const { new_lod_publication } = useSelector(
		(state: RootState) => state.publications
	);

	useEffect(() => {
		if (!new_lod_publication) {
			navigate(-1);
		}
	}, [navigate, new_lod_publication]);

	const getTitle = () =>
		new_lod_publication?.gender === 'female' ? 'Mrs' : 'Mr';

	return (
		<Wrapper isPublications showPublicationsButton={false}>
			<PublicationCreationSteps isLossOfDocument activeStep="preview" />
			<div className="mt-[33px] flex space-x-[31px]">
				<div className="flex-shrink-0 h-[175px] w-[169px] bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
					<Camera />
					<p className="max-w-[82px] text-12 text-center text-black">
						Passport Photograph
					</p>
				</div>
				<div>
					<h3 className="font-medium text-xl leading-[23.48px] text-black">
						<span className="font-bold">LOSS OF DOCUMENT :</span> {getTitle()}{' '}
						{new_lod_publication?.first_name} {new_lod_publication?.last_name}
					</h3>
					<div className="flex items-center justify-between mt-[21px] mb-[23px]">
						<div className="flex items-center space-x-10">
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
						<div className="flex items-center space-y-2 flex-col 2xl:flex-row 2xl:space-x-2 2xl:space-y-0">
							<button
								type="button"
								onClick={() => navigate(routes.pub_forms.loss_of_document)}
								className=" text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 bg-EEEEEE flex items-center justify-center"
							>
								Edit Publication
							</button>
							<button
								type="button"
								onClick={() =>
									navigate(routes.pub_forms.loss_of_document_payment)
								}
								className=" text-white font-semibold ml-6 text-12 py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center"
							>
								Confirm Publication
							</button>
						</div>
					</div>
					<p className="max-w-[960px] text-black leading-6">
						This is to notify the general public, that I , {getTitle()}{' '}
						{new_lod_publication?.first_name} {new_lod_publication?.last_name}{' '}
						of {new_lod_publication?.house_address} lost a{' '}
						{new_lod_publication?.support_id_name} document with Property{' '}
						{new_lod_publication?.id_value}., issued by{' '}
						{new_lod_publication?.issuer_of_item}.The stated document above was
						misplaced on the 17th November, 2018
					</p>
					{new_lod_publication?.physical_description && (
						<div className="mt-[19px] flex flex-col space-y-[6px]">
							<h4 className="font-bold text-black text-sm leading-[16.44px]">
								Extra Details
							</h4>
							<p className="leading-6 text-575555">
								{new_lod_publication?.physical_description}
							</p>
						</div>
					)}
					{new_lod_publication?.reward && (
						<div className="mt-[31px] flex flex-col space-y-[9px]">
							<div className="h-10 w-fit text-sm leading-[16.44px] px-[29px] flex items-center justify-center bg-black rounded-[20px] text-white font-semibold">
								Reward
							</div>
							<p className="text-base text-575555 leading-6">
								{new_lod_publication?.reward}
							</p>
						</div>
					)}
				</div>
			</div>
		</Wrapper>
	);
};

export default LossOfDocumentPreview;
