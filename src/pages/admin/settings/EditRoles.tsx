import { EpitomeBox } from 'components/general';
import { Input, Select } from 'components/inputs';
import { isEmpty } from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { validators } from 'utils/validation';

interface RoleEditValues {
	role: { value: any; label: any };
	team_member: string;
}

const EditRoles = () => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<RoleEditValues>();

	const onSubmit = (data: RoleEditValues) => {
		console.log(data);
	};

	return (
		<div className="flex justify-center w-full pb-5">
			<div className="flex flex-col space-y-[29px]">
				<p className="text-575555 text-12 leading-[22.2px]">
					Edit admin roles for your team, that gives controlled access to
					specific screens
				</p>
				<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
					<EpitomeBox />
					<div className="flex flex-col space-y-5">
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="team_member"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="Team Member"
									containerClassName="w-full"
									placeholder="Search by ID or email"
									ref_={ref}
									value={value}
									hasFilterIcon={false}
									onChange={onChange}
									hasError={!!errors.team_member}
								/>
							)}
						/>
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
					</div>
					<div className="mt-[70px]">
						<button
							type="submit"
							className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
							Edit Role
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditRoles;
