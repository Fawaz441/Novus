import { isEmpty } from 'lodash';

export const validators = {
	isRequiredString: { validate: (v: string) => !isEmpty(v?.trim()) },
};
