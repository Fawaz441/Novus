import React from 'react';
import clsx from 'classnames';
import { ReactComponent as Speaker } from 'assets/icons/admin/speaker.svg';
import { toast } from 'react-hot-toast';

interface DeletePublicationModalProps {
	visible: boolean;
	onClose: () => void;
}

const DeletePublicationModal: React.FC<DeletePublicationModalProps> = ({
	visible,
	onClose,
}) => {
	const onConfirm = () => {
		onClose();
		toast.success('Publication deleted successfully');
	};
	return (
		<div
			className={clsx(
				'bg-black/[.1] z-[1000] flex items-center justify-center fixed top-0 left-0 h-screen w-full opacity-0 transition-all duration-300 pointer-events-none',
				{
					'!pointer-events-auto !opacity-100': visible,
				}
			)}
			onClick={() => onClose()}>
			<div
				className="bg-white border-[0.5px] border-9B9B9B rounded-6 py-[19px] px-[25px]"
				onClick={(e) => e.stopPropagation()}>
				<div className="flex items-center justify-between">
					<button
						className="font-medium text-12 text-black"
						onClick={() => onClose()}>
						Back
					</button>
					<h2 className="font-bold text-[20px] text-black">EPITOME</h2>
					<button className="font-medium text-12 text-black opacity-0 pointer-events-none">
						Back
					</button>
				</div>
				<div className="flex space-x-[50px] items-center my-6">
					<p className="text-12 text-575555">
						You are about to delete a publication
					</p>
					<Speaker />
				</div>
				<div className="flex space-x-6">
					<button
						onClick={() => onClose()}
						className="h-10 flex-1 bg-white rounded-[2px] border-[0.2px] border-black flex text-12 font-semibold items-center justify-center">
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="h-10 flex-1 bg-black rounded-[2px] text-white flex text-12 font-semibold items-center justify-center">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeletePublicationModal;
