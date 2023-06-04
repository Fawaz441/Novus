import { PUBLICATION_TYPES } from 'utils/constants';
import {PublicationPayment} from 'components/publications';


const ChangeOfNamePayment = () => {
	return(
		<PublicationPayment publicationType={PUBLICATION_TYPES.CHANGE_OF_NAME}/>
	)
}

export default ChangeOfNamePayment