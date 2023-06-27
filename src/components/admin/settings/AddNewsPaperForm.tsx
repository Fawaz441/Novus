import { EpitomeBox } from 'components/general';
import { Input } from 'components/inputs';
import { useForm, Controller } from 'react-hook-form';
import { validators } from 'utils/validation';

interface AddNewsPaperFormValues {
	name: string;
	fee: number;
}

const AddNewsPaperForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AddNewsPaperFormValues>();

	const onSubmit = (data: AddNewsPaperFormValues) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
			<EpitomeBox />
			<div className="flex flex-col space-y-5">
				<Controller
					control={control}
					rules={validators.isRequiredString}
					name="name"
					render={({ field: { value, onChange, ref } }) => (
						<Input
							label="Newspaper"
							containerClassName="w-full"
							placeholder="Enter name of newspaper"
							ref_={ref}
							value={value}
							hasFilterIcon={false}
							onChange={onChange}
							hasError={!!errors.name}
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
					type="submit"
					className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
					Create 3rd Party Newspaper
				</button>
			</div>
		</form>
	);
};

export default AddNewsPaperForm;
