import { Wrapper } from 'components/navigation';
import { useEffect, useState } from 'react';
import clsx from 'classnames';
import { ReactComponent as LinkIcon } from 'assets/icons/news/link.svg';
import { ReactComponent as Change } from 'assets/icons/publications/change.svg';
import { ReactComponent as Camera } from 'assets/images/publications/camera.svg';
import {
	EditPublicationModal,
	PublicationStatus,
} from 'components/publications';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from 'hooks';
import {
	MODALS,
	PUBLICATION_TYPES,
	PUBLICATION_TYPES_ACRONYMS,
	routes,
} from 'utils/constants';
import publicationsAPI from 'api/publications';
import { capitalize, isEmpty } from 'lodash';
import { getFullPublicationLink, getPublicationText, getTitle, isApproved } from 'utils/functions';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { ErrorToast, Loader } from 'components/general';

const PublicationDetail = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { showModal } = useModal();
	const [loading, setLoading] = useState(true);
	const [detail, setDetail] = useState<any>(null);
	const publicationIsApproved = isApproved(detail?.status);

	const getPublicationType = () => {
		const publicationRefSplit = params?.publicationRef?.split('-');
		const publicationType = publicationRefSplit?.[0] || '';
		const reference = publicationRefSplit?.[1] || '';
		if (publicationType === PUBLICATION_TYPES_ACRONYMS.CHANGE_OF_NAME) {
			return {
				type: PUBLICATION_TYPES.CHANGE_OF_NAME,
				reference,
				title: 'CHANGE OF NAME',
			};
		}
		if (publicationType === PUBLICATION_TYPES_ACRONYMS.AFFIDAVIT) {
			return {
				type: PUBLICATION_TYPES.AFFIDAVIT,
				reference,
				title: 'AFFIDAVIT',
			};
		}
		if (publicationType === PUBLICATION_TYPES_ACRONYMS.LOSS_OF_DOCUMENT) {
			return {
				type: PUBLICATION_TYPES.LOSS_OF_DOCUMENT,
				reference,
				title: 'LOSS OF DOCUMENT',
			};
		}
		if (publicationType === PUBLICATION_TYPES_ACRONYMS.OBITUARY) {
			return { type: PUBLICATION_TYPES.OBITUARY, reference, title: 'OBITUARY' };
		}
		if (publicationType === PUBLICATION_TYPES_ACRONYMS.PUBLIC_NOTICE) {
			return { type: PUBLICATION_TYPES.PUBLIC_NOTICE, reference, title: 'PUBLIC NOTICE' };
		}
	};


	const getPublicationDetail = async () => {
		try {
			const info = getPublicationType();
			if (info) {
				const { type, reference } = info;
				const { data } = await publicationsAPI.getPublicationDetail(
					reference,
					type
				);
				setLoading(false);
				if (!isEmpty(data?.items)) {
					setDetail(data.items[0]);
				} else {
					toast.custom((t) => <ErrorToast t={t} />);
				}
			} else {
				navigate(routes.home);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (params?.publicationRef) {
			getPublicationDetail();
		} else {
			navigate(routes.home);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const getText = () => {
		const type = getPublicationType();
		if(type?.type){
			return getPublicationText(type.type,detail)
		}
		return ''
	};

	const getSubHeader = () => {
		const type = getPublicationType();
		if(type?.type === PUBLICATION_TYPES.CHANGE_OF_NAME){
			return`
				${getTitle(detail?.gender || '')}
				${detail?.newFirstName}
				${detail?.newMiddleName}
				${detail?.newLastName}
			`
		}
		if(type?.type === PUBLICATION_TYPES.LOSS_OF_DOCUMENT){
			return`
				${getTitle(detail?.gender || '')}
				${detail?.firstName}
				${detail?.middleName}
				${detail?.lastName}
			`
		}
		if(type?.type===PUBLICATION_TYPES.OBITUARY){
			return `${getTitle(detail?.gender || '')} ${detail?.fullNameOfDeceased}`
		}
		if(type?.type===PUBLICATION_TYPES.AFFIDAVIT||type?.type===PUBLICATION_TYPES.PUBLIC_NOTICE){
			return `${getTitle(detail?.firstName || '')} ${detail?.middleName} ${detail?.lastName}`
		}
	}

	const passPortPhotograph = detail?.photos?.find((doc:any) => doc?.type === "passport")?.url

	const getLink = () => {
		const publicationType = getPublicationType()?.type
		if(publicationType){
			return getFullPublicationLink(publicationType, `${detail?.reference}` || '')||''
		}
		return ''
	};

	return (
		<Wrapper isPublications showPublicationsButton={false}>
			{loading ? (
				<div className="flex items-center justify-center">
					<Loader loading />
				</div>
			) : (
				<div>
					<EditPublicationModal />
					<div className="hidden mini:flex items-center space-x-[41px]">
						<div className="flex items-center space-x-[14px]">
							<Change />
							<span className="font-semibold text-black text-sm">
								Change Of Name
							</span>
						</div>
						<div className="flex items-center space-x-5">
							<PublicationStatus
								status={publicationIsApproved ? 'approved' : 'declined'}
							/>
							{!publicationIsApproved && (
								<button
									type="button"
									onClick={() => navigate(-1)}
									className="text-sm font-bold text-black">
									Back
								</button>
							)}
						</div>
					</div>
					<div className="mini:hidden flex space-x-[132px] items-center mt-6">
						<button
							className="text-[10px] leading-[12.19px] text-black"
							onClick={() => navigate(-1)}>
							Back
						</button>
						<span
							className={clsx('text-[10px] leading-[11.74px] font-bold', {
								'!text-FF012F': !publicationIsApproved,
								'!text-08F692': publicationIsApproved,
							})}>
							{publicationIsApproved
								? 'Publication Approved'
								: 'Publication Declined'}
						</span>
					</div>
					<div className="mt-7 flex space-x-[59px] mini:space-x-[31px]">
						<div className="relative flex-shrink-0 h-[109px] w-[105px] mini:h-[175px] mini:w-[169px] bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
							{
								passPortPhotograph? 
								<img className='h-full w-full top-0 left-0 absolute object-contain'
								alt="Passport Photograph"
								src={`https://api.theepitomenews.com/images/${passPortPhotograph}`}
								/>:
								<Camera />}
							{!passPortPhotograph && <p className="max-w-[82px] text-12 text-center text-black">
								Passport Photograph
							</p>}
						</div>
						{/* <div className="mini:hidden mt-[37px]">
							<button
								type="button"
								onClick={() => showModal(MODALS.EDIT_PUBLICATION)}
								className="text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 bg-EEEEEE flex items-center justify-center">
								Edit Publication
							</button>
						</div> */}
						<div className="hidden mini:block">
							<h3 className="font-medium text-xl leading-[23.48px] text-black mb-2">
								<span className="font-bold">
									{getPublicationType()?.title} :
								</span>{' '}
								{capitalize(getSubHeader()||"")}
							</h3>
							{publicationIsApproved ? (
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-10 mt-[31px] mb-[34px]">
										<div className="flex items-center space-x-[7px]">
											<span className="text-12 leading-[14.09px] text-black">
												Date :
											</span>
											<span className="text-sm font-bold leading-[16.44px] text-575555">
												{moment(detail?.createdAt).format('DD MMM YYYY')}
											</span>
										</div>
										<div className="flex items-center space-x-[7px]">
											<span className="text-12 leading-[14.09px] text-black">
												By :
											</span>
											<span className="text-sm font-bold leading-[16.44px] text-575555">
												The Epitome News
											</span>
										</div>
										{detail?.externalSelect?.value && (
											<div className="flex items-center space-x-[7px]">
												<span className="text-12 leading-[14.09px] text-black">
													Paper :
												</span>
												<span className="text-sm font-bold leading-[16.44px] text-575555">
													{detail?.externalSelect?.value}, 4 weeks from approval
												</span>
											</div>
										)}
									</div>
									<CopyToClipboard
										text={
											getLink()
										}
										onCopy={() => toast.success('Link copied to clipboard')}>
										<button className="flex items-center space-x-2">
											<div className="h-[30px] w-[30px] rounded-full bg-F4F4F4 border border-575555 flex items-center justify-center">
												<LinkIcon className="stroke-575555" />
											</div>
											<span className="font-medium text-12 text-[#1E1E1E]">
												Copy Link
											</span>
										</button>
									</CopyToClipboard>
								</div>
							) : (
								<button
									type="button"
									onClick={() => showModal(MODALS.EDIT_PUBLICATION)}
									className="mt-[26px] text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 mb-[18px] bg-EEEEEE flex items-center justify-center">
									Edit Publication
								</button>
							)}
							<p className="max-w-[960px] text-black leading-6">{getText()}</p>
						</div>
					</div>
					<div className="mini:hidden mt-6">
						<h3 className="font-medium text-[12px] leading-[14.09px] text-black">
							<span className="font-bold">{getPublicationType()?.title} :</span> 
							{getSubHeader()}
						</h3>
						<p className="text-black leading-[18px] text-[10px]">
						{getText()}
						</p>
					</div>
					{/* <div className="mt-8 flex flex-col space-y-8 mini:space-y-0 mini:flex-row mini:space-x-[250px] mb-8">
						<div className='flex items-center justify-center w-full'>
						<PublicationSample className="flex-shrink-0 w-full mini:w-auto" />
						</div>
						{!publicationIsApproved && <DeclineReason />}
					</div> */}
				</div>
			)}
		</Wrapper>
	);
};

export default PublicationDetail;
