import { ModalContext } from 'components/contexts';
import { useContext } from 'react';
import { MODALS } from 'utils/constants';
import { handleBodyScroll } from 'utils/ui-functions';

const useModal = () => {
	const { activeModal, setActiveModal } = useContext(ModalContext);

	const isVisible = (modal: MODALS) => {
		return modal === activeModal && !!activeModal;
	};

	const closeModal = () => {
		setActiveModal(null);
		setTimeout(() => {
			handleBodyScroll('enable');
		}, 500);
	};

	const showModal = (name: MODALS) => {
		setActiveModal(name);
		handleBodyScroll('disable');
	};

	return {
		isVisible,
		closeModal,
		showModal,
	};
};

export default useModal;
