import { Location } from 'react-router-dom';

export const hideAllPublicationActions = (exceptionElement?: string) => {
	let tags = document.querySelectorAll('.publication-action');
	if (exceptionElement) {
		tags = document.querySelectorAll(
			`.publication-action:not(${exceptionElement})`
		);
	}
	tags.forEach((tag) => tag.classList.remove('active'));
};

type ACTIONS = 'hide' | 'show' | null;

export const toggleHiddenElement = (actionSelector: string, act?: ACTIONS) => {
	const action = document.querySelector(actionSelector);
	if (action) {
		if (act) {
			if (act === 'hide') {
				if (actionSelector.includes('#publication')) {
					hideAllPublicationActions();
				}
				action.classList.remove('active');
			}
			if (act === 'show') {
				if (actionSelector.includes('#publication')) {
					hideAllPublicationActions();
				}
				action.classList.add('active');
			}
		} else {
			if (actionSelector.includes('#publication')) {
				hideAllPublicationActions(actionSelector);
			}
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

export const handleBodyScroll = (action: 'enable' | 'disable' = 'enable') => {
	const el = document.querySelector('html');
	if (el) {
		if (action === 'enable') {
			el.classList.remove('overflow-y-hidden');
		} else {
			el.classList.add('overflow-y-hidden');
		}
	}
};

export const getRandomBoolean = () => Math.random() > 0.5;

export const fakeAPICall = (callback: () => void) => {
	setTimeout(() => {
		callback();
	}, 3000);
};

export const pathIncludesName = (location: Location, name: string) =>
	location.pathname.includes(name);

export const getPubColumns = () => {
	const availableSpace = window.innerWidth - 48 - 239;
	console.log(Math.floor(availableSpace / (535 + 40)));
};
