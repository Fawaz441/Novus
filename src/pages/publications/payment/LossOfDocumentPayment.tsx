import { PUBLICATION_TYPES } from 'utils/constants';
import {PublicationPayment} from 'components/publications';


const LossOfDocumentPayment = () => {
	return(
		<PublicationPayment publicationType={PUBLICATION_TYPES.LOSS_OF_DOCUMENT}/>
	)
}

export default LossOfDocumentPayment