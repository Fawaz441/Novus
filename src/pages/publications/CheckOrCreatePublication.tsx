import { Wrapper } from 'components/navigation';
import clsx from 'classnames';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Select } from 'components/inputs';
import { PUBLICATION_TYPES, routes } from 'utils/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { validators } from 'utils/validation';
import publicationsAPI from 'api/publications';
import { toast } from 'react-hot-toast';
import { Loader } from 'components/general';

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
	{ name: 'Public Notice', route: routes.pub_forms.public_notice },
	{ name: 'Affidavit', route: routes.pub_forms.affidavit },
];

const CheckOrCreatePublication = () => {
	const [loading, setLoading] = useState(false);
	const { search } = useLocation();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<Tab>(
		search.includes(TABS[1].type) ? TABS[1].type : TABS[0].type
	);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<{ referenceNumber: string; filter: any }>();
	const filterOptions = Object.values(PUBLICATION_TYPES).map((item) => ({
		label: item?.replaceAll('-', ' '),
		value: item,
	}));

	const onSubmit = async (submission: {
		referenceNumber: string;
		filter: any;
	}) => {
		setLoading(true);
		try {
			const { data } = await publicationsAPI.getPublicationDetail(
				submission.referenceNumber,
				submission.filter?.value
			);
			if (data.items.length === 0) {
				toast.error('No publication matched your query');
			} else {
				navigate(
					routes.getPubDetailRoute(
						submission.filter?.value,
						submission.referenceNumber
					)
				);
			}
			setLoading(false);
		} catch (e) {
			toast.error('There was an error');
			setLoading(false);
		}
	};

	return (
		<Wrapper>
			<Loader loading={loading} transparent />
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
						<p className="text-black text-[15px] leading-[23.99px] mb-[50px]">
							You can check the status of publications made, by providing a
							reference number below
						</p>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col space-y-8">
							<Controller
								rules={{ required: true }}
								control={control}
								name="filter"
								render={({ field: { onChange, value } }) => (
									<Select
										hasError={!!errors.filter}
										value={value}
										onChange={onChange}
										options={filterOptions}
										label="Publication type"
									/>
								)}
							/>
							<Controller
								control={control}
								name="referenceNumber"
								rules={validators.isRequiredString}
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
							<button
								type="submit"
								className="bg-7108F6 rounded-lg text-white font-bold py-2 w-full">
								Check
							</button>
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
