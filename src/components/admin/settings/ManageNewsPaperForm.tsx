/* eslint-disable react-hooks/exhaustive-deps */
import { EpitomeBox, Loader } from 'components/general';
import { Input, Select } from 'components/inputs';
import { capitalize, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PUBLICATION_TYPES } from 'utils/constants';
import { publicationSlice } from 'store/publications';
import { RootState } from 'store';
import { toast } from 'react-hot-toast';
import adminAPI from 'api/admin';
const { actions } = publicationSlice;

interface ManageNewsPaperFormValues {
	newspaper: { label: string; value: string };
	fee: string;
}



const defaultValues = {
	newspaper: { label: '', value: '' },
	fee: '',
};

const ManageNewsPaperForm = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const { publisherPrices, loadingPublisherPrices } = useSelector(
		(state: RootState) => state.publications
	);

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<ManageNewsPaperFormValues>({ defaultValues });

	const newsPaper = watch('newspaper');

	useEffect(() => {
		dispatch(
			actions.fetchPublisherPrices({
				publicationType: PUBLICATION_TYPES.CHANGE_OF_NAME,
			})
		);
		return () => {
			dispatch(actions.clearPublisherPrices());
		};
	}, []);



	const onSubmit = async (data: ManageNewsPaperFormValues) => {
		setLoading(true)
		try {
			await adminAPI.editFee({
				key: data.newspaper.value,
				value: data.fee,
			});
			reset(defaultValues);
			setLoading(false);
			toast.success("Price updated successfully")
		} catch (e) {
			toast.error('Failed to update prices');
			setLoading(false);
		}
		console.log(data);
	};

	const getNewsPaperOptions = () => {
		return publisherPrices
			.filter((price) => price.isPlatform === false)
			.map((price) => ({
				label: capitalize(price.externalName),
				value: price.externalName,
			}));
	};

	useEffect(() => {
		const price = publisherPrices.find(
			(price) => price.externalName === newsPaper?.value
		)?.price;
		if (price) {
			setValue('fee', price);
		}
	}, [publisherPrices, newsPaper]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
			<EpitomeBox />
			<Loader loading={loading}/>
			<div className="flex flex-col space-y-5">
				<Controller
					control={control}
					name="newspaper"
					rules={{ validate: (v) => !isEmpty(v.value) }}
					render={({ field }) => (
						<Select
							label="Newspaper"
							hasError={!!errors.newspaper}
							options={getNewsPaperOptions()}
							{...field}
							ref={null}
							isLoading={loadingPublisherPrices}
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
			<div className="mt-[70px] flex flex-col space-y-[18px]">
				<button
					disabled={loading || loadingPublisherPrices}
					type="submit"
					className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px] disabled:cursor-not-allowed">
					Edit Newspaper Fee
				</button>
				{/* <button
					className="w-full py-[15px] text-FF012F font-semibold text-12 bg-white rounded-[2px] border border-FF012F">
					Delete 3rd Party Newspaper
				</button> */}
			</div>
		</form>
	);
};

export default ManageNewsPaperForm;
