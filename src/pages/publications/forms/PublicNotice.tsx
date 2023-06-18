import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Gender, PublicNoticeFields } from 'interfaces/publications';
import { useNavigate } from 'react-router-dom';
import { publicationSlice } from 'store/publications';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { capitalize, isEmpty } from 'lodash';
import { PUBLICATION_TYPES, STORAGE_KEYS, routes } from 'utils/constants';
import { removeFromLS, storeToLS } from 'utils/functions';
import { ReactComponent as Required } from 'assets/icons/required.svg';
import {
	MobileFormsNavigation,
	PublicationCreationSteps,
} from 'components/publications';
import { Wrapper } from 'components/navigation';
import { validators } from 'utils/validation';
import {
	FileInput,
	Input,
	RadioOption,
	Select,
	TextArea,
} from 'components/inputs';
const { actions } = publicationSlice;

const defaultValues: PublicNoticeFields = {
	description: '',
	email: '',
	gender: 'male',
	firstName: '',
	middleName: '',
	lastName: '',
	phone: '',
	isExternal: true,
	externalSelect: { value: '', label: '' },
	externalPageInfo: '',
	file: '',
};

const PublicNotice = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const {
		publisherPrices,
		loadingPublisherPrices,
		newPublicNoticePublication,
	} = useSelector((state: RootState) => state.publications);
	const [hasMounted, setHasMounted] = useState(false);
	const [fileError, setFileError] = React.useState(false);
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		watch,
		control,
		reset,
		getValues,
		register,
	} = useForm<PublicNoticeFields>({
		defaultValues,
	});
	const thirdPartyNewsPapers = useMemo(() => {
		return publisherPrices.map((price) => ({
			label: `${capitalize(price.externalName)} #${price.price}`,
			value: price.externalName,
		}));
	}, [publisherPrices]);

	const onGenderChange = (value: Gender) => setValue('gender', value);
	const onThirdPartyOptionChange = (value: boolean) =>
		setValue('isExternal', value);

	const publishWithThirdParty = watch('isExternal');

	const setDocument = async (e: any) => {
		const selectedFile = e.target.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			const fileData = event?.target?.result;
			setValue('file', fileData);
		};
		reader.readAsDataURL(selectedFile);
	};

	const onSubmit = (data: PublicNoticeFields) => {
		dispatch(actions.addNewPublicNoticePublication(data));
		storeToLS(STORAGE_KEYS.NEW_PUBLIC_NOTICE_PUBLICATION, data);
		navigate(routes.pub_forms.public_notice_preview);
	};

	const sortOutNewPublication = async () => {
		const data = { ...newPublicNoticePublication };
		reset(data);
	};

	useEffect(() => {
		if (newPublicNoticePublication) {
			sortOutNewPublication();
		}
		setHasMounted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (publishWithThirdParty && isEmpty(publisherPrices)) {
			dispatch(
				actions.fetchPublisherPrices({
					publicationType: PUBLICATION_TYPES.PUBLIC_NOTICE,
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

	return (
		<Wrapper isPublications>
			<div className="flex flex-col space-y-[22px] mini:space-y-[33px] pb-[200px]">
				<MobileFormsNavigation />
				<PublicationCreationSteps
					activeStep="fill_forms"
					publicationType={PUBLICATION_TYPES.PUBLIC_NOTICE}
				/>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col space-y-[51px] mini:flex-row mini:space-y-0 mini:space-x-[51px]">
					<div className="flex-1 mini:max-w-[1000px]">
						{/* first_name and middle name */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
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
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Middlename"
										containerClassName="w-full"
										hasRequiredIcon
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
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
							<Controller
								rules={validators.isRequiredString}
								control={control}
								name="lastName"
								render={({ field: { value, onChange, ref } }) => (
									<Input
										label="Lastname"
										containerClassName="flex-1"
										hasRequiredIcon
										ref_={ref}
										placeholder="Paul"
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
										containerClassName="w-full"
										hasRequiredIcon
										placeholder="Provide a valid email address"
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
										ref_={ref}
										placeholder="Provide a valid phone Number"
										onChange={onChange}
										hasError={!!errors.phone}
										hasRequiredIcon
									/>
								)}
							/>
						</div>
						<div className="mb-[21px] mid:mb-[38px]">
							<Controller
								name="description"
								control={control}
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<TextArea
										label="Decription of  what you are notifying the public"
										hasRequiredIcon
										hasError={!!errors.description}
										value={value}
										onChange={onChange}
										ref_={ref}
									/>
								)}
							/>
						</div>
						{/* publish on 3rd party news paper */}
						<div className="flex flex-col space-y-[21px] mid:space-x-[21px] mid:space-y-0 mid:flex-row items-center mb-[21px] mid:mb-[38px]">
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
									Supporting Document ( Picture )
								</span>
							</div>
							<FileInput
								onLoadError={() => setFileError(true)}
								removeError={() => {
									if (fileError) {
										setFileError(false);
									}
								}}
								hasError={!!errors.file}
								onChange={(e: any) => setDocument(e)}
								ref_={fileRef}
								fileValue={getValues('file')}
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
									dispatch(actions.clearNewPublicNoticePublication());
									reset(defaultValues);
									removeFromLS(STORAGE_KEYS.NEW_PUBLIC_NOTICE_PUBLICATION);
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

export default PublicNotice;
