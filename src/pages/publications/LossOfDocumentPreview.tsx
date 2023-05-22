import { Wrapper } from 'components/navigation';
import { ReactComponent as Camera } from 'assets/images/publications/camera.svg';
import React, { useEffect } from 'react';
import {
	MobileFormsNavigation,
	PublicationCreationSteps,
} from 'components/publications';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const LossOfDocumentPreview = () => {
	const navigate = useNavigate();
	const { newLODPublication } = useSelector(
		(state: RootState) => state.publications
	);

	useEffect(() => {
		if (!newLODPublication) {
			navigate(-1);
		}
	}, [navigate, newLODPublication]);

	const getTitle = () =>
		newLODPublication?.gender === 'female' ? 'Mrs' : 'Mr';

	return (
		<Wrapper isPublications showPublicationsButton={false}>
			<div className="mid:hidden">
				<MobileFormsNavigation />
				<div className="flex items-center  mt-[13px] space-x-[38px] justify-between 397px:justify-start">
					<button
						className="text-[10px] leading-[12.19px] text-black"
						onClick={() => navigate(-1)}>
						Back
					</button>
					<div className="flex 397px:items-center flex-col space-y-3 397px:flex-row 397px:space-y-0 397px:space-x-[10px]">
						<button
							type="button"
							onClick={() => navigate(routes.pub_forms.loss_of_document)}
							className=" text-575555 font-semibold text-[10px] py-[10px] px-[25px] rounded-3 bg-EEEEEE flex items-center justify-center">
							Edit Publication
						</button>
						<button
							type="button"
							onClick={() =>
								navigate(routes.pub_forms.loss_of_document_payment)
							}
							className=" text-white font-semibold text-[10px] py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center">
							Confirm Publication
						</button>
					</div>
				</div>
			</div>
			<div className="hidden mini:block">
				<PublicationCreationSteps isLossOfDocument activeStep="preview" />
			</div>
			<div className="mt-[22px] mini:mt-[33px] flex space-x-[31px]">
				<div className="flex-shrink-0 mid:h-[175px] mid:w-[169px] h-[109px] w-[105px] mid:rounded-none rounded-6 bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
					<Camera />
					<p className="max-w-[82px] text-12 text-center text-black">
						Passport Photograph
					</p>
				</div>
				<div>
					<h3 className="hidden mid:block font-medium text-xl leading-[23.48px] text-black">
						<span className="font-bold">LOSS OF DOCUMENT :</span> {getTitle()}{' '}
						{newLODPublication?.first_name} {newLODPublication?.last_name}
					</h3>
					<div className="flex items-center justify-between mt-[74px] mid:mt-[21px] mid:mb-[23px]">
						<div className="flex items-center justify-between mid:space-x-10 flex-row-reverse mid:flex-row">
							<div className="flex items-center mid:space-x-[7px]">
								<span className="mid:text-12 mid:leading-[14.09px] text-black text-[10px]">
									Date :
								</span>
								<span className="mid:text-sm font-bold mid:leading-[16.44px] text-575555 text-[10px]">
									13 Jan 2023
								</span>
							</div>
							<div className="mid:hidden w-[20px]" />
							<div className="flex items-center space-x-[7px]">
								<span className="mid:text-12 mid:leading-[14.09px] text-black text-[10px]">
									By :
								</span>
								<span className="mid:text-sm font-bold mid:leading-[16.44px] text-575555 text-[10px]">
									Novus News
								</span>
							</div>
							<div className="items-center space-x-[7px] hidden mid:flex">
								<span className="mid:text-12 mid:leading-[14.09px] text-black text-[10px]">
									Paper :
								</span>
								<span className="mid:text-sm font-bold mid:leading-[16.44px] text-575555 text-[10px]">
									Vanguard, 4 weeks from approval
								</span>
							</div>
						</div>
						<div className="hidden mid:flex items-center space-y-2 flex-col 2xl:flex-row 2xl:space-x-2 2xl:space-y-0">
							<button
								type="button"
								onClick={() => navigate(routes.pub_forms.loss_of_document)}
								className=" text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 bg-EEEEEE flex items-center justify-center">
								Edit Publication
							</button>
							<button
								type="button"
								onClick={() =>
									navigate(routes.pub_forms.loss_of_document_payment)
								}
								className=" text-white font-semibold ml-6 text-12 py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center">
								Confirm Publication
							</button>
						</div>
					</div>
					<p className="max-w-[960px] hidden mid:block text-black leading-6">
						This is to notify the general public, that I , {getTitle()}{' '}
						{newLODPublication?.first_name} {newLODPublication?.last_name} of{' '}
						{newLODPublication?.house_address} lost a{' '}
						{newLODPublication?.support_id_name} document with Property{' '}
						{newLODPublication?.id_value}., issued by{' '}
						{newLODPublication?.issuer_of_item}.The stated document above was
						misplaced on the 17th November, 2018
					</p>
					<div className="hidden mid:block">
						{newLODPublication?.physical_description && (
							<div className="mt-[19px] flex flex-col space-y-[6px]">
								<h4 className="font-bold text-black text-sm leading-[16.44px]">
									Extra Details
								</h4>
								<p className="leading-6 text-575555">
									{newLODPublication?.physical_description}
								</p>
							</div>
						)}
						{newLODPublication?.reward && (
							<div className="mt-[31px] flex flex-col space-y-[9px]">
								<div className="h-10 w-fit text-sm leading-[16.44px] px-[29px] flex items-center justify-center bg-black rounded-[20px] text-white font-semibold">
									Reward
								</div>
								<p className="text-base text-575555 leading-6">
									{newLODPublication?.reward}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="mt-6 mid:hidden">
				<h3 className="font-medium text-12 leading-[14.09px] text-black mb-[11px]">
					<span className="font-bold">LOSS OF DOCUMENT :</span> {getTitle()}{' '}
					{newLODPublication?.first_name} {newLODPublication?.last_name}
				</h3>
				<p className="text-10 leading-[18px] text-black">
					This is to notify the general public, that I , {getTitle()}{' '}
					{newLODPublication?.first_name} {newLODPublication?.last_name} of{' '}
					{newLODPublication?.house_address} lost a{' '}
					{newLODPublication?.support_id_name} document with Property{' '}
					{newLODPublication?.id_value}., issued by{' '}
					{newLODPublication?.issuer_of_item}.The stated document above was
					misplaced on the 17th November, 2018
				</p>
			</div>
		</Wrapper>
	);
};

export default LossOfDocumentPreview;
