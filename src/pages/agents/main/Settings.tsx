import React, { useState } from 'react';
import moment from 'moment';
import { Wrapper } from 'components/agents/navigation';
import { ReactComponent as ProfileCompletion } from 'assets/icons/agents/profile-completion.svg';
import { ReactComponent as Edit } from 'assets/icons/agents/edit.svg';
import profile from 'assets/images/agents/sample-picture.png';
import { useForm, Controller } from 'react-hook-form';
import { Calendar, Input, Select } from 'components/inputs';
import { validators } from 'utils/validation';

interface SettingsValues {
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	dob: Date;
	address: string;
	account_number: string;
	withdraw_pin: string;
	security_email: string;
	password: string;
}

const Settings = () => {
	const [showCalendar, setShowCalendar] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<SettingsValues>({
		defaultValues: { dob: new Date(2005, 10, 1) },
	});

	const onSubmit = (data: SettingsValues) => {
		console.log(data);
	};
	return (
		<Wrapper>
			<Calendar
				value={getValues('dob') || new Date(2005, 10, 1)}
				visible={showCalendar}
				onChange={(date) => setValue('dob', date)}
				onClose={() => setShowCalendar(false)}
				maxDate={new Date(2005, 10, 1)}
			/>
			<div className="mt-2 flex items-center justify-center">
				<div className="border-[0.5px] border-D9D9D9 rounded-6 py-[25px] px-12 mb-5">
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* 1. personal details */}
						<div className="flex items-center mb-[10px] space-x-[56px]">
							<div className="flex space-x-[19px] items-center">
								<div className="w-8 h-[30px] rounded-3 bg-7108F6 flex items-center justify-center">
									<span className="font-inter text-white font-semibold text-12">
										1
									</span>
								</div>
								<span className="text-13 font-inter text-7108F6">
									Personal Details
								</span>
							</div>
							<div className="flex space-x-[6px] items-center">
								<span className="text-12 leading-[15.6px] text-black w-[80px]">
									Agents <span className="font-bold">Type</span>
								</span>
								<h4 className="font-inter font-medium text-xl leading-[26px] text-black">
									Manager
								</h4>
							</div>
							<div className="flex items-center space-x-[14.97px]">
								<span className="text-sm text-black">
									Profile <span className="font-bold">Completion</span>
								</span>
								<ProfileCompletion />
							</div>
						</div>
						<div className="h-[58px] mb-2 w-[58px] rounded-full relative">
							<img src={profile} alt="profile" className="object-cover" />
							<div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
								<button>
									<Edit />
								</button>
							</div>
						</div>
						<div className="flex mb-[19px] space-x-[43px]">
							{/* first name */}
							<Controller
								control={control}
								name="first_name"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										ref_={ref}
										label="First name"
										containerClassName="flex-1"
										placeholder="Enter your first name"
										wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.first_name}
									/>
								)}
							/>
							{/* last name */}
							<Controller
								control={control}
								name="last_name"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										ref_={ref}
										label="Last name"
										containerClassName="flex-1"
										placeholder="Enter your last name"
										wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.last_name}
									/>
								)}
							/>
						</div>
						<div className="flex mb-[19px] space-x-[43px]">
							{/* email */}
							<Controller
								control={control}
								name="email"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										ref_={ref}
										label="Email"
										containerClassName="flex-1"
										placeholder="email@email.com"
										wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.email}
									/>
								)}
							/>
							{/* gender */}
							<div className="flex-1">
								<Select
									label="Gender"
									options={[
										{ label: 'Male', value: 'Male' },
										{ label: 'Female', value: 'Female' },
									]}
								/>
							</div>
						</div>
						<div className="flex mb-[19px] space-x-[43px]">
							{/* dob */}
							<Controller
								control={control}
								name="dob"
								rules={{ required: true }}
								render={({ field: { value } }) => (
									<Input
										value={moment(value || new Date()).format('DD-MMM-YYYY')}
										onClick={() => setShowCalendar(true)}
										label="Date Of Birth"
										containerClassName="flex-1"
										placeholder="01/02/03"
										wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.dob}
									/>
								)}
							/>
							{/* address */}
							<Controller
								control={control}
								name="address"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										ref_={ref}
										label="Address"
										containerClassName="flex-1"
										placeholder="44 isolo road"
										wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.address}
									/>
								)}
							/>
						</div>
						{/* 2. account details */}
						<div className="mt-7">
							<div className="flex space-x-[19px] items-center">
								<div className="w-8 h-[30px] rounded-3 bg-7108F6 flex items-center justify-center">
									<span className="font-inter text-white font-semibold text-12">
										2
									</span>
								</div>
								<span className="text-13 font-inter text-7108F6">
									Account Details
								</span>
							</div>
							<div className="mt-[11px] mb-[19px] space-x-[43px] flex">
								{/* banks */}
								<div className="flex-1">
									<Select
										label="Bank"
										options={[{ label: 'Zenith Bank', value: 'Zenith Bank' }]}
									/>
								</div>
								{/* dob */}
								<Controller
									control={control}
									name="account_number"
									rules={validators.isRequiredString}
									render={({ field: { value, ref, onChange } }) => (
										<Input
											ref_={ref}
											onChange={onChange}
											value={value}
											label="Account Number"
											containerClassName="flex-1"
											placeholder="0003456789"
											wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
											hasFilterIcon={false}
											labelClassName="!text-black"
											hasError={!!errors.account_number}
										/>
									)}
								/>
							</div>
							<div className="mt-[11px] mb-[19px] space-x-[43px] flex">
								{/* withdraw pin */}
								<Controller
									control={control}
									name="withdraw_pin"
									rules={validators.isRequiredString}
									render={({ field: { value, ref, onChange } }) => (
										<Input
											ref_={ref}
											onChange={onChange}
											value={value}
											label="Withdraw Pin"
											containerClassName="flex-1"
											placeholder="****"
											wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
											hasFilterIcon={false}
											labelClassName="!text-black"
											hasError={!!errors.withdraw_pin}
										/>
									)}
								/>
								{/* blank */}
								<div className="flex-1">
									<div />
								</div>
							</div>
						</div>
						{/* 3. security */}
						<div className="mt-7">
							<div className="flex space-x-[19px] items-center">
								<div className="w-8 h-[30px] rounded-3 bg-7108F6 flex items-center justify-center">
									<span className="font-inter text-white font-semibold text-12">
										3
									</span>
								</div>
								<span className="text-13 font-inter text-7108F6">Security</span>
							</div>
							<div className="mt-[11px] mb-[19px] space-x-[43px] flex">
								{/* security email */}
								<Controller
									control={control}
									name="security_email"
									rules={validators.isRequiredEmail}
									render={({ field: { value, ref, onChange } }) => (
										<Input
											ref_={ref}
											onChange={onChange}
											value={value}
											label="Email"
											containerClassName="flex-1"
											placeholder="email@email.com"
											wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
											hasFilterIcon={false}
											labelClassName="!text-black"
											hasError={!!errors.security_email}
										/>
									)}
								/>
								{/* password */}
								<Controller
									control={control}
									name="password"
									rules={validators.isRequiredString}
									render={({ field: { value, ref, onChange } }) => (
										<Input
											ref_={ref}
											onChange={onChange}
											value={value}
											label="Password"
											containerClassName="flex-1"
											placeholder="0003456789"
											wrapperClassName="!border-[0.2px] bg-white !border-[#575555]"
											hasFilterIcon={false}
											labelClassName="!text-black"
											hasError={!!errors.password}
										/>
									)}
								/>
							</div>
						</div>
						<button className="mt-[45px] w-full h-[50px] rounded bg-7108F6 flex items-center justify-center">
							<span className="font-bold text-white text-base">
								Save Changes
							</span>
						</button>
					</form>
				</div>
			</div>
		</Wrapper>
	);
};

export default Settings;
