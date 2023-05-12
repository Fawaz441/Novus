import {
	FileInput,
	Input,
	RadioOption,
	Select,
	TextArea,
} from 'components/inputs';
import { Wrapper } from 'components/navigation';
import {
	MobileFormsNavigation,
	PublicationCreationSteps,
} from 'components/publications';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ReactComponent as Swap } from 'assets/icons/swap.svg';
import { ReactComponent as Required } from 'assets/icons/required.svg';
import { validators } from 'utils/validation';
import { ChangeOfNamePublicationValues, Gender } from 'interfaces/publications';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { addNewConPublication } from 'store/publications';
import { useNavigate } from 'react-router-dom';
import { emptyChangeOfNameValues, routes, STORAGE_KEYS } from 'utils/constants';
import { storeToLS } from 'utils/functions';
import { isEmpty } from 'lodash';

const ChangeOfName = () => {
	const dispatch: AppDispatch = useDispatch();
	const { new_con_publication } = useSelector(
		(state: RootState) => state.publications
	);
	const navigate = useNavigate();
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		watch,
		setError,
		control,
		reset,
	} = useForm<ChangeOfNamePublicationValues>({
		defaultValues: emptyChangeOfNameValues,
	});

	const onGenderChange = (value: Gender) => setValue('gender', value);
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('publish_on_third_party', value);

	const onSubmit = (data: ChangeOfNamePublicationValues) => {
		if (
			isEmpty(data.new_first_name) &&
			isEmpty(data.new_last_name) &&
			isEmpty(data.new_middle_name)
		) {
			setError(
				'new_first_name',
				{
					message: 'Please type in a new first name, last name or middle name',
				},
				{ shouldFocus: true }
			);
			return;
		}
		dispatch(addNewConPublication(data));
		storeToLS(STORAGE_KEYS.NEW_CON_PUBLICATION, data);
		navigate(routes.pub_forms.change_of_name_preview);
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

	useEffect(() => {
		if (new_con_publication) {
			reset(new_con_publication);
		}
	}, [reset, new_con_publication]);

	return (
		<Wrapper isPublications>
			<div className="flex flex-col spave-y-[22px] mini:space-y-[33px] pb-[200px]">
				<MobileFormsNavigation />
				<PublicationCreationSteps activeStep="fill_forms" />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col space-y-[51px] mini:flex-row mini:space-y-0 mini:space-x-[51px]">
					<div className="flex-1 mini:max-w-[1000px]">
						{/* first_name */}
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="old_first_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Firstname (Old)"
										autoFocus
										containerClassName="w-full"
										placeholder="Hannah"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.old_first_name}
									/>
								)}
							/>
							<div className="hidden flex-shrink-0 !mt-[21.09px] mx-2 mid:mx-[7px] h-12 mid:flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="new_first_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Firstname (New)"
										containerClassName="w-full"
										value={value}
										placeholder="Hannah"
										ref_={ref}
										onChange={onChange}
										hasError={!!errors.new_first_name}
									/>
								)}
							/>
						</div>
						{/* middle_name */}
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								rules={validators.isRequiredString}
								control={control}
								name="old_middle_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename (Old)"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
										placeholder="Paul"
										value={value}
										onChange={onChange}
										hasError={!!errors.old_middle_name}
									/>
								)}
							/>
							<div className="hidden flex-shrink-0 !mt-[21.09px] mx-[7px] h-12 mid:flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="new_middle_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename (New)"
										containerClassName="w-full"
										value={value}
										placeholder="Paul"
										ref_={ref}
										onChange={onChange}
										hasError={!!errors.new_middle_name}
									/>
								)}
							/>
						</div>
						{/* last_name */}
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="old_last_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname (Old)"
										containerClassName="w-full"
										hasRequiredIcon
										placeholder="Zechariah"
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.old_last_name}
									/>
								)}
							/>
							<div className="hidden flex-shrink-0 !mt-[21.09px] mx-[7px] h-12 mid:flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="new_last_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname (New)"
										containerClassName="w-full"
										value={value}
										ref_={ref}
										placeholder="Daniel"
										onChange={onChange}
										hasError={!!errors.new_last_name}
									/>
								)}
							/>
						</div>
						{/* reason for change */}
						<div className="flex flex-col mid:space-x-[34px] space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
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
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:space-x-[34px] mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="email"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Email"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
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
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Phone Number"
										hasRequiredIcon
										containerClassName="w-full"
										ref_={ref}
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
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="House Address"
									containerClassName="w-full"
									hasRequiredIcon
									placeholder="Enter the correct details of your house address"
									value={value}
									onChange={onChange}
									ref_={ref}
									hasError={!!errors.house_address}
								/>
							)}
						/>
						<div className="flex mt-[21px] mid:mt-[38px] flex-col space-y-[21px] mid:space-y-0 mid:space-x-[34px] mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<div className="flex-1 w-full">
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
							<div className="flex-1 w-full">
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
								render={({ field: { value, onChange, ref } }) => (
									<TextArea
										label="Concerned Parties"
										containerClassName="w-full"
										wrapperClassName="!h-12"
										ref_={ref}
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
							className="mt-[42px] mini:mt-[155px] w-[182px] h-10 bg-7108F6 rounded-3 flex items-center text-center justify-center text-white font-semibold text-12">
							Submit
						</button>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default ChangeOfName;
