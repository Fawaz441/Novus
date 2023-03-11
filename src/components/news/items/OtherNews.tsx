import React from 'react';
import woman from 'assets/images/woman.png';
import OtherNewsItem from './OtherNewsItem';

const OtherNews: React.FC = () => (
	<div className="w-[341px] flex flex-col space-y-[19px] flex-shrink-0 fixed right-12 top-[210px]">
		<div className="flex items-center justify-between">
			<span className="text-base font-medium text-black">
				Other <span className="font-bold">News</span>
			</span>
			<button type="button" className="font-bold font-oswald text-black">
				See all
			</button>
		</div>
		<div className="flex flex-col space-y-[34px] overflow-auto pb-[150px] scrollbar-hide h-[calc(100vh_-_210px)]">
			<OtherNewsItem
				header="Governorship election: APC, Sanwo-Olu jittery as Obi’s  ..."
				tag="ELECTIONS"
				image={woman}
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
