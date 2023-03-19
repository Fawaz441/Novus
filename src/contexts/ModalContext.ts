import React, { createContext } from 'react';
import { MODALS } from 'utils/constants';
import { doNothing } from 'utils/functions';

interface ModalContextValues {
	activeModal: MODALS | null;
	setActiveModal: React.Dispatch<React.SetStateAction<MODALS | null>>;
}

const ModalContext = createContext<ModalContextValues>({
	activeModal: null,
	setActiveModal: doNothing,
});

export default ModalContext;
