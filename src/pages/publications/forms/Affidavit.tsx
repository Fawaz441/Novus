import { Wrapper } from 'components/navigation';
import clsx from 'classnames';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import React from 'react';

const AFFIDAVIT_LINKS = [
	{
		name: 'Abia High Court  - Affidavit',
		link: 'https:/affidavit.abiahighcourt.org',
	},
	{
		name: 'Oyo State Judiciary - Affidavit',
		link: 'https://comis.oyostatejudiciary.oy.gov.ng/account.html',
	},
];

const Affidavit = () => {
	return (
		<Wrapper isPublications>
			<div className="flex items-center justify-center">
				<ul className='flex flex-col space-y-10 mt-10'>
					{AFFIDAVIT_LINKS.map((link, index) => {
						const isEven = (index + 1) % 2 === 0;
						return (
							<li key={index}>
								<a
									href={link.link}
                  target="_blank"
                  rel="noreferrer"
									className={clsx(
										'border-[0.5px] space-x-3 rounded bg-F9F9F9 px-[31px] border-DFC7FF flex items-center justify-between h-20',
										{
											'!bg-7108F6': isEven,
										}
									)}>
									<span
										className={clsx(
											'text-white text-sm leading-[16.44px] font-medium',
											{ '!text-7108F6': !isEven }
										)}>
										{link.name}
									</span>
									<Filter
										className={clsx({
											'fill-white': isEven,
											'fill-7108F6': !isEven,
										})}
									/>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</Wrapper>
	);
};

export default Affidavit;
