import AgentPublication from 'components/agents/dashboard/AgentPublication';
import { Pagination } from 'components/general';
import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
} from 'interfaces/publications';
import React from 'react';
import clsx from 'classnames';
import { PUBLICATION_TYPES } from 'utils/constants';
import { getPublicationText } from 'utils/functions';

interface AdminPublicationsProps {
	publications:
		| ChangeOfNamePublicationValues[]
		| LossOfDocumentPublicationValues[];
	onNextButtonClick: () => void;
	onPrevButtonClick: () => void;
	prevButtonDisabled: boolean;
	nextButtonDisabled: boolean;
	publicationType: PUBLICATION_TYPES;
	onPublicationSelect: (
		_ref:string
	) => void;
	activePublication:
		string
		| null;
}

const AdminPublications: React.FC<AdminPublicationsProps> = ({
	publications,
	onNextButtonClick,
	onPrevButtonClick,
	prevButtonDisabled,
	nextButtonDisabled,
	publicationType,
	onPublicationSelect,
	activePublication,
}) => {
	return (
		<div className="bg-white border-[0.5px] rounded-[3px] border-D9D9D9 py-4">
			<div className="flex flex-col">
				{publications.map((publication, index) => (
					<button
						className={clsx(
							'w-full h-full border-none outline-none text-left px-[18px] py-4',
							{
								'!bg-black/[.05]':
									publication?.reference === activePublication,
							}
						)}
						key={index}
						onClick={() => onPublicationSelect(publication.reference||"")}>
						<AgentPublication
							status={
								publication.status === 'approve'
									? 'approved'
									: publication.status === 'pending-payment'
									? 'pending'
									: 'declined'
							}
							text={getPublicationText(publicationType, publication)||""}
							id={`${publication.reference}`}
							showStatus={false}
						/>
					</button>
				))}
			</div>
			<div className="mt-[37px] flex items-center justify-center">
				<Pagination
					prevDisabled={prevButtonDisabled}
					nextDisabled={nextButtonDisabled}
					onNextClick={onNextButtonClick}
					onPrevClick={onPrevButtonClick}
				/>
			</div>
		</div>
	);
};

export default AdminPublications;
