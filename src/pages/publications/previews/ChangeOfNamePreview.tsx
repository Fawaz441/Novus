import Preview from 'components/publications/Preview';
import { PUBLICATION_TYPES } from 'utils/constants';

const ChangeOfNamePreview = () => {
	return(
		<Preview publicationType={PUBLICATION_TYPES.CHANGE_OF_NAME}/>
	)
};

export default ChangeOfNamePreview;
