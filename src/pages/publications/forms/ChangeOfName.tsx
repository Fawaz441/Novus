import {
	FileInput,
	Input,
	RadioOption,
	Select,
	TextArea,
} from 'components/inputs';
import { Wrapper } from 'components/navigation';
import { PublicationCreationSteps } from 'components/publications';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ReactComponent as Swap } from 'assets/icons/swap.svg';
import { ReactComponent as Required } from 'assets/icons/required.svg';
import { validators } from 'utils/validation';

interface ChangeOfNameValues {
	old_first_name: string;
	new_first_name: string;
	old_middle_name: string;
	new_middle_name: string;
	old_last_name: string;
	new_last_name: string;
	email: string;
	phone_number: string;
	house_address: string;
	gender: string;
	publish_on_third_party: boolean;
	concerned_parties: string;
}

const ChangeOfName = () => {
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		watch,
		control,
	} = useForm<ChangeOfNameValues>({
		defaultValues: {
			gender: 'male',
			publish_on_third_party: true,
			old_first_name: '',
			new_first_name: '',
			old_middle_name: '',
			new_middle_name: '',
			old_last_name: '',
			new_last_name: '',
			email: '',
			phone_number: '',
			house_address: '',
			concerned_parties: '',
		},
	});

	const onGenderChange = (value: string) => setValue('gender', value);
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('publish_on_third_party', value);

	const onSubmit = (data: ChangeOfNameValues) => {
		console.log(data);
	};

	const nameChangeOptions = [
		{ label: 'Personal Preference', value: 'Personal Preference' },
	];

	const publicationTypes = [
		{ label: 'Change of name', value: 'Change of name' },
	];

	const thirdPartyNewsPapers = [
		{ label: 'Vanguard #4,500', value: 'Vanguard', price: '#4,500' },
		{ label: 'Punch #4,500', value: 'Punch', price: '#4,500' },
		{ label: 'Guardian #4,500', value: 'guardian', price: '#4,500' },
	];

	const publishWithThirdParty = watch('publish_on_third_party');

	return (
		<Wrapper isPublications>
			<div className="flex flex-col space-y-[33px] pb-[200px]">
				<PublicationCreationSteps active_step="fill_forms" />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex space-x-[51px]"
				>
					<div className="flex-1">
						{/* first_name */}
						<div className="flex items-center mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="old_first_name"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Firstname (Old)"
										containerClassName="w-full"
										placeholder="Hannah"
										hasRequiredIcon
										value={value}
										onChange={onChange}
										hasError={!!errors.old_first_name}
									/>
								)}
							/>
							<div className="flex-shrink-0 mt-[21.09px] mx-[7px] h-12 flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="new_first_name"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Firstname (New)"
										containerClassName="w-full"
										value={value}
										placeholder="Hannah"
										onChange={onChange}
										hasError={!!errors.new_first_name}
									/>
								)}
							/>
						</div>
						{/* middle_name */}
						<div className="flex items-center mb-[38px]">
							<Controller
								rules={validators.isRequiredString}
								control={control}
								name="old_middle_name"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Middlename (Old)"
										containerClassName="w-full"
										hasRequiredIcon
										placeholder="Paul"
										value={value}
										onChange={onChange}
										hasError={!!errors.old_middle_name}
									/>
								)}
							/>
							<div className="flex-shrink-0 mt-[21.09px] mx-[7px] h-12 flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="new_middle_name"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Middlename (New)"
										containerClassName="w-full"
										value={value}
										placeholder="Paul"
										onChange={onChange}
										hasError={!!errors.new_middle_name}
									/>
								)}
							/>
						</div>
						{/* last_name */}
						<div className="flex items-center mb-[50px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="old_last_name"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Lastname (Old)"
										containerClassName="w-full"
										hasRequiredIcon
										placeholder="Zechariah"
										value={value}
										onChange={onChange}
										hasError={!!errors.old_last_name}
									/>
								)}
							/>
							<div className="flex-shrink-0 mt-[21.09px] mx-[7px] h-12 flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="new_last_name"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Lastname (New)"
										containerClassName="w-full"
										value={value}
										placeholder="Daniel"
										onChange={onChange}
										hasError={!!errors.new_last_name}
									/>
								)}
							/>
						</div>
						{/* reason for change */}
						<div className="flex space-x-[38px] mb-[38px]">
							<Select
								label="Reason for Name Change"
								hasRequiredIcon
								options={nameChangeOptions}
							/>
							<Select
								label="Select Publication Type"
								hasRequiredIcon
								options={publicationTypes}
							/>
						</div>
						{/* email and phone number */}
						<div className="flex items-center mb-[38px] space-x-[34px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="email"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Email"
										containerClassName="w-full"
										hasRequiredIcon
										placeholder="Provide a valid email address"
										value={value}
										onChange={onChange}
										hasError={!!errors.email}
									/>
								)}
							/>
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="phone_number"
								render={({ field: { value, onChange } }) => (
									<Input
										label="Phone Number"
										hasRequiredIcon
										containerClassName="w-full"
										value={value}
										placeholder="Provide a valid phone Number"
										onChange={onChange}
										hasError={!!errors.phone_number}
									/>
								)}
							/>
						</div>
						{/* house address */}
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="house_address"
							render={({ field: { value, onChange } }) => (
								<Input
									label="House Address"
									containerClassName="w-full"
									hasRequiredIcon
									placeholder="Enter the correct details of your house address"
									value={value}
									onChange={onChange}
									hasError={!!errors.house_address}
								/>
							)}
						/>
						<div className="mt-[27px] flex items-center space-x-[34px]">
							<div className="flex-1">
								<div className="flex flex-col space-y-[6px]">
									<div className="flex">
										<span className="text-12 text-575555 font-medium leading-[14.09px] mr-[3px]">
											Gender
										</span>
										<Required />
									</div>
									<Controller
										control={control}
										name="gender"
										render={({ field: { value } }) => (
											<div className="flex-1 space-x-[15px] flex">
												<RadioOption
													value="male"
													selectedValue={value}
													onChange={onGenderChange}
												/>
												<RadioOption
													value="female"
													selectedValue={value}
													onChange={onGenderChange}
												/>
											</div>
										)}
									/>
								</div>
							</div>
							<div className="flex-1">
								<div className="flex flex-col space-y-[6px]">
									<span className="text-12 text-575555 font-medium leading-[14.09px] mr-[3px]">
										Do you want to publish on a 3rd party news paper ?
									</span>
									<Controller
										control={control}
										name="publish_on_third_party"
										render={({ field: { value } }) => (
											<div className="flex-1 space-x-[15px] flex">
												<RadioOption
													value={true}
													valuePlaceholder="yes"
													selectedValue={value}
													onChange={onThirdPartyOptionChange}
												/>
												<RadioOption
													value={false}
													valuePlaceholder="no"
													selectedValue={value}
													onChange={onThirdPartyOptionChange}
												/>
											</div>
										)}
									/>
								</div>
							</div>
						</div>
						{publishWithThirdParty && (
							<div className="mt-[29px]">
								<Select
									label="Select Newspaper"
									hasRequiredIcon
									options={thirdPartyNewsPapers}
								/>
							</div>
						)}
					</div>
					<div>
						<div className="flex flex-col space-y-[7px]">
							<div className="flex space-x-6">
								<span className="text-12 text-575555 font-medium leading-[14.09px]">
									Supporting Document ( Affidavit or Marriage Certificate )
								</span>
								<Required />
							</div>
							<FileInput />
						</div>
						<div className="flex flex-col space-y-[7px] mt-[43px]">
							<div className="flex space-x-6">
								<span className="text-12 text-575555 font-medium leading-[14.09px]">
									Upload Passport Photograph
								</span>
							</div>
							<FileInput />
						</div>
						<div className="flex flex-col space-y-[5px] mt-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="concerned_parties"
								render={({ field: { value, onChange } }) => (
									<TextArea
										label="Concerned Parties"
										containerClassName="w-full"
										wrapperClassName="!h-12"
										hasRequiredIcon
										placeholder="Type in any concerned authority that is interested in this publication. E.g. General public, Bank name, School name, e.t.c."
										value={value}
										onChange={onChange}
										hasError={!!errors.concerned_parties}
									/>
								)}
							/>
						</div>
						<button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							className="mt-[155px] w-[182px] h-10 bg-7108F6 rounded-3 flex items-center text-center justify-center text-white font-semibold text-12"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default ChangeOfName;
