import { Wrapper } from 'components/navigation';
import clsx from 'classnames';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'components/inputs';
import { routes } from 'utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';

type Tab = 'check' | 'create';
// for mobile screens only
const TABS: { type: Tab; name: string }[] = [
	{ type: 'check', name: 'Check  Publication' },
	{ type: 'create', name: 'Create Publication' },
];

const CREATE_LINKS = [
	{ name: 'Change Of Name', route: routes.pub_forms.change_of_name },
	{ name: 'Loss Of Documents', route: routes.pub_forms.loss_of_document },
	{ name: 'Obituary', route: routes.pub_forms.loss_of_document },
	{ name: 'Affidavit', route: routes.pub_forms.loss_of_document },
];

const CheckOrCreatePublication = () => {
	const { search } = useLocation();
	const [activeTab, setActiveTab] = useState<Tab>(
		search.includes(TABS[1].type) ? TABS[1].type : TABS[0].type
	);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<{ referenceNumber: string }>();

	const onSubmit = (data: any) => console.log(data);
	return (
		<Wrapper>
			<div className="flex items-center pt-5">
				{TABS.map((tab, index) => (
					<button
						onClick={() => setActiveTab(tab.type)}
						key={index}
						className={clsx(
							'h-[45px] rounded flex-1 items-center justify-center flex bg-transparent text-12 text-575555 font-medium leading-[14.09px]',
							{
								'!bg-[#F1E7FF] !text-7108F6': activeTab === tab.type,
							}
						)}>
						{tab.name}
					</button>
				))}
			</div>
			<div className="mt-10 pb-[50px]">
				{activeTab === 'check' ? (
					<div>
						<p className="text-black text-[15px] leading-[23.99px] mb-[154px]">
							You can check the status of publications made, by providing a
							reference number below
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Controller
								control={control}
								name="referenceNumber"
								render={({ field: { onChange, value, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										hasError={!!errors.referenceNumber}
										wrapperClassName="!bg-F9F9F9"
										ref_={ref}
										label="Please enter publication reference number"
										placeholder="RRT989XXXXX"
										filterIconClassName="!fill-08F692"
										filterIconWrapperClassName="!bg-white"
									/>
								)}
							/>
						</form>
					</div>
				) : (
					<div>
						<p className="text-black text-[15px] leading-[23.99px] mb-[46px]">
							You can create classified ads publications by clicking on the
							buttons below
						</p>
						<ul className="flex flex-col space-y-10">
							{CREATE_LINKS.map((link, index) => {
								const isEven = (index + 1) % 2 === 0;
								return (
									<li key={index}>
										<Link
											to={link.route}
											className={clsx(
												'border-[0.5px] rounded bg-F9F9F9 px-[31px] border-DFC7FF flex items-center justify-between h-20',
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
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</Wrapper>
	);
};

export default CheckOrCreatePublication;
