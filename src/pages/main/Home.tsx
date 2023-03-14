import React from 'react';
import HeadlineImage from 'assets/images/sample-headline.png';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { Headline, OtherNews, Video } from 'components/news/items';

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
						shares={2500}
						reads={1200000}
						links={1000}
						tag={'FINANCE'}
					/>
					<div className="mt-[62px] flex flex-col space-y-[14px]">
						<h4 className="font-bold text-black text-base">Videos</h4>
						<div className="flex space-x-[39px]">
							<Video />
							<Video />
						</div>
						<div className="flex space-x-[39px] mt-[27px]">
							<div className="bg-[#F3F3F3] w-full h-20 flex items-center justify-center rounded-6">
								<span className="font-bold text-sm text-boldGray">ADS</span>
							</div>
							<div className="bg-[#F3F3F3] w-full h-20 flex items-center justify-center rounded-6">
								<span className="font-bold text-sm text-boldGray">ADS</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<OtherNews />
		</div>
	</Wrapper>
);

export default Home;
