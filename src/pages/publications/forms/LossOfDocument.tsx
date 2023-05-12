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
import { ReactComponent as Required } from 'assets/icons/required.svg';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { AppDispatch, RootState } from 'store';
import {
	LossOfDocumentPublicationValues,
	Gender,
} from 'interfaces/publications';
import {
	emptyLossOfDocumentValues,
	nigerianStates,
	routes,
	STORAGE_KEYS,
} from 'utils/constants';
import { validators } from 'utils/validation';
import { addNewLodPublication } from 'store/publications';
import { storeToLS } from 'utils/functions';
import { useNavigate } from 'react-router-dom';

const LossOfDocument = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { new_lod_publication } = useSelector(
		(state: RootState) => state.publications
	);
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		control,
		reset,
		watch,
	} = useForm<LossOfDocumentPublicationValues>({
		defaultValues: emptyLossOfDocumentValues,
	});

	const thirdPartyNewsPapers = [
		{ label: 'Vanguard #4,500', value: 'Vanguard', price: '#4,500' },
		{ label: 'Punch #4,500', value: 'Punch', price: '#4,500' },
		{ label: 'Guardian #4,500', value: 'guardian', price: '#4,500' },
	];

	const onSubmit = (data: LossOfDocumentPublicationValues) => {
		dispatch(addNewLodPublication(data));
		storeToLS(STORAGE_KEYS.NEW_LOD_PUBLICATION, data);
		navigate(routes.pub_forms.loss_of_document_preview);
	};

	const onGenderChange = (value: Gender) => setValue('gender', value);
	const countries = [{ label: 'Nigeria', value: 'Nigeria' }];
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('publish_on_third_party', value);
	const publishWithThirdParty = watch('publish_on_third_party');

	useEffect(() => {
		if (new_lod_publication) {
			reset(new_lod_publication);
		}
	}, [reset, new_lod_publication]);

	return (
		<Wrapper isPublications>
			<MobileFormsNavigation />
			<PublicationCreationSteps isLossOfDocument activeStep="fill_forms" />
			<div className="mt-7 pb-[200px]">
				<form className="w-full flex flex-col mini:flex-row mini:space-x-[39px]">
					<div className="flex-1 mini:max-w-[1000px] flex flex-col space-y-5">
						{/* first name and middle name */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="first_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Firstname"
										autoFocus
										containerClassName="w-full"
										placeholder="Hannah"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.first_name}
									/>
								)}
							/>
							<Controller
								control={control}
								name="middle_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename"
										containerClassName="w-full"
										value={value}
										placeholder="Hannah"
										ref_={ref}
										onChange={onChange}
										hasError={!!errors.middle_name}
									/>
								)}
							/>
						</div>
						{/* last name and gender */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="last_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname"
										autoFocus
										containerClassName="w-full flex-1"
										placeholder="Zechariah"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.last_name}
									/>
								)}
							/>
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
													className="!min-w-[calc(50%_-_7.5px)]"
												/>
												<RadioOption
													value="female"
													selectedValue={value}
													onChange={onGenderChange}
													className="!min-w-[calc(50%_-_7.5px)]"
												/>
											</div>
										)}
									/>
								</div>
							</div>
						</div>
						{/* email and phone number */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
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
						{/* country and state */}
						<div className="flex items-center space-x-5">
							<Select
								label="Country"
								isDisabled
								hasRequiredIcon
								options={countries}
								value={countries[0]}
							/>
							<Select
								label="State"
								hasRequiredIcon
								options={nigerianStates.map((state) => ({
									value: state,
									label: state,
								}))}
							/>
						</div>
						{/* item lost and support id */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="item_lost"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Item lost"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
										placeholder="Phone, Land or house docs, car"
										value={value}
										onChange={onChange}
										hasError={!!errors.item_lost}
									/>
								)}
							/>
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="support_id_name"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Support ID name ( What type of ID is associated with the item or Document"
										hasRequiredIcon
										containerClassName="w-full"
										ref_={ref}
										value={value}
										placeholder="IMEI, C of O,  Engine number, Phone number"
										onChange={onChange}
										hasError={!!errors.support_id_name}
									/>
								)}
							/>
						</div>
						{/* date_lost and issuer of item */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="date_lost"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Date lost"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
										placeholder="18/08/23"
										value={value}
										onChange={onChange}
										hasError={!!errors.date_lost}
									/>
								)}
							/>
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="issuer_of_item"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Issuer of item"
										hasRequiredIcon
										containerClassName="w-full"
										ref_={ref}
										value={value}
										placeholder="Nigerian Embassy"
										onChange={onChange}
										hasError={!!errors.support_id_name}
									/>
								)}
							/>
						</div>
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="id_value"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="ID Value"
										containerClassName="w-full flex-1"
										hasRequiredIcon
										ref_={ref}
										placeholder="0804456****"
										value={value}
										onChange={onChange}
										hasError={!!errors.id_value}
									/>
								)}
							/>
							<div className="flex-1 w-full !mb-5 mini:!mb-0">
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
													className="!min-w-[calc(50%_-_7.5px)]"
												/>
												<RadioOption
													value={false}
													valuePlaceholder="no"
													selectedValue={value}
													onChange={onThirdPartyOptionChange}
													className="!min-w-[calc(50%_-_7.5px)]"
												/>
											</div>
										)}
									/>
								</div>
							</div>
						</div>
						{publishWithThirdParty && (
							<div className="mini:!mt-[29px] !mt-0 !mb-[21px] mini:mb-0">
								<Select
									label="Select Newspaper"
									hasRequiredIcon
									options={thirdPartyNewsPapers}
								/>
							</div>
						)}
					</div>
					<div className="space-y-[17px] flex flex-col mini:w-[444px]">
						<Controller
							control={control}
							// rules={validators.isRequiredString}
							name="physical_description"
							render={({ field: { value, onChange, ref } }) => (
								<TextArea
									label="Physical description (optional )"
									containerClassName="w-full"
									wrapperClassName="!h-12"
									ref_={ref}
									inputClassName="h-[130px]"
									placeholder="Provide brief description of the lost document or item"
									value={value}
									onChange={onChange}
									hasError={!!errors.physical_description}
								/>
							)}
						/>
						<Controller
							control={control}
							name="reward"
							render={({ field: { value, onChange, ref } }) => (
								<TextArea
									label="Reward ( Optional )"
									containerClassName="w-full"
									wrapperClassName="!h-12"
									ref_={ref}
									inputClassName="h-[130px]"
									placeholder="Details of what will be given or done for the person that finds the lost document or item"
									value={value || ''}
									onChange={onChange}
									hasError={!!errors.reward}
								/>
							)}
						/>
						<div className="flex flex-col space-y-[7px] mt-[43px]">
							<div className="flex space-x-6">
								<span className="text-12 text-575555 font-medium leading-[14.09px]">
									Upload Passport Photograph
								</span>
								<Required />
							</div>
							<FileInput />
						</div>
						<div className="flex flex-col space-y-[7px] mt-[43px]">
							<div className="flex space-x-6">
								<span className="text-12 text-575555 font-medium leading-[14.09px]">
									Supporting Document ( Police Report )
								</span>
								<Required />
							</div>
							<FileInput />
						</div>
						<button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							className="!mt-[39px] w-[182px] h-10 bg-7108F6 rounded-3 flex items-center text-center justify-center text-white font-semibold text-12">
							Submit
						</button>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default LossOfDocument;
