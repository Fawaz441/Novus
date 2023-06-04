import React from 'react';
import { PUBLICATION_TYPES } from 'utils/constants';
import { ReactComponent as Printer } from 'assets/icons/admin/printer.svg';

interface AdminPublicationPreviewProps {
	publicationType?: PUBLICATION_TYPES;
}

const AdminPublicationPreview: React.FC<AdminPublicationPreviewProps> = ({
	publicationType,
}) => {
	return (
		<div className="bg-F9F9F9 rounded-3 py-[17px] px-[35px] border-[#D9D9D9] border-[0.5px]">
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
				<p className="text-12 text-575555 leading-[22.2px]">
					“I, formerly known and addressed as Miss Victoria Vihimga Iyorkaa,
					henceforth wish to be known and addressed as Mrs. Victoria Vihimga
					Terseer Gundu. All former documents remain valid. Federal Inland
					Revenue Service (FIRS) Management and the general public to take note”
				</p>
			</div>
			<div className="mt-[23px] flex flex-col space-y-[9px]">
				<div className="flex items-center justify-between">
					<p className="text-575555 text-12 font-medium">
						Supporting <span className="font-bold">Document</span>
					</p>
					<div className="flex space-x-[19px]">
						<button className="text-12 text-black font-medium">Prev</button>
						<button className="text-12 text-black font-medium">Next</button>
					</div>
				</div>
				<div className="h-[112px] px-[30px] rounded-3 flex items-center justify-between bg-F9F9F9 border-[0.5px] border-black">
					<p className="text-575555 font-medium text-12">
						Marriage Certificate( Click To View )
					</p>
					<Printer />
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
				<div className="mt-[17px] flex space-x-[31px]">
					<button className="h-[40px] flex-1 items-center rounded-[2px] bg-[#FFCDCD] text-[#FF012F] flex justify-center text-12 font-semibold">
						Decline Publication
					</button>
					<button className="h-[40px] flex-1 items-center rounded-[2px] bg-[#BFFFE4] text-[#009A49] flex justify-center text-12 font-semibold">
						Approve Publication
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminPublicationPreview;
