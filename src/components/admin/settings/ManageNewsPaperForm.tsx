import { EpitomeBox } from 'components/general';
import { Input, Select } from 'components/inputs';
import { isEmpty } from 'lodash';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface ManageNewsPaperFormValues {
	newspaper: { label: string; value: string };
	fee: number;
}

const ManageNewsPaperForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ManageNewsPaperFormValues>();

	const onSubmit = (data: ManageNewsPaperFormValues) => {
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
					name="newspaper"
					rules={{ validate: (v) => !isEmpty(v.value) }}
					render={({ field }) => (
						<Select
							label="Newspaper"
							hasError={!!errors.newspaper}
							options={[]}
							{...field}
							ref={null}
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
					type="submit"
					className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
					Edit 3rd Party Newspaper
				</button>
				<button
					className="w-full py-[15px] text-FF012F font-semibold text-12 bg-white rounded-[2px] border border-FF012F">
					Delete 3rd Party Newspaper
				</button>
			</div>
		</form>
	);
};

export default ManageNewsPaperForm;
