import React from 'react';
import woman from 'assets/images/woman.png';
import nis from 'assets/icons/publications/nis.png';
import OtherNewsItem from './OtherNewsItem';
import OtherNewsTags from './OtherNewsTags';

const OtherNews: React.FC = () => (
	<div className="w-full mini:w-[341px] flex flex-col space-y-[19px] flex-shrink-0 mini:fixed right-12 top-[210px]">
		<div className="flex items-center justify-between">
			<span className="text-12 mid:text-base font-medium text-black">
				Other <span className="font-bold">News</span>
			</span>
			<button
				type="button"
				className="hidden mid:block font-bold font-oswald text-black">
				See all
			</button>
		</div>
		<OtherNewsTags />
		<div className="flex flex-col space-y-[34px] overflow-auto pb-[150px] scrollbar-hide mini:h-[calc(100vh_-_210px)]">
			<OtherNewsItem
				header="Governorship election: APC, Sanwo-Olu jittery as Obi’s  ..."
				tag="Nigeria Immigration"
				image={nis}
				tagButtonClassName='!bg-[#BFFFE4] !text-[#009A49]'
				date="2 days ago"
				description="The All Progressives Congress, APC, in Lagos State and Governor Babajide Sanwo-Olu are wide awake ahead of the next round of general elections."
				author="OLUIBADAN, JAJA OF OPOBO and PROF JULIET "
			/>
			<OtherNewsItem
				header="Governorship election: APC, Sanwo-Olu jittery as Obi’s  ..."
				tag="ELECTIONS"
				image={woman}
				date="2 days ago"
				description="The All Progressives Congress, APC, in Lagos State and Governor Babajide Sanwo-Olu are wide awake ahead of the next round of general elections."
				author="OLUIBADAN, JAJA OF OPOBO and PROF JULIET "
			/>
		</div>
	</div>
);

export default OtherNews;
