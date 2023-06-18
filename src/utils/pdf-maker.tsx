import { PUBLICATION_TYPES } from './constants';
import { ReactComponent as EpitomeNewsLarge } from 'assets/icons/epitome-news-large.svg';
import {
	LossOfDocumentPublicationValues,
	ChangeOfNamePublicationValues,
	ObituaryValues,
	PublicNoticeValues,
} from 'interfaces/publications';
import moment from 'moment';
import { capitalize } from 'lodash';
import { getFullPublicationLink, getPublicationText } from './functions';
import { API_URL } from 'api/rootAxios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';

const { AFFIDAVIT, CHANGE_OF_NAME, LOSS_OF_DOCUMENT, OBITUARY, PUBLIC_NOTICE } =
	PUBLICATION_TYPES;

const MARGIN = 20;

const downloadPDF = <
	T extends
		| LossOfDocumentPublicationValues
		| PublicNoticeValues
		| ObituaryValues
		| ChangeOfNamePublicationValues
>(
	publicationType: PUBLICATION_TYPES,
	publication: T,
	onDone: () => void
) => {
	const content = document.getElementById(
		`publication-${publicationType}-reference-${publication.reference}`
	);
	if (content) {
		const width = content.offsetWidth;
		const height = content.offsetHeight;
		html2canvas(content, {
			scrollX: 0, // scroll to X origin
			scrollY: 0, // scroll to Y origin
			scale: 5, // 5 is quality scale
			useCORS: true,
		})
			.then(function (canvas) {
				// convert the canvas conent to a Data URI/URL
				var img = canvas.toDataURL('image/jpeg', 5); // 5 is quality scale
				var doc = new jsPDF({
					orientation: 'landscape',
					unit: 'px', // set pixel as unit
					format: [width + MARGIN * 2, height + MARGIN * 2],
				});

				// add canvas as an image
				doc.addImage(img, 'JPEG', MARGIN, MARGIN, width, height);

				// save the content to screenshot.pdf
				doc.save(`${publicationType}-${publication.reference}.pdf`);
				onDone();
			})
			.catch((e) => {
				toast.error('There was an error');
				onDone();
			});
	}
};

const createPDF = <
	T extends
		| LossOfDocumentPublicationValues
		| PublicNoticeValues
		| ObituaryValues
		| ChangeOfNamePublicationValues
>(
	publicationType: PUBLICATION_TYPES,
	publication: T,
	onDone: () => void
) => {
	const isLOD = publicationType === LOSS_OF_DOCUMENT;
	const isCON = publicationType === CHANGE_OF_NAME;
	const isObituary = publicationType === OBITUARY;
	const isPublicNotice = publicationType === PUBLIC_NOTICE;
	const isAffidavit = publicationType === AFFIDAVIT;

	const photo = publication?.photos?.find((x) => x.type === 'passport')?.url;
	const pubTypeHeader = isAffidavit
		? 'Affidavit'
		: isCON
		? 'Change Of Name'
		: isLOD
		? 'Loss of Document'
		: isObituary
		? 'Obituary'
		: 'Public Notice';

	const getName = () => {
		return isLOD
			? `${(publication as LossOfDocumentPublicationValues)?.firstName} ${
					(publication as LossOfDocumentPublicationValues)?.lastName
			  }`
			: isCON
			? `${(publication as ChangeOfNamePublicationValues)?.oldFirstName} ${
					(publication as ChangeOfNamePublicationValues)?.oldLastName
			  }`
			: isObituary
			? `${(publication as ObituaryValues)?.fullNameOfDeceased}`
			: isPublicNotice
			? `${(publication as PublicNoticeValues)?.firstName} ${
					(publication as PublicNoticeValues)?.middleName
			  } ${(publication as PublicNoticeValues)?.lastName}`
			: '';
	};

	const detailLink = getFullPublicationLink(
		publicationType,
		publication.reference || ''
	);

	if (!photo) {
		setTimeout(() => {
			downloadPDF(publicationType, publication, onDone);
		}, 1000);
	}

	return (
		<div className="flex items-center justify-center fixed left-[-3000px] top-0 w-screen z-[100000] h-screen bg-black/[.2]">
			<div
				id={`publication-${publicationType}-reference-${publication.reference}`}
				className="bg-white min-h-screen px-[64px] relative pt-10 pb-[5px]">
				<div className="w-[667px] pb-[67.66px] mx-auto flex flex-col">
					<div className="flex flex-col space-y-[9px] mx-auto w-[577px]">
						<div className="flex items-center justify-center">
							<EpitomeNewsLarge />
						</div>
						<div className="flex justify-between items-center">
							<span className="font-inter text-[18px] text-[#212121]">
								{moment(publication.createdAt).format('dddd, MMM DD, YYYY')}
							</span>
							<span className="font-inter text-[#212121] text-[18px] leading-[22px]">
								<span className="!font-bold">Classified</span> Ads
							</span>
						</div>
					</div>
					{photo && (
						<div className="mt-[18px] flex items-center justify-center">
							<div className="w-[152px] h-[152px] relative">
								<img
									src={`${API_URL}/images/${photo}`}
									alt={publication.reference}
									onLoad={() => {
										setTimeout(() => {
											console.log('has loaded image, now generating pdf');
											downloadPDF(publicationType, publication, onDone);
										}, 1000);
									}}
									onError={() => {
										toast.error('There was an error');
										onDone();
									}}
									className="absolute w-[152px] h-[152px] top-0 left-0"
								/>
							</div>
						</div>
					)}
					<div className="mt-[21px] flex flex-col space-y-[14px] items-center justify-center">
						<p className="font-bold text-black font-inter">
							{pubTypeHeader} :{' '}
							<span className="font-medium">{capitalize(getName() || '')}</span>
						</p>
						<p className="text-575555 font-inter">
							Ref : <span className="font-bold">{publication.reference}</span>
						</p>
					</div>
					<div className="mt-[26px]">
						<p className="text-base leading-6 max-w-[667px] mx-auto">
							{getPublicationText(publicationType, publication)}
						</p>
					</div>
				</div>
				<div className="absolute bottom-[11px] left-0 w-full">
					<div className="flex flex-col items-center justify-center space-y-[9px]">
						<p className="text-center text-575555 font-medium">
							To verify this publication, please visit{' '}
							<a href={detailLink}>{detailLink}</a>
						</p>
						<span className="font-medium text-black text-12">
							&copy;&nbsp;The Epitome News {new Date().getFullYear()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);

};


export default createPDF;
