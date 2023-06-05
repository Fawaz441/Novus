import React, { useEffect, useState } from 'react';
import clsx from 'classnames';
import { isEmpty, trim } from 'lodash';
import { toast } from 'react-hot-toast';

interface DeclinePublicationModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: (note: string) => void;
}

const DeclinePublicationModal: React.FC<DeclinePublicationModalProps> = ({
	visible,
	onClose,
	onConfirm,
}) => {
	const [note, setNote] = useState('');

	useEffect(() => {
		if (!visible) {
			setNote('');
		}
	}, [visible]);

	const startReject = () => {
		if (isEmpty(trim(note))) {
			toast.error('Please type in a rejection reason');
			return;
		}
		onConfirm(note)
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
				<p className="mt-[15px] text-12 text-575555">
					Please leave a brief description as to why this publication is being
					declined
				</p>
				<textarea
					onChange={(e) => setNote(e.target.value)}
					value={note}
					className="my-2 bg-[#D8D8D8] rounded-3 font-medium text-black text-12 p-1 w-full border-none outline-none h-[89px] resize-none"
				/>
				<div className="flex space-x-6">
					<button
						onClick={() => onClose()}
						className="h-10 flex-1 bg-white rounded-[2px] border-[0.2px] border-black flex text-12 font-semibold items-center justify-center">
						Cancel
					</button>
					<button
						onClick={() => startReject()}
						className="h-10 flex-1 bg-black rounded-[2px] text-white flex text-12 font-semibold items-center justify-center">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeclinePublicationModal;
