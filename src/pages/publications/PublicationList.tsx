import { Pagination } from 'components/general';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { Publication } from 'components/publications';
import React, { useEffect } from 'react';
import {
	hideAllPublicationActions,
	toggleHiddenElement,
} from 'utils/ui-functions';

const PublicationList: React.FC = () => {
	useEffect(() => {
		document
			.querySelector('body')
			?.addEventListener('click', hideAllPublicationActions);
		document
			.querySelector('body')
			?.addEventListener('click', () =>
				toggleHiddenElement('.topnav-publication-actions', 'hide')
			);

		return () => {
			document
				.querySelector('body')
				?.removeEventListener('click', hideAllPublicationActions);
			document
				.querySelector('body')
				?.removeEventListener('click', () =>
					toggleHiddenElement('.topnav-publication-actions', 'hide')
				);
		};
	}, []);

	return (
		<Wrapper isPublications>
			<FilterAndSearch
				searchIconClassName="!fill-primary"
				searchPlaceholder="Reference Number, Keywords, e.t.c"
			/>
			<div className="mt-[120px] relative flex flex-col">
				<div className="grid gap-x-10 grid-cols-2 gap-y-[30px] h-[calc(100vh_-_291px)] overflow-y-auto scrollbar-hide">
					<Publication id={1} />
					<Publication id={2} />
					<Publication id={3} />
					<Publication id={4} />
					<Publication id={5} />
					<Publication id={6} />
					<Publication id={7} />
				</div>
				<div className="flex items-center justify-center h-[81px] flex-shrink-0">
					<Pagination />
				</div>
			</div>
		</Wrapper>
	);
};

export default PublicationList;
