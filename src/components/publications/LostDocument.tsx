import React from 'react';
import lostDocument from 'assets/images/publications/lost-document.png';
import PublicationActions from './PublicationActions';
import { toggleHiddenElement } from 'utils/ui-functions';

interface LostDocumentProps {
	id: number;
}

const LosttDocument: React.FC<LostDocumentProps> = ({ id }) => (
	<div
		className="flex max-w-[535px] self-start space-x-5"
		id={`publication-${id}`}
	>
		<img
			src={lostDocument}
			alt="Lost document"
			className="flex-shrink-0 pointer-events-none max-h-[151px]"
		/>
		<div className="w-full">
			<div className="mb-4 flex w-full items-center justify-between">
				<div className="flex flex-col space-y-1">
					<span className="text-575555 text-10 leading-[11.74px]">
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
						<div className="border-9B9B9B h-[2px] w-[2px] rounded-full border" />
						<div className="border-9B9B9B h-[2px] w-[2px] rounded-full border" />
						<div className="border-9B9B9B h-[2px] w-[2px] rounded-full border" />
					</button>
				</div>
			</div>
			<p className="font-medium text-575555 text-12 leading-[20.09px] mb-[14px]">
				This is to notify the general public, that I , Mr Adeolu olu of No 12
				jakande street, Ipaja Lagos state lost a landed document with Property
				ID 445 DED 7T0.,
			</p>
			<div className="flex items-center justify-between w-full">
				<div className="flex flex-col space-y-1">
					<span className="text-575555 text-10 leading-[11.74px]">
						Date Published :
					</span>
					<span className="text-black font-semibold text-12 leading-[14.09px]">
						12 Jan 2023
					</span>
				</div>
				<button
					type="button"
					className="text-[11px] leading-[18.41px] text-7108F6 font-medium rounded-6 bg-DFC7FF py-2 px-6"
				>
					View Publication
				</button>
			</div>
		</div>
	</div>
);

export default LosttDocument;
