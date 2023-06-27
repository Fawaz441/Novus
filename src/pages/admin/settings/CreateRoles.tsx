import { EpitomeBox } from 'components/general';
import { Input, Select } from 'components/inputs';
import { isEmpty } from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { validators } from 'utils/validation';

interface RoleCreationValues {
	role: { value: any; label: any };
	fullName: string;
	email: string;
}

const CreateRoles = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<RoleCreationValues>();

	const onSubmit = (data: RoleCreationValues) => {
		console.log(data);
	};

	return (
		<div className="flex justify-center w-full pb-5">
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
							rules={{ validate: (v) => !isEmpty(v.value) }}
							render={({ field }) => (
								<Select
									label="Role"
									hasError={!!errors.role}
									options={[]}
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
