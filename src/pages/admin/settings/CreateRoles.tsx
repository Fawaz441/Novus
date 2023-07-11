import adminAPI from 'api/admin';
import { EpitomeBox, Loader } from 'components/general';
import { Input, Select } from 'components/inputs';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { roleList } from 'utils/constants';
import { generatePassword } from 'utils/functions';
import { validators } from 'utils/validation';

interface RoleCreationValues {
	role: { value: any; label: any };
	fullName: string;
	email: string;
	password: string;
}

const defaultValues = {
	role: { value: "", label: "" },
	fullName: '',
	email: '',
	password: '',
};


const CreateRoles = () => {
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RoleCreationValues>({ defaultValues });

	const onSubmit = async (data: RoleCreationValues) => {
		setLoading(true);
		try {
			await adminAPI.createUser({
				role: data.role.value,
				password: data.password,
				fullName: data.fullName,
				email: data.email,
			});
			reset(defaultValues);
			setLoading(false);
			toast.success('User created successfully');
		} catch (e:any) {
			setLoading(false);
			toast.error(e?.response?.data?.message || 'There was an error');
		}
	};


	return (
		<div className="flex justify-center w-full pb-5">
			<Loader loading={loading} />
			<div className="flex flex-col space-y-[29px]">
				<p className="text-575555 text-12 leading-[22.2px]">
					Create admin roles for your team, that gives controlled access to
					specific screens
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
					<EpitomeBox />
					<div className="flex flex-col space-y-5">
						<Controller
							control={control}
							name="role"
							rules={{ validate: (v) => !isEmpty(v?.value) }}
							render={({ field }) => (
								<Select
									label="Role"
									hasError={!!errors.role}
									options={roleList}
									{...field}
									ref={null}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="fullName"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="Fullname"
									containerClassName="w-full"
									placeholder="Give the full-name of the team member for this role "
									ref_={ref}
									value={value}
									hasFilterIcon={false}
									onChange={onChange}
									hasError={!!errors.fullName}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredEmail}
							name="email"
							render={({ field: { value, onChange, ref } }) => (
								<div className="flex flex-col space-y-[17px]">
									<Input
										label="Email"
										containerClassName="w-full"
										placeholder="Enter a valid email address"
										ref_={ref}
										hasFilterIcon={false}
										value={value}
										onChange={onChange}
										hasError={!!errors.email}
									/>
									<p className="text-12 text-575555">
										An email will be sent to the team member for confirmation
									</p>
								</div>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="password"
							render={({ field: { value, onChange, ref } }) => (
								<div className="flex flex-col space-y-2">
									<Input
										label="Password"
										containerClassName="w-full"
										placeholder="Enter a password"
										ref_={ref}
										hasFilterIcon={false}
										value={value}
										onChange={onChange}
										hasError={!!errors.password}
									/>
									<div className="flex">
										<button
											type="button"
											onClick={() => onChange(generatePassword())}
											className="px-5 py-[3px] rounded-6 text-white font-semibold text-12 bg-black ml-auto">
											Generate password
										</button>
									</div>
								</div>
							)}
						/>
					</div>
					<div className="mt-[70px]">
						<button
							type="submit"
							className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
							Create Role
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRoles;
