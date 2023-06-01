import {
	Calendar,
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
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { AppDispatch, RootState } from 'store';
import {
	Gender,
	LossOfDocumentPublicationFields,
} from 'interfaces/publications';
import {
	countries,
	emptyLossOfDocumentValues,
	nigerianStates,
	PUBLICATION_TYPES,
	routes,
	STORAGE_KEYS,
} from 'utils/constants';
import { validators } from 'utils/validation';
import {
	addNewLodPublication,
	clearNewLodPublication,
	publicationSlice,
} from 'store/publications';
import { removeFromLS, storeToLS } from 'utils/functions';
import { useNavigate } from 'react-router-dom';
import { capitalize, isEmpty } from 'lodash';
import toast from 'react-hot-toast';
import moment from 'moment';

const { actions } = publicationSlice;

const LossOfDocument = () => {
	const [showCalendar, setShowCalendar] = useState(false);
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [hasMounted, setHasMounted] = useState(false)
	const { newLODPublication, publisherPrices, loadingPublisherPrices } =
		useSelector((state: RootState) => state.publications);
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		control,
		reset,
		watch,
		setError,
		getValues,
	} = useForm<LossOfDocumentPublicationFields>({
		defaultValues: emptyLossOfDocumentValues,
	});

	const thirdPartyNewsPapers = useMemo(() => {
		return publisherPrices.map((price) => ({
			label: `${capitalize(price.externalName)} #${price.price}`,
			value: price.externalName,
		}));
	}, [publisherPrices]);

	const publishWithThirdParty = watch('isExternal');

	const onSubmit = (data: LossOfDocumentPublicationFields) => {
		if (publishWithThirdParty && !data?.externalSelect?.value) {
			toast.error('Please select an external newspaper');
			setError(
				'externalSelect',
				{ message: 'Please select an external newspaper' },
				{ shouldFocus: true }
			);
			return;
		}
		dispatch(addNewLodPublication(data));
		storeToLS(STORAGE_KEYS.NEW_LOD_PUBLICATION, data);
		navigate(routes.pub_forms.loss_of_document_preview);
	};

	const onGenderChange = (value: Gender) => setValue('gender', value);
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('isExternal', value);

	useEffect(() => {
		if (newLODPublication) {
			reset(newLODPublication);
		}
		setHasMounted(true)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (publishWithThirdParty && isEmpty(publisherPrices)) {
			dispatch(
				actions.fetchPublisherPrices({
					publicationType: PUBLICATION_TYPES.LOSS_OF_DOCUMENT,
				})
			);
		}
		if (!publishWithThirdParty && hasMounted && getValues('externalSelect')?.value) {
			setValue('externalSelect', emptyLossOfDocumentValues.externalSelect);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publishWithThirdParty]);

	const dateLost = watch('dateLost');


	return (
		<Wrapper isPublications>
			<MobileFormsNavigation />
			<Calendar
				visible={showCalendar}
				onChange={(value) => setValue('dateLost', value?.toISOString())}
				value={dateLost ? new Date(dateLost) : new Date()}
				onClose={() => setShowCalendar(false)}
				maxDate={new Date()}
			/>
			<PublicationCreationSteps isLossOfDocument activeStep="fill_forms" />
			<div className="mt-7 pb-[200px]">
				<form className="w-full flex flex-col mini:flex-row mini:space-x-[39px]">
					<div className="flex-1 mini:max-w-[1000px] flex flex-col space-y-5">
						{/* first name and middle name */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="firstName"
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
										hasError={!!errors.firstName}
									/>
								)}
							/>
							<Controller
								control={control}
								name="middleName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename"
										containerClassName="w-full"
										value={value}
										placeholder="Hannah"
										ref_={ref}
										onChange={onChange}
										hasError={!!errors.middleName}
									/>
								)}
							/>
						</div>
						{/* last name and gender */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="lastName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname"
										containerClassName="w-full flex-1"
										placeholder="Zechariah"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.lastName}
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
								name="phone"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Phone Number"
										hasRequiredIcon
										containerClassName="w-full"
										ref_={ref}
										value={value}
										placeholder="Provide a valid phone Number"
										onChange={onChange}
										hasError={!!errors.phone}
									/>
								)}
							/>
						</div>
						{/* house address */}
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="houseAddress"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="House Address"
									containerClassName="w-full"
									hasRequiredIcon
									placeholder="Enter the correct details of your house address"
									value={value}
									onChange={onChange}
									ref_={ref}
									hasError={!!errors.houseAddress}
								/>
							)}
						/>
						{/* country and state */}
						<div className="flex items-center space-x-5">
							<Controller
								control={control}
								name="countrySelect"
								render={({ field }) => (
									<Select
										label="Country"
										isDisabled
										hasRequiredIcon
										options={countries}
										{...field}
									/>
								)}
							/>

							<Controller
								control={control}
								name="stateSelect"
								rules={{ validate: (v) => !isEmpty(v?.value) }}
								render={({ field }) => (
									<Select
										label="State"
										hasError={!!errors.stateSelect}
										hasRequiredIcon
										options={nigerianStates.map((state) => ({
											value: state,
											label: state,
										}))}
										{...field}
									/>
								)}
							/>
						</div>
						{/* item lost and support id */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="itemLost"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Item lost"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
										placeholder="Phone, Land or house docs, car"
										value={value}
										onChange={onChange}
										hasError={!!errors.itemLost}
									/>
								)}
							/>
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="supportIdName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Support ID name ( What type of ID is associated with the item or Document"
										hasRequiredIcon
										containerClassName="w-full"
										ref_={ref}
										value={value}
										placeholder="IMEI, C of O,  Engine number, Phone number"
										onChange={onChange}
										hasError={!!errors.supportIdName}
									/>
								)}
							/>
						</div>
						{/* dateLost and issuer of item */}
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="dateLost"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										onClick={() => setShowCalendar(true)}
										label="Date lost"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
										placeholder="18/08/23"
										value={moment(value).format('DD/MM/YY')}
										onChange={onChange}
										hasError={!!errors.dateLost}
									/>
								)}
							/>
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="issuer"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Issuer of item"
										hasRequiredIcon
										containerClassName="w-full"
										ref_={ref}
										value={value}
										placeholder="Nigerian Embassy"
										onChange={onChange}
										hasError={!!errors.issuer}
									/>
								)}
							/>
						</div>
						<div className="flex items-center flex-col space-y-5 mid:flex-row mid:space-y-0 mid:space-x-5">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="idNumber"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="ID Value"
										containerClassName="w-full flex-1"
										hasRequiredIcon
										ref_={ref}
										placeholder="0804456****"
										value={value}
										onChange={onChange}
										hasError={!!errors.idNumber}
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
										name="isExternal"
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
								<Controller
									control={control}
									name="externalSelect"
									// rules={{ validate: (v) => !isEmpty(v?.value) }}
									render={({ field }) => (
										<Select
											label="Select Newspaper"
											hasRequiredIcon
											options={thirdPartyNewsPapers}
											isLoading={loadingPublisherPrices}
											{...field}
										/>
									)}
								/>
							</div>
						)}
					</div>
					<div className="space-y-[17px] flex flex-col mini:w-[444px]">
						<Controller
							control={control}
							// rules={validators.isRequiredString}
							name="physicalDesc"
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
									hasError={!!errors.physicalDesc}
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
						<div className="flex space-x-2 items-center">
							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								className="!mt-[39px] w-[182px] h-10 bg-7108F6 rounded-3 flex items-center text-center justify-center text-white font-semibold text-12">
								Submit
							</button>
							<button
								type="button"
								onClick={() => {
									dispatch(clearNewLodPublication());
									reset(emptyLossOfDocumentValues);
									removeFromLS(STORAGE_KEYS.NEW_LOD_PUBLICATION);
								}}
								className="mt-[39px] w-[182px] h-10 bg-white border border-7108F6 rounded-3 flex items-center text-center justify-center text-7108F6 font-semibold text-12">
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default LossOfDocument;
