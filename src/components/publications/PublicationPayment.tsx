import { PUBLICATION_TYPES, routes } from 'utils/constants';
import { ErrorToast, Loader } from 'components/general';
import { Wrapper } from 'components/navigation';
import {
	MobileFormsNavigation,
	PublicationCreationSteps,
} from 'components/publications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { publicationSlice } from 'store/publications';
import toast from 'react-hot-toast';
import { capitalize } from 'lodash';

const { actions } = publicationSlice;
const { CHANGE_OF_NAME, LOSS_OF_DOCUMENT } = PUBLICATION_TYPES;

interface PublicationPaymentProps {
	publicationType: PUBLICATION_TYPES;
}

const PublicationPayment: React.FC<PublicationPaymentProps> = ({
	publicationType,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		newCONPublication,
		newLODPublication,
		publishingLOD,
		publishingCON,
		publishCONError,
		publishLODError,
		publishCONSuccess,
		publishLODSuccess,
		publisherPrices,
		loadingPublisherPrices,
	} = useSelector((state: RootState) => state.publications);

	const publicationOfInterest = React.useMemo(() => {
		return publicationType === CHANGE_OF_NAME
			? newCONPublication
			: publicationType === LOSS_OF_DOCUMENT
			? newLODPublication
			: null;
	}, [publicationType, newCONPublication, newLODPublication]);

	const successOfInterest = React.useMemo(() => {
		return publicationType === CHANGE_OF_NAME
			? publishCONSuccess
			: publicationType === LOSS_OF_DOCUMENT
			? publishLODSuccess
			: null;
	}, [publicationType, publishLODSuccess, publishCONSuccess]);

	const errorOfInterest = React.useMemo(() => {
		return publicationType === CHANGE_OF_NAME
			? publishCONError
			: publicationType === LOSS_OF_DOCUMENT
			? publishLODError
			: null;
	}, [publicationType, publishLODError, publishCONError]);

	const loading = React.useMemo(() => {
		return publicationType === CHANGE_OF_NAME
			? publishingCON
			: publicationType === LOSS_OF_DOCUMENT
			? publishingLOD
			: null;
	}, [publicationType, publishingCON, publishingLOD]);

	const publish = () => {
		if (publicationOfInterest) {
			if (publicationType === CHANGE_OF_NAME) {
				dispatch(actions.publishCON(publicationOfInterest));
			}
			if (publicationType === LOSS_OF_DOCUMENT) {
				dispatch(actions.publishLOD(publicationOfInterest));
			}
		}
	};

	useEffect(() => {
		if (!publicationOfInterest) {
			navigate(-1);
		} else {
			if (publicationType === CHANGE_OF_NAME && newCONPublication) {
				try {
					new File([newCONPublication.image], 'image.png', {
						type: 'image/png',
					});
					new File([newCONPublication.file], 'image.png', {
						type: 'image/png',
					});
				} catch (e) {
					navigate(routes.pub_forms.change_of_name);
				}
			}
			// if (publicationType === LOSS_OF_DOCUMENT && newLODPublication) {
			// 	try {
			// 		new File([newLODPublication.image], 'image.png', {
			// 			type: 'image/png',
			// 		});
			// 		new File([newLODPublication.file], 'image.png', {
			// 			type: 'image/png',
			// 		});
			// 	} catch (e) {
			// 		navigate(routes.pub_forms.change_of_name);
			// 	}
			// }
		}
		if (publisherPrices?.length === 0) {
			dispatch(
				actions.fetchPublisherPrices({
					publicationType,
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publicationOfInterest, publisherPrices, publicationType]);

	useEffect(() => {
		return () => {
			dispatch(actions.clearPublisherPrices());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (errorOfInterest) {
			toast.custom((t) => <ErrorToast t={t} retry={publish} />);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorOfInterest]);

	useEffect(() => {
		if (successOfInterest) {
			toast.success('Publication submitted successfully');
			dispatch(actions.resetPublishSuccess());
			navigate(routes.home);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [successOfInterest]);

	const epitomeNewsPrice = React.useMemo(() => {
		return Number(
			publisherPrices.find((price) => !!price.isPlatform)?.price || 0
		);
	}, [publisherPrices]);

	const externalNewsPaperPrice = React.useMemo(() => {
		if (
			publicationOfInterest?.externalSelect?.value &&
			publisherPrices.length > 0
		) {
			const price = publisherPrices?.find(
				(price) =>
					price?.externalName === publicationOfInterest?.externalSelect?.value
			)?.price;
			return Number(price || 0);
		}
	}, [publisherPrices, publicationOfInterest?.externalSelect]);

	const total = epitomeNewsPrice + (externalNewsPaperPrice || 0);

	return (
		<Wrapper isPublications showPublicationsButton={false}>
			<Loader loading={loading || loadingPublisherPrices} transparent />
			<div>
				<div className="hidden mid:block">
					<PublicationCreationSteps activeStep="payment" />
				</div>
				<div className="mt-2 mb-6 mid:hidden">
					<MobileFormsNavigation />
				</div>
				<div className="mid:pt-[63px] pb-5 flex flex-col space-y-[49px] max-w-[900px] mx-auto">
					<button
						type="button"
						className="text-black self-start font-bold text-sm leading-[16.44px]"
						onClick={() => navigate(-1)}>
						Back
					</button>
					<div className="mt-[49px] flex flex-col space-y-[15px]">
						<button
							type="button"
							className="hidden mid:block rounded-3 py-[11px] px-6 text-white font-bold text-12 bg-FF012F w-fit">
							NOTE
						</button>
						<div className="bg-F9F9F9 rounded-6 px-4 mid:px-[43px] pt-[26px] pb-[49px]">
							<div>
								<button
									type="button"
									className="mid:hidden mb-[29px] rounded-3 py-[11px] px-6 text-white font-bold text-12 bg-FF012F w-fit">
									NOTE
								</button>
								<h3 className="font-bold text-[15px] leading-[17.61px] mid:text-xl mid:leading-[23.48px]">
									Publication Cost
								</h3>
								<p className="mt-3 mid:mt-[6px] text-12 leading-[14.09px] mid:text-base mid:leading-[18.78px] font-medium text-black">
									To publish this classified ads on{' '}
									<span className="text-7108F6">The Epitome News</span> will
									cost {epitomeNewsPrice}
								</p>
								<p className="text-10 leading-[17px] font-medium text-575555 mid:text-base mid:leading-[22.86px] mt-[10px]">
									After payment has been made, a reference number will be sent
									to your e-mail, Approval of the publication takes with 4-7
									working days. Check back to verify your publication was
									approved after the above said period
								</p>
							</div>
							{publicationOfInterest?.externalSelect?.value && (
								<div className="mt-[30px] mid:mt-[54px]">
									<h3 className="font-bold text-[15px] leading-[17.61px] mid:text-xl mid:leading-[23.48px]">
										Additional Cost
									</h3>
									<p className="mt-[14px] mid:mt-[6px] text-12 mid:text-base leading-[14.09px] mid:leading-[18.78px] font-medium text-black">
										To publish this classified ads on{' '}
										{capitalize(publicationOfInterest?.externalSelect?.value)}{' '}
										will cost {externalNewsPaperPrice}
									</p>
									<p className="text-10 leading-[17px] font-medium text-575555 mid:text-base mid:leading-[22.86px] mt-[10px]">
										Publishing on {capitalize(publicationOfInterest?.externalSelect?.value)}{' '}
										will take 3 - 4 working days after approval on The Epitome
										News. Once publication has been approved on The Epitome News
										lookout for the print publication on the{' '}
										{capitalize(publicationOfInterest?.externalSelect?.value)}{' '}
										newspaper after the waiting period.
									</p>
								</div>
							)}
							<div className="mt-[35px] mid:mt-[50px] flex flex-col space-y-12 mid:space-y-0 mid:flex-row mid:items-center mid:justify-between">
								<div className="flex flex-col space-y-[7px]">
									<h3 className="font-bold text-black mid:text-xl mid:leading-[23.48px] text-[15px] leading-[17.61px]">
										Total Cost
									</h3>
									<p className="font-medium text-black text-12 mid:text-base mid:leading-[19.36px]">
										The total cost for this publication is{' '}
										<span className="font-bold">{total}</span>
									</p>
								</div>
								<button
									type="button"
									onClick={() => publish()}
									className="font-bold text-white text-12 flex items-center justify-center px-[29px] py-[11px] bg-08F692 rounded-3">
									Proceed To Payment
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default PublicationPayment;