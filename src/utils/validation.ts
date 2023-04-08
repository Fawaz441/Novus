import { isEmpty } from 'lodash';

var validEmailRegex =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validators = {
	isRequiredString: { validate: (v: string) => !isEmpty(v?.trim()) },
	isRequiredEmail: {
		validate: (v: string) => !!v?.trim().match(validEmailRegex),
	},
};
