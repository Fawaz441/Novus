import React from 'react';
import { ReactComponent as LinkIcon } from 'assets/icons/news/link.svg';
import { ReactComponent as Download } from 'assets/icons/publications/download.svg';
import { ReactComponent as AltDownload } from 'assets/icons/agents/download.svg';
import { ReactComponent as Location } from 'assets/icons/agents/location.svg';
import { useNavigate } from 'react-router-dom';
import { PUBLICATION_TYPES, routes } from 'utils/constants';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { getFullPublicationLink } from 'utils/functions';
import { hideAllPublicationActions } from 'utils/ui-functions';

interface PublicationActionsProps {
	tag: number | string;
	publicationType: PUBLICATION_TYPES;
	isAgent?: boolean;
	isDownloading?: boolean;
	onDownload?: () => void;
}

const PublicationActions: React.FC<PublicationActionsProps> = ({
	tag,
	isAgent,
	publicationType,
	isDownloading,
	onDownload,
}) => {
	const navigate = useNavigate();

	const getLink = () => {
		return getFullPublicationLink(publicationType, `${tag}` || '');
	};

	return (
		<>
			<div
				id={`publication-${tag}-actions`}
				role="presentation"
				onClick={(e) => e.stopPropagation()}
				className="bg-white w-[157px] pointer-events-none transition-all duration-200 publication-action p-[15px] opacity-0 translate-y-2 flex flex-col space-y-[19px] border-2 border-9B9B9B min-h-[87px] absolute -left-[145px] -bottom-[100px] z-[2]">
				{isAgent ? (
					<>
						<CopyToClipboard
							text={getLink()}
							onCopy={() => {
								toast.success('Link copied to clipboard');
								hideAllPublicationActions();
							}}>
							<button className="flex items-center justify-between">
								<span className="font-medium text-10 leading-[16.74px]">
									Copy Url
								</span>
								<LinkIcon className='stroke-9B9B9B"' />
							</button>
						</CopyToClipboard>
						<button
							className="flex items-center justify-between"
							onClick={onDownload}
							disabled={isDownloading}>
							<span className="font-medium text-10 leading-[16.74px]">
								Download Publication
							</span>
							<AltDownload className='stroke-9B9B9B"' />
						</button>
						<button
							className="flex items-center justify-between"
							onClick={() =>
								navigate(routes.agents.getAgentPubDetailRoute(`${tag}`))
							}>
							<span className="font-medium text-10 leading-[16.74px]">
								Go To Publication
							</span>
							<Location className='stroke-9B9B9B"' />
						</button>
					</>
				) : (
					<>
						<CopyToClipboard
							text={getLink()}
							onCopy={() => {
								toast.success('Link copied to clipboard');
								hideAllPublicationActions();
							}}>
							<button className="flex items-center justify-between">
								<span className="font-medium text-10 leading-[16.74px]">
									Copy Url
								</span>
								<LinkIcon className='stroke-9B9B9B"' />
							</button>
						</CopyToClipboard>
						<button
							className="flex items-center justify-between"
							onClick={onDownload}>
							<span className="font-medium text-10 leading-[16.74px]">
								Download Publication
							</span>
							<Download />
						</button>
					</>
				)}
			</div>
		</>
	);
};

export default PublicationActions;
