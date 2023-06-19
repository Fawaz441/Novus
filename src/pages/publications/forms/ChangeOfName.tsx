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
import React, { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ReactComponent as Swap } from 'assets/icons/swap.svg';
import { ReactComponent as Required } from 'assets/icons/required.svg';
import { validators } from 'utils/validation';
import { ChangeOfNamePublicationFields, Gender } from 'interfaces/publications';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { publicationSlice } from 'store/publications';
import { useNavigate } from 'react-router-dom';
import {
	emptyChangeOfNameValues,
	PUBLICATION_TYPES,
	routes,
	STORAGE_KEYS,
} from 'utils/constants';
import { removeFromLS, storeToLS } from 'utils/functions';
import { capitalize, isEmpty, trim } from 'lodash';
import toast from 'react-hot-toast';
import { clearNewConPublication } from 'store/publications';

const { actions } = publicationSlice;

const ChangeOfName = () => {
	const dispatch: AppDispatch = useDispatch();
	const [fileError, setFileError] = React.useState(false);
	const [imageError, setimageError] = React.useState(false);
	const [hasMounted, setHasMounted] = React.useState(false);
	const { newCONPublication, publisherPrices, loadingPublisherPrices } =
		useSelector((state: RootState) => state.publications);
	const navigate = useNavigate();
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		watch,
		setError,
		control,
		reset,
		getValues,
		register,
	} = useForm<ChangeOfNamePublicationFields>({
		defaultValues: emptyChangeOfNameValues,
	});
	const publishWithThirdParty = watch('isExternal');

	const onGenderChange = (value: Gender) => setValue('gender', value);
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('isExternal', value);

	const isValid = (data: ChangeOfNamePublicationFields) => {
		const isSameFirstName = trim(data.oldFirstName) === trim(data.newFirstName);
		const isSameMiddleName =
			trim(data.oldMiddleName) === trim(data.newMiddleName);
		const isSameLastName = trim(data.oldLastName) === trim(data.newLastName);

		if (isSameFirstName && isSameMiddleName && isSameLastName) {
			return false;
		}
		return true;
	};

	const onSubmit = (data: ChangeOfNamePublicationFields) => {
		if (!data.file) {
			setError('file', { message: 'Please select a document' });
			return;
		}
		if (!data.image) {
			setError('image', { message: 'Please select an image' });
			return;
		}

		if (imageError) {
			toast.error('Please re-upload your image');
			setValue('image', '');
			return;
		}
		if (fileError) {
			toast.error('Please re-upload your supporting document');
			setValue('file', '');
			return;
		}
		if (
			isEmpty(data.newFirstName) &&
			isEmpty(data.newLastName) &&
			isEmpty(data.newMiddleName)
		) {
			setError(
				'newFirstName',
				{
					message: 'Please type in a new first name, last name or middle name',
				},
				{ shouldFocus: true }
			);
			return;
		}
		if (!isValid(data)) {
			toast.error("Please enter in valid data. Your names can't be the same");
			return;
		}
		if (publishWithThirdParty && !data?.externalSelect?.value) {
			toast.error('Please select an external newspaper');
			setError(
				'externalSelect',
				{ message: 'Please select an external newspaper' },
				{ shouldFocus: true }
			);
			return;
		}
		dispatch(actions.addNewConPublication(data));
		storeToLS(STORAGE_KEYS.NEW_CON_PUBLICATION, data);
		navigate(routes.pub_forms.change_of_name_preview);
	};

	const nameChangeOptions = [
		{ label: 'Personal Reasons', value: 'Personal Reasons' },
		{ label: 'Marriage', value: 'Marriage' },
	];

	const publicationTypes = [
		{ label: 'Change of name', value: 'Change of name' },
	];

	const sortOutNewPublication = async () => {
		const data = { ...newCONPublication };
		reset(data);
	};

	useEffect(() => {
		if (newCONPublication) {
			sortOutNewPublication();
		}
		setHasMounted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (publishWithThirdParty && isEmpty(publisherPrices)) {
			dispatch(
				actions.fetchPublisherPrices({
					publicationType: PUBLICATION_TYPES.CHANGE_OF_NAME,
				})
			);
		}
		if (
			!publishWithThirdParty &&
			hasMounted &&
			getValues('externalSelect')?.value
		) {
			setValue('externalSelect', emptyChangeOfNameValues.externalSelect);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publishWithThirdParty]);

	const thirdPartyNewsPapers = useMemo(() => {
		return publisherPrices.map((price) => ({
			label: `${capitalize(price.externalName)} #${price.price}`,
			value: price.externalName,
		}));
	}, [publisherPrices]);

	const { ref: fileRef } = register('file');
	const { ref: imageRef } = register('image');

	const setDocument = async (fileType: 'file' | 'image', e: any) => {
		const selectedFile = e.target.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			const fileData = event?.target?.result;
			setValue(fileType, fileData);
		};
		reader.readAsDataURL(selectedFile);
	};

	return (
		<Wrapper isPublications>
			<MobileFormsNavigation />
			<PublicationCreationSteps
				activeStep="fill_forms"
				publicationType={PUBLICATION_TYPES.CHANGE_OF_NAME}
			/>
			<div className="mt-7 pb-[200px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col space-y-5 mini:flex-row mini:space-y-0 mini:space-x-[51px]">
					<div className="flex-1 mini:max-w-[1000px]">
						{/* first_name */}
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="oldFirstName"
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
										hasError={!!errors.oldFirstName}
									/>
								)}
							/>
							<div className="hidden flex-shrink-0 !mt-[21.09px] mx-2 mid:mx-[7px] h-12 mid:flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								rules={validators.isRequiredString}
								control={control}
								name="newFirstName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Firstname (New)"
										containerClassName="w-full"
										value={value}
										hasRequiredIcon
										placeholder="Hannah"
										ref_={ref}
										onChange={onChange}
										hasError={!!errors.newFirstName}
									/>
								)}
							/>
						</div>
						{/* middle_name */}
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								rules={validators.isRequiredString}
								control={control}
								name="oldMiddleName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename (Old)"
										containerClassName="w-full"
										hasRequiredIcon
										ref_={ref}
										placeholder="Paul"
										value={value}
										onChange={onChange}
										hasError={!!errors.oldMiddleName}
									/>
								)}
							/>
							<div className="hidden flex-shrink-0 !mt-[21.09px] mx-[7px] h-12 mid:flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								control={control}
								name="newMiddleName"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename (New)"
										containerClassName="w-full"
										value={value}
										hasRequiredIcon
										placeholder="Paul"
										ref_={ref}
										onChange={onChange}
										hasError={!!errors.newMiddleName}
									/>
								)}
							/>
						</div>
						{/* last_name */}
						<div className="flex flex-col space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="oldLastName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname (Old)"
										containerClassName="w-full"
										hasRequiredIcon
										placeholder="Zechariah"
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.oldLastName}
									/>
								)}
							/>
							<div className="hidden flex-shrink-0 !mt-[21.09px] mx-[7px] h-12 mid:flex items-center justify-center">
								<Swap />
							</div>
							<Controller
								rules={validators.isRequiredString}
								control={control}
								name="newLastName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname (New)"
										containerClassName="w-full"
										value={value}
										ref_={ref}
										placeholder="Daniel"
										hasRequiredIcon
										onChange={onChange}
										hasError={!!errors.newLastName}
									/>
								)}
							/>
						</div>
						{/* reason for change */}
						<div className="flex flex-col mid:space-x-[34px] space-y-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								name="reasonSelect"
								rules={{ validate: (v) => !isEmpty(v.value) }}
								render={({ field }) => (
									<Select
										label="Reason for Name Change"
										hasRequiredIcon
										hasError={!!errors.reasonSelect}
										options={nameChangeOptions}
										{...field}
										ref={null}
									/>
								)}
							/>
							<Select
								label="Select Publication Type"
								hasRequiredIcon
								options={publicationTypes}
								value={publicationTypes[0]}
								isDisabled
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
													className='w-full'
													selectedValue={value}
													onChange={onGenderChange}
												/>
												<RadioOption
													value="female"
													className='w-full'
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
										name="isExternal"
										render={({ field: { value } }) => (
											<div className="flex-1 space-x-[15px] flex">
												<RadioOption
													value={true}
													valuePlaceholder="yes"
													className='w-full'
													selectedValue={value}
													onChange={onThirdPartyOptionChange}
												/>
												<RadioOption
													value={false}
													valuePlaceholder="no"
													className='w-full'
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
								<Controller
									control={control}
									name="externalSelect"
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
					<div>
						<div className="flex flex-col space-y-[7px]">
							<div className="flex space-x-6">
								<span className="text-12 text-575555 font-medium leading-[14.09px]">
									Supporting Document ( Affidavit or Marriage Certificate )
								</span>
								<Required />
							</div>
							<FileInput
								onLoadError={() => setFileError(true)}
								removeError={() => {
									if (fileError) {
										setFileError(false);
									}
								}}
								hasError={!!errors.file}
								onChange={(e: any) => setDocument('file', e)}
								ref_={fileRef}
								fileValue={getValues('file')}
							/>
						</div>
						<div className="flex flex-col space-y-[7px] mt-[43px]">
							<div className="flex space-x-6">
								<span className="text-12 text-575555 font-medium leading-[14.09px]">
									Upload Passport Photograph
								</span>
							</div>
							<FileInput
								onLoadError={() => setimageError(true)}
								removeError={() => {
									if (imageError) {
										setimageError(false);
									}
								}}
								hasError={!!errors.image}
								onChange={(e: any) => setDocument('image', e)}
								ref_={imageRef}
								fileValue={getValues('image')}
								accepts="image/jpeg,image/png"
							/>
						</div>
						<div className="flex flex-col space-y-[5px] mt-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="concernParties"
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
										hasError={!!errors.concernParties}
									/>
								)}
							/>
						</div>
						<div className="flex space-x-2 items-center">
							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								className="mt-[42px] mini:mt-[155px] w-[182px] h-10 bg-7108F6 rounded-3 flex items-center text-center justify-center text-white font-semibold text-12">
								Submit
							</button>
							<button
								type="button"
								onClick={() => {
									dispatch(clearNewConPublication());
									reset(emptyChangeOfNameValues);
									removeFromLS(STORAGE_KEYS.NEW_CON_PUBLICATION);
								}}
								className="mt-[42px] mini:mt-[155px] w-[182px] h-10 bg-white border border-7108F6 rounded-3 flex items-center text-center justify-center text-7108F6 font-semibold text-12">
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default ChangeOfName;
