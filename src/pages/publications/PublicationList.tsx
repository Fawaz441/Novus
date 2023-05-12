import { Pagination } from 'components/general';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { MobileFormsNavigation, Publication } from 'components/publications';
import React from 'react';

const PublicationList: React.FC = () => {
	return (
		<Wrapper isPublications>
			<div className="mini:hidden">
				<MobileFormsNavigation isForm={false} />
			</div>
			<div className="hidden mini:block">
				<FilterAndSearch
					searchIconClassName="!fill-7108F6"
					searchPlaceholder="Reference Number, Keywords, e.t.c"
				/>
			</div>
			<div className="mt-[90px] mid:mt-[120px] relative flex flex-col">
				<div className="flex flex-col overflow-x-hidden space-y-[26px] mid:grid mid:gap-x-10 w-full pub-list mid:gap-y-[30px] h-full mini:h-[calc(100vh_-_291px)] overflow-y-auto scrollbar-hide">
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
