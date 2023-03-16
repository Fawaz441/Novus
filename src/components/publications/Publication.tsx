import React from 'react';
import { ReactComponent as Announcement } from 'assets/images/publications/announcement.svg';
import PublicationActions from './PublicationActions';
import { toggleHiddenElement } from 'utils/ui-functions';

interface PublicationProps {
	id: number;
}

const Publication: React.FC<PublicationProps> = ({ id }) => (
	<div className="flex max-w-[535px] space-x-5" id={`publication-${id}`}>
		<Announcement className="flex-shrink-0" />
		<div className="w-full">
			<div className="mb-4 flex w-full items-center justify-between">
				<div className="flex flex-col space-y-1">
					<span className="text-boldGray text-10 leading-[11.74px]">
						Reference Number
					</span>
					<span className="text-black font-semibold text-12 leading-[14.09px]">
						CON2345JHFHGHGH
					</span>
				</div>
				<div className="relative">
					<PublicationActions tag={id} />
					<button
						onClick={(e) => {
							e.stopPropagation();
							toggleHiddenElement(`#publication-${id}-actions`);
						}}
						type="button"
						className="flex flex-col pl-2 items-end space-y-[5px]"
					>
						<div className="border-faintGray h-[2px] w-[2px] rounded-full border" />
						<div className="border-faintGray h-[2px] w-[2px] rounded-full border" />
						<div className="border-faintGray h-[2px] w-[2px] rounded-full border" />
					</button>
				</div>
			</div>
			<p className="font-medium text-boldGrey text-12 leading-[20.09px] mb-[14px]">
				I ,formerly known as Emmanuel Martins , wish to be known and addressed
				as Immanuel Marto. Affidavit dated 10/01/23, sworn at Ikoyi Magistrate
			</p>
			<div className="flex items-center justify-between w-full">
				<div className="flex flex-col space-y-1">
					<span className="text-boldGray text-10 leading-[11.74px]">
						Date Published :
					</span>
					<span className="text-black font-semibold text-12 leading-[14.09px]">
						12 Jan 2023
					</span>
				</div>
				<button
					type="button"
					className="text-[11px] leading-[18.41px] text-primary font-medium rounded-6 bg-primary2 py-2 px-6"
				>
					View Publication
				</button>
			</div>
		</div>
	</div>
);

export default Publication;
