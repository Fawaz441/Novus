import React from 'react';
import { ReactComponent as LinkIcon } from 'assets/icons/news/link.svg';
import { ReactComponent as Download } from 'assets/icons/download.svg';
import lostDocument from 'assets/images/publications/lost-document.png';
import lostDocumentMobile from 'assets/images/publications/loss-document-mobile.png';
import PublicationActions from './PublicationActions';
import { toggleHiddenElement } from 'utils/ui-functions';
import { useNavigate } from 'react-router-dom';
import {
	PUBLICATION_TYPES,
	PUBLICATION_TYPES_ACRONYMS,
	routes,
} from 'utils/constants';
import { LossOfDocumentPublicationValues } from 'interfaces/publications';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { getPublicationLink } from 'utils/functions';

interface LostDocumentProps {
	id: number;
	data: LossOfDocumentPublicationValues;
}

const LosttDocument: React.FC<LostDocumentProps> = ({ id, data }) => {
	const navigate = useNavigate();
	return (
		<div
			className="flex flex-col mini:flex-row mini:max-w-[535px] self-start mini:space-x-5"
			id={`publication-${id}`}>
			<img
				src={lostDocumentMobile}
				alt="Lost document"
				className="mini:hidden flex-shrink-0 h-[113px] rounded-6"
			/>
			<img
				src={lostDocument}
				alt="Lost document"
				className="flex-shrink-0 pointer-events-none rounded-6 max-h-[151px] mini:w-auto hidden mini:block"
			/>
			<div className="w-full">
				<div className="mt-4 mini:mt-0 mb-3 mini:mb-4 flex w-full items-center justify-between">
					<div className="hidden mini:flex flex-col space-y-1">
						<span className="text-575555 text-10 leading-[11.74px]">
							Reference Number
						</span>
						<span className="text-black font-semibold text-12 leading-[14.09px]">
							{data?.reference}
						</span>
					</div>
					<div className="mini:hidden flex justify-between items-center w-full">
						<span className="font-semibold text-12 leading-[14.09px] text-black">
							{data?.reference}
						</span>
						<span className="text-1E1E1E text-12 leading-[14.09px] font-medium">
							{moment(data?.createdAt).format('DD MMM YYYY')}
						</span>
					</div>
					<div className="relative">
						<PublicationActions
							publication={data}
							tag={data?.reference || ''}
							publicationType={PUBLICATION_TYPES.LOSS_OF_DOCUMENT}
						/>
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleHiddenElement(`#publication-${data?.reference}-actions`);
							}}
							type="button"
							className="hidden mini:flex flex-col pl-2 items-end space-y-[5px]">
							<div className="border-9B9B9B h-[2px] w-[2px] rounded-full border" />
							<div className="border-9B9B9B h-[2px] w-[2px] rounded-full border" />
							<div className="border-9B9B9B h-[2px] w-[2px] rounded-full border" />
						</button>
					</div>
				</div>
				<p className="text-[10px] leading-[16.74px] font-medium text-575555 mini:text-12 mini:leading-[20.09px] mb-3 mini:mb-[14px]">
					This is to notify the general public, that I, Mr {data?.firstName}{' '}
					{data?.middleName} {data?.lastName} of {data?.houseAddress} lost a{' '}
					{data?.itemLost} with Property ID {data?.idNumber},
				</p>
				<div className="flex items-center justify-between w-full">
					<div className="hidden mini:flex flex-col space-y-1">
						<span className="text-575555 text-10 leading-[11.74px]">
							Date Published :
						</span>
						<span className="text-black font-semibold text-12 leading-[14.09px]">
							{moment(data?.createdAt).format('DD MMM YYYY')}
						</span>
					</div>
					<div className="flex items-center space-x-[34px] mini:hidden">
						<CopyToClipboard
							text={getPublicationLink(
								PUBLICATION_TYPES_ACRONYMS.LOSS_OF_DOCUMENT,
								data?.reference || ''
							)}
							onCopy={() => toast.success('Link copied to clipboard')}>
							<div className="flex items-center space-x-[7.15px]">
								<LinkIcon className="stroke-9B9B9B" />
								<span className="text-[10px] leading-[11.74px] text-black">
									Copy Link
								</span>
							</div>
						</CopyToClipboard>
						<div className="flex items-center space-x-[7.15px]">
							<Download className="stroke-9B9B9B" />
							<span className="text-[10px] leading-[11.74px] text-black">
								Download
							</span>
						</div>
					</div>
					<button
						onClick={() =>
							navigate(
								routes.getPubDetailRoute(
									`${PUBLICATION_TYPES_ACRONYMS.LOSS_OF_DOCUMENT}-${
										data?.reference || ''
									}`
								)
							)
						}
						type="button"
						className="text-[11px] leading-[18.41px] text-7108F6 font-medium rounded-6 bg-DFC7FF py-2 px-6">
						View Publication
					</button>
				</div>
			</div>
		</div>
	);
};

export default LosttDocument;
