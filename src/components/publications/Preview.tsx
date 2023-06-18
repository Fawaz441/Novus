import { Wrapper } from 'components/navigation';
import { ReactComponent as Camera } from 'assets/images/publications/camera.svg';
import React, { useEffect, useMemo } from 'react';
import {
	MobileFormsNavigation,
	PublicationCreationSteps,
} from 'components/publications';
import { useNavigate } from 'react-router-dom';
import { PUBLICATION_TYPES, routes } from 'utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import moment from 'moment';
import { ObituaryFields } from 'interfaces/publications';
import { getPublicationText } from 'utils/functions';

const {
	CHANGE_OF_NAME,
	LOSS_OF_DOCUMENT,
	OBITUARY,
	AGE_DECLARATION,
	AFFIDAVIT,
	PUBLIC_NOTICE,
} = PUBLICATION_TYPES;

interface PreviewProps {
	publicationType: PUBLICATION_TYPES;
}

const Preview: React.FC<PreviewProps> = ({ publicationType }) => {
	const navigate = useNavigate();
	const {
		newCONPublication,
		newLODPublication,
		newObituaryPublication,
		newPublicNoticePublication,
	} = useSelector((state: RootState) => state.publications);

	const mappings = useMemo(
		() => ({
			[LOSS_OF_DOCUMENT]: newLODPublication,
			[CHANGE_OF_NAME]: newCONPublication,
			[OBITUARY]: newObituaryPublication,
			[AGE_DECLARATION]: newCONPublication,
			[AFFIDAVIT]: newCONPublication,
			[PUBLIC_NOTICE]: newPublicNoticePublication,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const isLOD = publicationType === LOSS_OF_DOCUMENT;
	const isCON = publicationType === CHANGE_OF_NAME;
	const isObituary = publicationType === OBITUARY;
	const isPublicNotice = publicationType === PUBLIC_NOTICE;

	const publicationOfInterest = useMemo(() => {
		return mappings[publicationType];
	}, [mappings, publicationType]);

	useEffect(() => {
		if (!publicationOfInterest) {
			navigate(-1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publicationOfInterest]);

	const getTitle = () => {
		return isObituary
			? (publicationOfInterest as ObituaryFields)?.genderOfDeceased === 'female'
				? 'Mrs'
				: 'Mr'
			: publicationOfInterest?.gender === 'female'
			? 'Mrs'
			: 'Mr';
	};

	const getPublicationTypeTitle = () => {
		return isCON
			? 'CHANGE OF NAME'
			: isLOD
			? 'LOSS OF DOCUMENT'
			: isObituary
			? 'OBITUARY ANNOUNCEMENT'
			: isPublicNotice
			? 'PUBLIC NOTICE'
			: '';
	};

	const onEditPublicationClick = () => {
		navigate(
			isCON
				? routes.pub_forms.change_of_name
				: isLOD
				? routes.pub_forms.loss_of_document
				: isObituary
				? routes.pub_forms.obituary
				: isPublicNotice
				? routes.pub_forms.public_notice
				: routes.home
		);
	};

	const onConfirmPublicationClick = () => {
		navigate(
			isCON
				? routes.pub_forms.payment
				: isLOD
				? routes.pub_forms.loss_of_document_payment
				: isObituary
				? routes.pub_forms.obituary_payment
				: isPublicNotice
				? routes.pub_forms.public_notice_payment
				: routes.home
		);
	};

	const getNameHeader = () => {
		return isLOD
			? `${newLODPublication?.firstName} ${newLODPublication?.lastName}`
			: isCON
			? `${newCONPublication?.oldFirstName} ${newCONPublication?.oldLastName}`
			: isObituary
			? `${newObituaryPublication?.fullNameOfDeceased}`
			: isPublicNotice
			? `${newPublicNoticePublication?.firstName} ${newPublicNoticePublication?.middleName} ${newPublicNoticePublication?.lastName}`
			: '';
	};

	const getText = () => {
		if (publicationOfInterest) {
			return getPublicationText(publicationType, publicationOfInterest);
		}
	};

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
							onClick={() => navigate(routes.pub_forms.change_of_name)}
							className=" text-575555 font-semibold text-[10px] py-[10px] px-[25px] rounded-3 bg-EEEEEE flex items-center justify-center">
							Edit Publication
						</button>
						<button
							type="button"
							onClick={() => navigate(routes.pub_forms.payment)}
							className=" text-white font-semibold text-[10px] py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center">
							Confirm Publication
						</button>
					</div>
				</div>
			</div>
			<div className="hidden mini:block">
				<PublicationCreationSteps
					activeStep="preview"
					publicationType={publicationType}
				/>
			</div>

			<div className="mt-[22px] mini:mt-[33px] flex space-x-[31px]">
				<div className="flex-shrink-0 mid:h-[175px] relative mid:w-[169px] h-[109px] w-[105px] mid:rounded-none rounded-6 bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
					{publicationOfInterest &&
					'image' in publicationOfInterest &&
					publicationOfInterest?.image ? (
						<img
							className="absolute top-0 left-0 h-full w-full object-cover"
							alt="passport"
							src={publicationOfInterest?.image}
						/>
					) : (
						<Camera />
					)}
					<p className="max-w-[82px] text-12 text-center text-black">
						Passport Photograph
					</p>
				</div>
				<div className="w-full">
					<h3 className="hidden mid:block font-medium text-xl leading-[23.48px] text-black">
						<span className="font-bold">{getPublicationTypeTitle()} :</span>{' '}
						{getTitle()} {getNameHeader()}
					</h3>

					<div className="flex items-center justify-between mt-[74px] mid:mt-[21px] mid:mb-[23px]">
						<div className="flex items-center justify-between mid:space-x-10 flex-row-reverse mid:flex-row">
							<div className="flex items-center mid:space-x-[7px]">
								<span className="mid:text-12 mid:leading-[14.09px] text-black text-[10px]">
									Date :
								</span>
								<span className="mid:text-sm font-bold mid:leading-[16.44px] text-575555 text-[10px]">
									{moment(new Date()).format('DD MMM YYYY')}
								</span>
							</div>
							<div className="mid:hidden w-[20px]" />
							<div className="flex items-center space-x-[7px]">
								<span className="mid:text-12 mid:leading-[14.09px] text-black text-[10px]">
									By :
								</span>
								<span className="mid:text-sm font-bold mid:leading-[16.44px] text-575555 text-[10px]">
									The Epitome News
								</span>
							</div>
							{publicationOfInterest?.externalSelect?.value && (
								<div className="items-center space-x-[7px] hidden mid:flex">
									<span className="mid:text-12 mid:leading-[14.09px] text-black text-[10px]">
										Paper :
									</span>
									<span className="mid:text-sm font-bold capitalize mid:leading-[16.44px] text-575555 text-[10px]">
										{publicationOfInterest?.externalSelect?.value}, 4 weeks from
										approval
									</span>
								</div>
							)}
						</div>
						<div className="hidden mid:flex items-center space-y-2 flex-col 2xl:flex-row 2xl:space-x-2 2xl:space-y-0">
							<button
								type="button"
								onClick={onEditPublicationClick}
								className=" text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 bg-EEEEEE flex items-center justify-center">
								Edit Publication
							</button>
							<button
								type="button"
								onClick={onConfirmPublicationClick}
								className=" text-white font-semibold ml-6 text-12 py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center">
								Confirm Publication
							</button>
						</div>
					</div>
					<p className="max-w-[960px] hidden mid:block text-black leading-6">
						{getText()}
					</p>
					{isLOD && (
						<div className="mt-[23px]">
							{newLODPublication?.physicalDesc && (
								<div className="mt-[19px] flex flex-col space-y-[6px]">
									<h4 className="font-bold text-black text-sm leading-[16.44px]">
										Extra Details
									</h4>
									<p className="leading-6 text-575555">
										{newLODPublication?.physicalDesc}
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
					)}
				</div>
			</div>
			{isObituary && newObituaryPublication?.funeralArrangement && (
				<div className="flex flex-col space-y-3 mt-[13px]">
					<h4 className="font-bold text-center text-black text-base leading-6">
						FUNERAL ARRANGEMENT
					</h4>
					<p className="leading-6 text-black text-center">
						{newObituaryPublication?.funeralArrangement}
					</p>
				</div>
			)}
			<div className="mt-8 flex mb-8">
				{publicationOfInterest?.file && (
					<div className="bg-D9D9D9 p-5 max-h-[500px] max-w-[500px] mx-auto overflow-hidden">
						{publicationOfInterest?.file?.includes('application/pdf') ? (
							<div className="relative w-full md:w-[500px] h-[500px] overflow-hidden">
								<iframe
									className="absolute h-full w-full top-0 left-0 overflow-hidden"
									src={publicationOfInterest?.file}
									title="PDF Viewer"
								/>
							</div>
						) : (
							<img
								src={publicationOfInterest?.file}
								className="h-full w-full"
								alt="publication file"
							/>
						)}
					</div>
				)}
			</div>
			{/* mobile */}
			<div className="mt-6 mid:hidden">
				<h3 className="font-medium text-12 leading-[14.09px] text-black mb-[11px]">
					<span className="font-bold">{getPublicationTypeTitle()} :</span>{' '}
					{getTitle()} {getTitle()} {getNameHeader()}
				</h3>
				<p className="text-10 leading-[18px] text-black">{getText()}</p>
			</div>
		</Wrapper>
	);
};

export default Preview;
