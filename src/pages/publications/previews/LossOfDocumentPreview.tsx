import Preview from 'components/publications/Preview';
import { PUBLICATION_TYPES } from 'utils/constants';

const LossOfDocumentPreview = () => {
	return(
		<Preview publicationType={PUBLICATION_TYPES.LOSS_OF_DOCUMENT}/>
	)
};

export default LossOfDocumentPreview;
