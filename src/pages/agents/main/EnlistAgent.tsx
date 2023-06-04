import { ReactComponent as LinkIcon } from 'assets/icons/news/link.svg';
import { Wrapper } from 'components/agents/navigation';
import React, { useState } from 'react';
import { ReactComponent as Folder } from 'assets/images/agents/folder.svg';
import { isEmpty } from 'lodash';
import clsx from 'classnames';
import { Input } from 'components/inputs';
import { EnlistedAgent } from 'components/agents/dashboard';
import { Pagination } from 'components/general';
import samplePicture from 'assets/images/agents/sample-picture.png';
import { ReactComponent as Copy } from 'assets/icons/agents/copy.svg';
import EnlistedAgentDetails from 'components/agents/dashboard/EnlistedAgentDetails';

const invitedAgents = [
	{
		name: 'Chinedu Olaitan',
		tag: '23DVGB4',
		email: 'email@ymail.com',
		active: true,
	},
	{
		name: 'Bidemi Joshua',
		tag: '23DVGB5',
		email: 'email@ymail.com',
		active: false,
	},
	{ name: 'John Paul', tag: '23DVGB6', email: 'email@ymail.com', active: true },
];

const EnlistAgent = () => {
	const [inviteLinkVisible, setInviteLinkVisible] = useState(false);
	const [filterText, setFilterText] = useState('');
	const [searchText, setSearchText] = useState('');
	const hasInvitedAgents = !isEmpty(invitedAgents);
	return (
		<Wrapper>
			<EnlistedAgentDetails />
			<div
				role="presentation"
				onClick={() => setInviteLinkVisible(false)}
				className={clsx(
					'z-[1000] absolute top-[-100px] left-[50%] translate-x-[-50%] transition-all duration-500',
					{
						'top-[171px]': inviteLinkVisible,
					}
				)}
			>
				<div className="cursor-pointer h-[67px] flex justify-between rounded-6 space-x-[74px] items-center px-[33px] py-3 bg-[#ECEEF2]">
					<p className="font-medium text-sm text-575555">
						Click to copy link to invite agent
					</p>
					<div className="bg-white rounded-full h-11 w-11 flex items-center justify-center">
						<Copy />
					</div>
				</div>
			</div>
			{inviteLinkVisible && (
				<div
					onClick={() => setInviteLinkVisible(false)}
					className="fixed bg-[black]/[.2] top-0 left-0 z-[999] h-full w-full transition-all duration-500"
				/>
			)}
			<div className="mt-[41px] pb-10 flex justify-between">
				<div className="flex flex-col space-y-[21px]">
					<button
						type="button"
						className="self-start font-bold text-sm text-[16.44px] text-black"
					>
						Agents
					</button>
					<div className="flex flex-col">
						<div className="h-[58px] w-[58px] rounded-full overflow-hidden">
							<img src={samplePicture} alt="user" />
						</div>
						<div className="h-[58px] w-[58px] rounded-full overflow-hidden -translate-y-4">
							<img src={samplePicture} alt="user" />
						</div>
						<div className="h-[58px] w-[58px] rounded-full overflow-hidden -translate-y-8">
							<img src={samplePicture} alt="user" />
						</div>
						<div className="h-[58px] w-[58px] rounded-full overflow-hidden -translate-y-12">
							<img src={samplePicture} alt="user" />
						</div>
						<span className="-translate-y-12 text-center text-sm leading-[18.2px] text-black">
							100+
						</span>
					</div>
				</div>
				<div className="px-[43px] py-10 border border-D9D9D9 bg-white rounded-6 transition-all duration-200">
					{!hasInvitedAgents ? (
						<div>
							<div className="px-[48px] py-[7px] flex items-center justify-between w-[480px] bg-7108F6 rounded-6">
								<span className="text-white text-base leaidng-[21.76px] font-semibold">
									Become An Agent Manager
								</span>
								<Folder />
							</div>
							<p className="max-w-[468px] mb-[83px] mt-11 font-medium text-base leading-6 text-575555">
								You can earn more, as an agent manager, how? When agents
								register under you, every commission they get, a percentage is
								given to you.
							</p>
							<div className="flex">
								<div className="flex items-center space-x-2 ml-auto">
									<div className="h-[30px] w-[30px] rounded-full bg-F4F4F4 border border-575555 flex items-center justify-center">
										<LinkIcon className="stroke-575555" />
									</div>
									<span className="text-black text-base font-medium leading-[18px]">
										Copy Link
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-col space-y-8">
							<div className="flex space-x-[33px]">
								<Input
									value={filterText}
									onChange={({ target: { value } }) => setFilterText(value)}
									containerClassName="!w-[200px]"
									wrapperClassName="!border-[0.2px] !border-9B9B9B"
									placeholder="Status"
									hasFilterIcon={false}
									label="Filter"
								/>
								<Input
									value={searchText}
									onChange={({ target: { value } }) => setSearchText(value)}
									containerClassName="!w-[421px]"
									wrapperClassName="!border-[0.2px] !border-9B9B9B"
									placeholder="Agent ID, name, email"
									hasFilterIcon={false}
									label="Search"
								/>
							</div>
							<div>
								<div className="relative pb-[30px]">
									<div className="absolute bottom-0 h-[30px] w-full left-0 flex items-center justify-center">
										<Pagination
										nextDisabled
										prevDisabled
										 />
									</div>
									<ul className="flex flex-col space-y-[18px] overflow-y-auto h-[500px]">
										{invitedAgents.map((agent) => (
											<EnlistedAgent
												key={agent.tag}
												name={agent.name}
												tag={agent.tag}
												email={agent.email}
												active={agent.active}
											/>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
				<button
					type="button"
					className={clsx(
						'self-start opacity-0 rounded pointer-events-none font-semibold py-4 px-[27px] text-base leading-[20.8px] text-white bg-7108F6',
						{
							'!opacity-100 !pointer-events-auto': hasInvitedAgents,
						}
					)}
					onClick={() => setInviteLinkVisible(true)}
				>
					Invite Agents
				</button>
			</div>
		</Wrapper>
	);
};

export default EnlistAgent;
