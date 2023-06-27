import { EpitomeBox } from 'components/general';
import { Input } from 'components/inputs';
import { Controller, useForm } from 'react-hook-form';
import { validators } from 'utils/validation';

interface SecurityFormValues {
	password: string;
	new_password: string;
	confirm_password: string;
}

const Security = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SecurityFormValues>();

	const onSubmit = (data: SecurityFormValues) => {
		console.log(data);
	};

	return (
		<div className="flex justify-center w-full pb-5">
			<div className="flex flex-col space-y-[29px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
					<EpitomeBox />
					<div className="flex flex-col space-y-5">
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="password"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="Password"
									type="password"
									containerClassName="w-full"
									ref_={ref}
									value={value}
									hasFilterIcon={false}
									onChange={onChange}
									hasError={!!errors.password}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="new_password"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="New Password"
                                    type="password"
									containerClassName="w-full"
									ref_={ref}
									hasFilterIcon={false}
									value={value}
									onChange={onChange}
									hasError={!!errors.new_password}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="confirm_password"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="Confirm Password"
                                    type="password"
									containerClassName="w-full"
									ref_={ref}
									hasFilterIcon={false}
									value={value}
									onChange={onChange}
									hasError={!!errors.confirm_password}
								/>
							)}
						/>
					</div>
					<div className="mt-[70px]">
						<button
							type="submit"
							className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
							Update Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Security;
