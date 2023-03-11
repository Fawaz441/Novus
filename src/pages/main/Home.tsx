import React from 'react';
import HeadlineImage from 'assets/images/sample-headline.png';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { Headline, OtherNews } from 'components/news/items';

const Home: React.FC = () => (
	<Wrapper>
		<FilterAndSearch />
		<div className="mt-[120px] relative">
			<div className="flex-grow-0 mr-[422px]">
				<div className="flex flex-col space-y-[15.14px] pb-[150px]">
					<span className="text-black text-base">
						Today&apos;s <span className="font-bold">Headlines</span>
					</span>
					<Headline
						image={HeadlineImage}
						header={
							'The Nigeria stock exchange has experienced one of its greatest breakthrough'
						}
						author={'OLUIBADAN, JAJA OF OPOBO and PROF JULIET '}
						date={'01/01/2001 09:00 PM EST'}
					/>
				</div>
			</div>
			<OtherNews />
		</div>
	</Wrapper>
);

export default Home;
