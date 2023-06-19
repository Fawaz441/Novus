import React, { useState } from 'react';
import { PUBLICATION_TYPES } from 'utils/constants';
import { ReactComponent as Printer } from 'assets/icons/admin/printer.svg';
import { DeclinePublicationModal } from '../dashboard';
import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
} from 'interfaces/publications';
import DeletePublicationModal from '../dashboard/DeletePublicationModal';
import { getPublicationText } from 'utils/functions';
import { ApproveOrRejectValues } from 'interfaces/admin';
import { isEmpty } from 'lodash';

interface AdminPublicationPreviewProps {
	publicationType: PUBLICATION_TYPES;
	publication:
		| ChangeOfNamePublicationValues
		| LossOfDocumentPublicationValues
		| null;
	approveOrRejectPublication: (
		publicationId: number,
		data: ApproveOrRejectValues
	) => Promise<void>;
	navigate: (_direction: 'left' | 'right') => void;
}

const AdminPublicationPreview: React.FC<AdminPublicationPreviewProps> = ({
	publicationType,
	publication,
	approveOrRejectPublication,
	navigate,
}) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDeclineModal, setShowDeclineModal] = useState(false);
	const isApproved = publication?.status === 'approve';

	const onReject = (note: string) => {
		publication &&
			approveOrRejectPublication(publication.id, {
				approvePublication: false,
				rejectedReason: note,
				publicationType,
			});
	};

	console.log(publication);

	return (
		<div className="bg-F9F9F9 rounded-3 py-[17px] px-[35px] border-[#D9D9D9] border-[0.5px]">
			<DeclinePublicationModal
				visible={showDeclineModal}
				onClose={() => setShowDeclineModal(false)}
				onConfirm={(note: string) => onReject(note)}
			/>
			<DeletePublicationModal
				visible={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
			/>
			<div className="flex items-center justify-between mb-[9px]">
				<span className="text-black font-medium text-12">Change Of Name</span>
				<p className="text-575555 text-12 font-medium">
					Publication <span className="font-bold">Preview</span>
				</p>
			</div>
			<div className="bg-white py-3 px-[19px] rounded-3">
				<p className="text-575555 text-12 font-medium mb-[7px]">
					Publication <span className="font-bold">Body</span>
				</p>
				{publication && (
					<p className="text-12 text-575555 leading-[22.2px]">
						{getPublicationText(publicationType, publication)}
					</p>
				)}
			</div>
			<div className="mt-[23px] flex flex-col space-y-[9px]">
				<div className="flex items-center justify-between">
					<p className="text-575555 text-12 font-medium">
						Supporting <span className="font-bold">Document</span>
					</p>
					<div className="flex space-x-[19px]">
						<button
							className="text-12 text-black font-medium"
							onClick={() => navigate('left')}>
							Prev
						</button>
						<button
							className="text-12 text-black font-medium"
							onClick={() => navigate('right')}>
							Next
						</button>
					</div>
				</div>
				<div className="px-[30px] flex flex-col space-y-[10px] rounded-3 bg-F9F9F9 border-[0.5px] border-black">
					{!isEmpty(publication?.documents) && <div className="h-[10px]" />}
					{publication?.documents?.map((item) => (
						<div
							key={item.id}
							className="[112px] flex items-center justify-between">
							<p className="text-575555 font-medium text-12">
								{item.url}( Click To View )
							</p>
							<Printer />
						</div>
					))}
					{!isEmpty(publication?.documents) && <div className="h-[10px]" />}
				</div>
			</div>
			<div className="mt-[17px] flex space-x-[31px]">
				<button className="h-[40px] flex-1 items-center rounded-[2px] bg-white text-black flex justify-center text-12 font-semibold">
					View Publication
				</button>
				<button className="h-[40px] flex-1 items-center rounded-[2px] bg-black text-white flex justify-center text-12 font-semibold">
					Download Publication
				</button>
			</div>
			<div className="flex flex-col space-y-[13px] mt-[22px]">
				<p className="text-black text-12 font-medium">
					Make <span className="font-bold">Decision</span>
				</p>
				{isApproved ? (
					<div className="mt-[17px] flex space-x-[31px]">
						<button
							onClick={() => setShowDeleteModal(true)}
							className="h-[40px] max-w-[200px] flex-1 items-center rounded-[2px] bg-[#FFCDCD] text-[#FF012F] flex justify-center text-12 font-semibold">
							Delete Publication
						</button>
					</div>
				) : (
					<div className="mt-[17px] flex space-x-[31px]">
						<button
							onClick={() => setShowDeclineModal(true)}
							className="h-[40px] flex-1 items-center rounded-[2px] bg-[#FFCDCD] text-[#FF012F] flex justify-center text-12 font-semibold">
							Decline Publication
						</button>
						<button
							onClick={() =>
								publication &&
								approveOrRejectPublication(publication.id, {
									approvePublication: true,
									publicationType,
								})
							}
							className="h-[40px] flex-1 items-center rounded-[2px] bg-[#BFFFE4] text-[#009A49] flex justify-center text-12 font-semibold">
							Approve Publication
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminPublicationPreview;
