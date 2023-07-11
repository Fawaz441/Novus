import adminAPI from 'api/admin';
import { EpitomeBox, Loader } from 'components/general';
import { Input } from 'components/inputs';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { validators } from 'utils/validation';

interface SecurityFormValues {
	password: string;
	new_password: string;
	confirm_password: string;
}

const Security = () => {
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<SecurityFormValues>();

	const onSubmit = async (data: SecurityFormValues) => {
		if (data.new_password !== data.confirm_password) {
			toast.error('Passwords do not match');
		}
		setLoading(true);
		try {
			await adminAPI.editUser({
				oldPassword: data.password,
				newPassword: data.new_password,
			});
			setValue("password","")
			setValue("new_password","")
			setValue("confirm_password","")
			toast.success('Password changed successfully');
			setLoading(false);
		} catch (e: any) {
			toast.error(JSON.stringify(e?.response?.data?.message));
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center w-full pb-5">
			<Loader loading={loading} />
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
