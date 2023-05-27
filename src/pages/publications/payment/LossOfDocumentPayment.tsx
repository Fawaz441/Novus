import { Wrapper } from 'components/navigation';
import { PublicationCreationSteps } from 'components/publications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { publicationSlice } from 'store/publications';
import toast from 'react-hot-toast';
import { ErrorToast, Loader } from 'components/general';
import { routes } from 'utils/constants';

const { actions } = publicationSlice;

const LossOfDocumentPayment = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		newLODPublication,
		publishLODError,
		publishLODSuccess,
		publishingLOD,
	} = useSelector((state: RootState) => state.publications);

	useEffect(() => {
		if (!newLODPublication) {
			navigate(-1);
		}
	}, [navigate, newLODPublication]);

	const publish = () => {
		if (newLODPublication) {
			dispatch(actions.publishLOD(newLODPublication));
		}
	};
	useEffect(() => {
		if (publishLODError) {
			toast.custom((t) => <ErrorToast t={t} retry={publish} />);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publishLODError]);

	useEffect(() => {
		if (publishLODSuccess) {
			toast.success('Publication submitted successfully');
			dispatch(actions.resetPublishSuccess());
			navigate(routes.home);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publishLODSuccess]);

	return (
		<Wrapper isPublications showPublicationsButton={false}>
			<Loader loading={publishingLOD} transparent />
			<PublicationCreationSteps activeStep="payment" />
			<div className="pt-[63px] pb-5 flex flex-col space-y-[49px] max-w-[900px] mx-auto">
				<button
					type="button"
					className="text-black self-start font-bold text-sm leading-[16.44px]"
					onClick={() => navigate(-1)}>
					Back
				</button>
				<div className="mt-[49px] flex flex-col space-y-[15px]">
					<button
						type="button"
						className="rounded-3 py-[11px] px-6 text-white font-bold text-12 bg-FF012F w-fit">
						NOTE
					</button>
					<div className="bg-F9F9F9 rounded-6 px-[43px] pt-[26px] pb-[49px]">
						<div>
							<h3 className="font-bold text-xl leading-[23.48px]">
								Publication Cost
							</h3>
							<p className="mt-[6px] leading-[18.78px] font-medium text-black">
								To publish this classified ads on{' '}
								<span className="text-7108F6">The Epitome News</span> will cost
								4500
							</p>
							<p className="font-medium text-575555 leading-[22.86px] mt-[10px]">
								After payment has been made, a reference number will be sent to
								your e-mail, Approval of the publication takes with 4-7 working
								days. Check back to verify your publication was approved after
								the above said period
							</p>
						</div>
						{newLODPublication?.externalSelect?.value && (
							<div className="mt-[54px]">
								<h3 className="font-bold text-xl leading-[23.48px]">
									Additional Cost
								</h3>
								<p className="mt-[6px] leading-[18.78px] font-medium text-black">
									To publish this classified ads on{' '}
									{newLODPublication?.externalSelect?.value} will cost 4500
								</p>
								<p className="font-medium text-575555 leading-[22.86px] mt-[10px]">
									Publishing on vanguard will take 3 - 4 working days after
									approval on The Epitome News. Once publication has been
									approved on The Epitome News lookout for the print publication
									on the vanguard newspaper after the waiting period.
								</p>
							</div>
						)}
						<div className="mt-[50px] flex items-center justify-between">
							<div className="flex flex-col space-y-[7px]">
								<h3 className="font-bold text-black text-xl leading-[23.48px]">
									Total Cost
								</h3>
								<p className="font-medium text-black leading-[19.36px]">
									The total cost for this publication is{' '}
									<span className="font-bold">9000</span>
								</p>
							</div>
							<button
								onClick={publish}
								type="button"
								className="font-bold text-white text-12 flex items-center justify-center px-[29px] py-[11px] bg-08F692 rounded-3">
								Proceed To Payment
							</button>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default LossOfDocumentPayment;
