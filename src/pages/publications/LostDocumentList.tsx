import { Pagination } from 'components/general';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { LosttDocument } from 'components/publications';
import React from 'react';

const LostDocumentList: React.FC = () => {
	return (
		<Wrapper isPublications>
			<FilterAndSearch
				searchIconClassName="!fill-7108F6"
				searchPlaceholder="Reference Number, Keywords, e.t.c"
			/>
			<div className="mt-[120px] relative flex flex-col">
				<div className="grid gap-x-10 w-full pub-list gap-y-[30px] h-[calc(100vh_-_291px)] overflow-y-auto scrollbar-hide">
					<LosttDocument id={1} />
					<LosttDocument id={2} />
					<LosttDocument id={3} />
					<LosttDocument id={4} />
					<LosttDocument id={5} />
					<LosttDocument id={6} />
					<LosttDocument id={7} />
				</div>
				<div className="flex items-center justify-center h-[81px] flex-shrink-0">
					<Pagination />
				</div>
			</div>
		</Wrapper>
	);
};

export default LostDocumentList;
