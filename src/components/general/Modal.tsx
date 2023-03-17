import React from 'react';
import clsx from 'classnames';
import { MODALS } from 'utils/constants';
import { useModal } from 'hooks';

interface ModalProps {
	name: MODALS;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, name }) => {
	const { isVisible, closeModal } = useModal();
	return (
		<div
			className={clsx(
				'fixed top-0 z-[999] p-4 left-0 transition-all duration-150 flex items-center justify-center cursor-pointer h-screen w-screen bg-black/[.5] opacity-0 pointer-events-none',
				{ '!opacity-100 !pointer-events-auto': isVisible(name) }
			)}
			role="presentation"
			onClick={closeModal}
		>
			<div
				className="cursor-default"
				role={'presentation'}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
