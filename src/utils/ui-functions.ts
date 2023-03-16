export const hideAllPublicationActions = () => {
	const tags = document.querySelectorAll('.publication-action');
	tags.forEach((tag) => tag.classList.remove('active'));
};

type ACTIONS = 'hide' | 'show' | null;

export const toggleHiddenElement = (actionSelector: string, act?: ACTIONS) => {
	const action = document.querySelector(actionSelector);
	if (action) {
		if (act) {
			if (act === 'hide') {
				action.classList.remove('active');
			}
			if (act === 'show') {
				action.classList.add('active');
			}
		} else {
			action.classList.toggle('active');
		}
	}
};

export const getCoords = (elementSelector: string) => {
	const el = document.querySelector(elementSelector) as HTMLElement;
	if (el) {
		return { x: el.offsetLeft, y: el.offsetTop };
	}
	return { x: 0, y: 0 };
};
