/* eslint-disable react-hooks/exhaustive-deps */
import { EpitomeBox, ErrorToast, Loader } from 'components/general';
import { Input, Select } from 'components/inputs';
import { useForm, Controller } from 'react-hook-form';
import { PUBLICATION_TYPES } from 'utils/constants';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import adminAPI, { Fee } from 'api/admin';
import { toast } from 'react-hot-toast';

interface ManageEpitomeNewsPaperFormValues {
	publicationType: { label: string; value: PUBLICATION_TYPES };
	fee: string;
}

const publicationTypeList = [
	{ label: 'Change Of Name', value: PUBLICATION_TYPES.CHANGE_OF_NAME },
	{ label: 'Loss Of Document', value: PUBLICATION_TYPES.LOSS_OF_DOCUMENT },
	{ label: 'Public Notice', value: PUBLICATION_TYPES.PUBLIC_NOTICE },
	{ label: 'Obituary', value: PUBLICATION_TYPES.OBITUARY },
];

const defaultValues = {
	publicationType: publicationTypeList[0],
	fee: '',
};

const keyMappings: any = {
	[PUBLICATION_TYPES.PUBLIC_NOTICE]: 'platform-public-notice',
	[PUBLICATION_TYPES.AFFIDAVIT]: 'platform-affidavit',
	[PUBLICATION_TYPES.OBITUARY]: 'platform-obituary',
	[PUBLICATION_TYPES.LOSS_OF_DOCUMENT]: 'platform-loss-of-document',
	[PUBLICATION_TYPES.CHANGE_OF_NAME]: 'platform-change-of-name',
};

const ManageEpitomeNewsPaperForm = () => {
	const [loading, setLoading] = useState(false);
	const [fees, setFees] = useState<any>({});
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm<ManageEpitomeNewsPaperFormValues>({ defaultValues });

	const publicationType = watch('publicationType');

	const sortOutData = (data: Fee[]) => {
		const valuesToLookFor = Object.values(keyMappings);
		let feesOfConcern: any = {};
		data
			.filter((item) => valuesToLookFor.includes(item.key))
			.forEach((fee) => {
				const currKey = Object.keys(keyMappings).find(
					(key) => keyMappings[key] === fee.key
				);
				if (currKey) {
					feesOfConcern[currKey] = fee;
				}
			});
		setFees(feesOfConcern);
	};

	useEffect(() => {
		if (fees?.[publicationType?.value]) {
			const selectedFee = fees[publicationType.value];
			setValue('fee', selectedFee?.value);
		}
	}, [fees, publicationType]);

	const getFees = async () => {
		setLoading(true);
		try {
			const { data } = await adminAPI.getFees();
			sortOutData(data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			toast.custom((t) => (
				<ErrorToast
					message="There was an error fetching epitome publication prices"
					retry={() => getFees()}
					t={t}
				/>
			));
		}
	};

	const onSubmit = async (data: ManageEpitomeNewsPaperFormValues) => {
		setLoading(true);
		try {
			await adminAPI.editFee({
				key: keyMappings[data.publicationType.value] || '',
				value: data.fee,
			});
			toast.success('Fee edited successfully');
			reset(defaultValues);
			// setLoading(false);
			getFees()
		} catch (e) {
			toast.custom((t) => (
				<ErrorToast
					message="There was an error"
					retry={() => onSubmit(data)}
					t={t}
				/>
			));
			setLoading(false);
		}
	};

	useEffect(() => {
		getFees();
	}, []);

	// const epitomeNewsPrice = React.useMemo(() => {
	// 	return Number(
	// 		publisherPrices.find((price) => !!price.isPlatform)?.price || 0
	// 	);
	// }, [publisherPrices]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
			<EpitomeBox />
			<Loader loading={loading} />
			<div className="flex flex-col space-y-5">
				<Controller
					control={control}
					name="publicationType"
					rules={{ validate: (v) => !isEmpty(v.value) }}
					render={({ field }) => (
						<Select
							label="Publication Type"
							hasError={!!errors.publicationType}
							options={publicationTypeList}
							{...field}
							ref={null}
							defaultValue={publicationTypeList[0]}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{ validate: (v) => Number(v) > 0 }}
					name="fee"
					render={({ field: { value, onChange, ref } }) => (
						<Input
							label="Publication Fee"
							containerClassName="w-full"
							placeholder="Enter publication fee for the newspaper "
							ref_={ref}
							value={value}
							hasFilterIcon={false}
							onChange={onChange}
							hasError={!!errors.fee}
						/>
					)}
				/>
			</div>
			<div className="mt-[70px]">
				<button
					disabled={loading}
					type="submit"
					className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px] disabled:cursor-not-allowed">
					Edit Fee
				</button>
			</div>
		</form>
	);
};

export default ManageEpitomeNewsPaperForm;
