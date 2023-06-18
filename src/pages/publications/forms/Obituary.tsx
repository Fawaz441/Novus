import { Wrapper } from 'components/navigation';
import {
	MobileFormsNavigation,
	PublicationCreationSteps,
} from 'components/publications';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ObituaryFields, Gender } from 'interfaces/publications';
import { PUBLICATION_TYPES, STORAGE_KEYS, routes } from 'utils/constants';
import { validators } from 'utils/validation';
import {
	Calendar,
	FileInput,
	Input,
	RadioOption,
	Select,
	TextArea,
} from 'components/inputs';
import { ReactComponent as Required } from 'assets/icons/required.svg';
import moment from 'moment';
import { capitalize, isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { publicationSlice } from 'store/publications';
import { removeFromLS, storeToLS } from 'utils/functions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const { actions } = publicationSlice;

const defaultValues: ObituaryFields = {
	firstName: '',
	middleName: '',
	lastName: '',
	gender: 'male',
	email: '',
	phone: '',
	fullNameOfDeceased: '',
	dateOfDeath: new Date()?.toISOString(),
	genderOfDeceased: 'male',
	causeOfDeath: '',
	descriptionOfDeath: '',
	funeralArrangement: '',
	isExternal: false,
	externalSelect: { value: '', label: '' },
	file: '',
	image: '',
	externalPageInfo: '',
};

const Obituary = () => {
	const [showCalendar, setShowCalendar] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);
	const [fileError, setFileError] = React.useState(false);
	const [imageError, setimageError] = React.useState(false);
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
	} = useForm<ObituaryFields>({
		defaultValues,
	});

	const onGenderChange = (value: Gender) => setValue('gender', value);
	const onDeceasedGenderChange = (value: Gender) =>
		setValue('genderOfDeceased', value);
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('isExternal', value);
	const dateOfDeath = watch('dateOfDeath');
	const publishWithThirdParty = watch('isExternal');

	const onSubmit = (data: ObituaryFields) => {
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
		if (publishWithThirdParty && !data?.externalSelect?.value) {
			toast.error('Please select an external newspaper');
			setError(
				'externalSelect',
				{ message: 'Please select an external newspaper' },
				{ shouldFocus: true }
			);
			return;
		}
		dispatch(actions.addNewObituaryPublication(data));
		storeToLS(STORAGE_KEYS.NEW_OBITUARY_PUBLICATION, data);
		navigate(routes.pub_forms.obituary_preview);
	};

	const dispatch: AppDispatch = useDispatch();
	const { newObituaryPublication, publisherPrices, loadingPublisherPrices } =
		useSelector((state: RootState) => state.publications);

	const thirdPartyNewsPapers = useMemo(() => {
		return publisherPrices.map((price) => ({
			label: `${capitalize(price.externalName)} #${price.price}`,
			value: price.externalName,
		}));
	}, [publisherPrices]);

	const sortOutNewPublication = async () => {
		const data = { ...newObituaryPublication };
		reset(data);
	};

	useEffect(() => {
		if (newObituaryPublication) {
			sortOutNewPublication();
		}
		setHasMounted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (publishWithThirdParty && isEmpty(publisherPrices)) {
			dispatch(
				actions.fetchPublisherPrices({
					publicationType: PUBLICATION_TYPES.OBITUARY,
				})
			);
		}
		if (
			!publishWithThirdParty &&
			hasMounted &&
			getValues('externalSelect')?.value
		) {
			setValue('externalSelect', { label: '', value: '' });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publishWithThirdParty]);

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
			<Calendar
				visible={showCalendar}
				onChange={(value) => setValue('dateOfDeath', value?.toISOString())}
				value={dateOfDeath ? new Date(dateOfDeath) : new Date()}
				onClose={() => setShowCalendar(false)}
				maxDate={new Date()}
			/>
			<div className="flex flex-col space-y-10">
				<MobileFormsNavigation />
				<PublicationCreationSteps
					publicationType={PUBLICATION_TYPES.OBITUARY}
					activeStep="fill_forms"
				/>
				<form
					className="flex flex-col space-y-[22px] mini:space-x-[39px] mini:flex-row mini:space-y-0 pb-[200px]"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="flex-1 mini:max-w-[1000px]">
						{/* first name and middle name */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="firstName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Firstname "
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
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename "
										containerClassName="w-full"
										value={value}
										placeholder="Paul"
										ref_={ref}
										onChange={onChange}
										hasRequiredIcon
										hasError={!!errors.middleName}
									/>
								)}
							/>
						</div>
						{/* last name and gender */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="lastName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname"
										autoFocus
										containerClassName="flex-1"
										placeholder="Zechariah"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.lastName}
									/>
								)}
							/>
							<div className="flex-1 w-full flex-shrink-0">
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
													className="w-full"
												/>
												<RadioOption
													value="female"
													selectedValue={value}
													onChange={onGenderChange}
													className="w-full"
												/>
											</div>
										)}
									/>
								</div>
							</div>
						</div>
						{/* email and phone number */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredEmail}
								name="email"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Email"
										autoFocus
										containerClassName="w-full"
										placeholder="Provide a valid email address"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.email}
									/>
								)}
							/>
							<Controller
								control={control}
								name="phone"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Phone Number"
										containerClassName="w-full"
										value={value}
										placeholder="Provide a valid phone Number"
										ref_={ref}
										onChange={onChange}
										hasRequiredIcon
										hasError={!!errors.phone}
									/>
								)}
							/>
						</div>
						{/* name of deceased and date of death */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="fullNameOfDeceased"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Fullname Of Deceased"
										autoFocus
										containerClassName="w-full"
										placeholder="John Doe"
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.fullNameOfDeceased}
									/>
								)}
							/>
							<Controller
								control={control}
								name="dateOfDeath"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										onClick={() => setShowCalendar(true)}
										label="Date Of Death"
										containerClassName="w-full"
										value={moment(value).format('DD/MM/YY')}
										placeholder="01/01/1991"
										ref_={ref}
										onChange={onChange}
										hasRequiredIcon
										hasError={!!errors.dateOfDeath}
									/>
								)}
							/>
						</div>
						{/* gender of deceased and cause of death */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<div className="flex-1 w-full flex-shrink-0">
								<div className="flex flex-col space-y-[6px]">
									<div className="flex">
										<span className="text-12 text-575555 font-medium leading-[14.09px] mr-[3px]">
											Gender Of Deceased
										</span>
										<Required />
									</div>
									<Controller
										control={control}
										name="genderOfDeceased"
										render={({ field: { value } }) => (
											<div className="flex-1 space-x-[15px] flex">
												<RadioOption
													value="male"
													selectedValue={value}
													onChange={onDeceasedGenderChange}
													className="w-full"
												/>
												<RadioOption
													value="female"
													selectedValue={value}
													onChange={onDeceasedGenderChange}
													className="w-full"
												/>
											</div>
										)}
									/>
								</div>
							</div>
							<Controller
								control={control}
								rules={validators.isRequiredString}
								name="causeOfDeath"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Cause Of Death"
										autoFocus
										containerClassName="flex-1"
										placeholder=""
										hasRequiredIcon
										ref_={ref}
										value={value}
										onChange={onChange}
										hasError={!!errors.causeOfDeath}
									/>
								)}
							/>
						</div>
						{/* publish on 3rd party news paper */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center">
							<div className="flex-1 w-full flex-shrink-0">
								<div className="flex flex-col space-y-[6px]">
									<div className="flex">
										<span className="text-12 text-575555 font-medium leading-[14.09px] mr-[3px]">
											Do you want to publish on a 3rd party news paper
										</span>
									</div>
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
													className="w-full"
												/>
												<RadioOption
													value={false}
													valuePlaceholder="no"
													selectedValue={value}
													onChange={onThirdPartyOptionChange}
													className="w-full"
												/>
											</div>
										)}
									/>
								</div>
							</div>
							<Controller
								control={control}
								name="externalPageInfo"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Publication Size"
										autoFocus
										containerClassName="flex-1"
										placeholder="10 by 3"
										ref_={ref}
										value={value || ''}
										onChange={onChange}
										hasError={!!errors.externalPageInfo}
									/>
								)}
							/>
						</div>
						{/* select newspaper */}
						{publishWithThirdParty && (
							<div className="my-[21px] mid:my-[38px]">
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
					<div className="mini:w-[444px] mini:flex-shrink-none">
						<div className="flex flex-col space-y-[11px]">
							<Controller
								control={control}
								name="descriptionOfDeath"
								render={({ field: { value, onChange, ref } }) => (
									<TextArea
										label="Brief description of the deceased"
										value={value}
										ref_={ref}
										onChange={onChange}
										inputClassName="!h-[130px]"
									/>
								)}
							/>
							<Controller
								control={control}
								name="funeralArrangement"
								render={({ field: { value, onChange, ref } }) => (
									<TextArea
										label="Funeral Arrangements"
										value={value}
										ref_={ref}
										onChange={onChange}
										inputClassName="!h-[130px]"
									/>
								)}
							/>
							<div className="flex flex-col space-y-[7px]">
								<div className="flex space-x-6">
									<span className="text-12 text-575555 font-medium leading-[14.09px]">
										Supporting Document ( Death Certificate )
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
										Picture of the deceased
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
						</div>
						<div className="flex space-x-2 items-center mt-[46px]">
							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								className="w-[182px] h-10 bg-7108F6 rounded-3 flex items-center text-center justify-center text-white font-semibold text-12">
								Submit
							</button>
							<button
								type="button"
								onClick={() => {
									dispatch(actions.clearNewObituaryPublication());
									reset(defaultValues);
									removeFromLS(STORAGE_KEYS.NEW_OBITUARY_PUBLICATION);
								}}
								className="w-[182px] h-10 bg-white border border-7108F6 rounded-3 flex items-center text-center justify-center text-7108F6 font-semibold text-12">
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>
		</Wrapper>
	);
};

export default Obituary;
