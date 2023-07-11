import { isEmpty } from 'lodash';
import isEmail from 'validator/lib/isEmail';

export const validators = {
	isRequiredString: { validate: (v: string) => !isEmpty(v?.trim()||"") },
	isRequiredEmail: {
		validate: (v: string) => isEmail(v?.trim()||""),
	},
};
