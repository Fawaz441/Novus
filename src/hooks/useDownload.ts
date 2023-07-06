import {
	LossOfDocumentPublicationValues,
	PublicNoticeValues,
	ObituaryValues,
	ChangeOfNamePublicationValues,
} from 'interfaces/publications';
import { useState } from 'react';
import { PUBLICATION_TYPES } from 'utils/constants';
import createPDF from 'utils/pdf-maker';
import { hideAllPublicationActions } from 'utils/ui-functions';

const useDownload = <
	T extends
	| LossOfDocumentPublicationValues
	| PublicNoticeValues
	| ObituaryValues
	| ChangeOfNamePublicationValues
>(
	publicationType: PUBLICATION_TYPES,
	publication: T,
	isAdmin: boolean,
	classNames?: string,
	viewOnly?: boolean
) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const pdfMaker = !isDownloading
		? null
		: createPDF(
			publicationType,
			publication,
			isAdmin,
			() => {
				setIsDownloading(false);
				hideAllPublicationActions();
			},
			classNames,
			viewOnly
		);

	const getPdf = () => setIsDownloading(true);

	return {
		isDownloading,
		getPdf,
		pdfMaker,
	};
};

export default useDownload;
