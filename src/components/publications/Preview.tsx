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

const { CHANGE_OF_NAME, LOSS_OF_DOCUMENT } = PUBLICATION_TYPES;

interface PreviewProps {
	publicationType: PUBLICATION_TYPES;
}

const Preview: React.FC<PreviewProps> = ({ publicationType }) => {
	const navigate = useNavigate();
	const { newCONPublication, newLODPublication } = useSelector(
		(state: RootState) => state.publications
	);

	const isLOD = publicationType === LOSS_OF_DOCUMENT;
	const isCON = publicationType === CHANGE_OF_NAME;

	const publicationOfInterest = useMemo(() => {
		if (isCON) {
			return newCONPublication;
		}
		if (isLOD) {
			return newLODPublication;
		}
	}, [isCON, isLOD, newLODPublication, newCONPublication]);

	useEffect(() => {
		if (!publicationOfInterest) {
			navigate(-1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publicationOfInterest]);

	const getTitle = () =>
		publicationOfInterest?.gender === 'female' ? 'Mrs' : 'Mr';

	const publicationTypeTitle = isCON
		? 'CHANGE OF NAME'
		: isLOD
		? 'LOSS OF DOCUMENT'
		: '';

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
				<PublicationCreationSteps activeStep="preview" />
			</div>

			<div className="mt-[22px] mini:mt-[33px] flex space-x-[31px]">
				<div className="flex-shrink-0 mid:h-[175px] relative mid:w-[169px] h-[109px] w-[105px] mid:rounded-none rounded-6 bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
					{publicationOfInterest?.image ? (
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
				<div>
					{isLOD ? (
						<h3 className="hidden mid:block font-medium text-xl leading-[23.48px] text-black">
							<span className="font-bold">LOSS OF DOCUMENT :</span> {getTitle()}{' '}
							{newLODPublication?.firstName} {newLODPublication?.lastName}
						</h3>
					) : (
						<h3 className="hidden mid:block font-medium text-xl leading-[23.48px] text-black">
							<span className="font-bold">{publicationTypeTitle} :</span>{' '}
							{getTitle()} {newCONPublication?.oldFirstName}{' '}
							{newCONPublication?.oldLastName}
						</h3>
					)}

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
								onClick={() =>
									navigate(
										isLOD
											? routes.pub_forms.loss_of_document
											: routes.pub_forms.change_of_name
									)
								}
								className=" text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 bg-EEEEEE flex items-center justify-center">
								Edit Publication
							</button>
							<button
								type="button"
								onClick={() =>
									navigate(
										isLOD
											? routes.pub_forms.loss_of_document_payment
											: routes.pub_forms.payment
									)
								}
								className=" text-white font-semibold ml-6 text-12 py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center">
								Confirm Publication
							</button>
						</div>
					</div>
					{isLOD ? (
						<p className="max-w-[960px] hidden mid:block text-black leading-6">
							This is to notify the general public, that I, {getTitle()}{' '}
							{newLODPublication?.firstName} {newLODPublication?.lastName} of{' '}
							{newLODPublication?.houseAddress} lost a{' '}
							{newLODPublication?.itemLost} {newLODPublication?.supportIdName}{' '}
							document with Property {newLODPublication?.idNumber}., issued by{' '}
							{newLODPublication?.issuer}. The stated document above was
							misplaced on the{' '}
							{moment(newLODPublication?.dateLost)?.format('Do of MMMM, YYYY')}
						</p>
					) : (
						<p className="max-w-[960px] hidden mid:block text-black leading-6">
							“I, formerly known and addressed as {getTitle()}{' '}
							{newCONPublication?.oldFirstName}{' '}
							{newCONPublication?.oldMiddleName}{' '}
							{newCONPublication?.oldLastName}, henceforth wish to be known and
							addressed as {getTitle()}. {newCONPublication?.newFirstName}{' '}
							{newCONPublication?.newMiddleName}{' '}
							{newCONPublication?.newLastName}. All former documents remain
							valid. {newCONPublication?.concernParties} and the general public
							to take note”
						</p>
					)}
				</div>
				{isLOD && (
					<div className="hidden mid:block mt-[23px]">
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
			{isCON && (
				<div className="mt-6 mid:hidden">
					<h3 className="font-medium text-12 leading-[14.09px] text-black mb-[11px]">
						<span className="font-bold">LOSS OF DOCUMENT :</span> {getTitle()}{' '}
						{newCONPublication?.oldFirstName} {newCONPublication?.oldLastName}
					</h3>
					<p className="text-10 leading-[18px] text-black">
						“I, formerly known and addressed as {getTitle()}{' '}
						{newCONPublication?.oldFirstName} {newCONPublication?.oldMiddleName}{' '}
						{newCONPublication?.oldLastName}, henceforth wish to be known and
						addressed as {getTitle()}. {newCONPublication?.newFirstName}{' '}
						{newCONPublication?.newMiddleName}
						{newCONPublication?.newLastName}. All former documents remain valid.{' '}
						{newCONPublication?.concernParties} and the general public to take
						note”
					</p>
				</div>
			)}
			<div className="mt-8 flex mb-8">
				{publicationOfInterest?.file && (
					<div className="bg-D9D9D9 p-5 max-h-[500px] max-w-[500px] mx-auto overflow-hidden">
						{publicationOfInterest?.file?.includes('application/pdf') ? (
							<div className='relative w-full md:w-[500px] h-[500px] overflow-hidden'>
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
			{isLOD && (
				<div className="mt-6 mid:hidden">
					<h3 className="font-medium text-12 leading-[14.09px] text-black mb-[11px]">
						<span className="font-bold">LOSS OF DOCUMENT :</span> {getTitle()}{' '}
						{newLODPublication?.firstName} {newLODPublication?.lastName}
					</h3>
					<p className="text-10 leading-[18px] text-black">
						This is to notify the general public, that I , {getTitle()}{' '}
						{newLODPublication?.firstName} {newLODPublication?.lastName} of{' '}
						{newLODPublication?.houseAddress} lost a{' '}
						{newLODPublication?.itemLost} {newLODPublication?.supportIdName}{' '}
						document with Property {newLODPublication?.idNumber}., issued by{' '}
						{newLODPublication?.issuer}. The stated document above was misplaced
						on the{' '}
						{moment(newLODPublication?.dateLost)?.format('Do of MMMM, YYYY')}
					</p>
				</div>
			)}
		</Wrapper>
	);
};

export default Preview;
