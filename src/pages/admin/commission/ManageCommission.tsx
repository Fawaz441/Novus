import { EpitomeBox } from 'components/general';
import { Input, Select } from 'components/inputs';
import { isEmpty } from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { validators } from 'utils/validation';

interface ManageCommissionFormValues {
	role: { value: string; label: string };
	ads: { value: string; label: string };
	commission_rate: string;
}

const ManageCommission = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ManageCommissionFormValues>();

	const onSubmit = (data: ManageCommissionFormValues) => {
		console.log(data);
	};

	return (
		<div className="flex space-x-10">
			<div>
				<span className="text-black text-[18px]">
					Manage <span className="font-semibold">Commission</span>
				</span>
				<p className="text-575555 text-12 leading-[22.2px] max-w-[292px]">
					Manage the percentage deduction that would be applied to agent, agent
					managers and coordinators
				</p>
			</div>
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
								placeholder="Agent"
								options={[]}
								{...field}
								ref={null}
							/>
						)}
					/>
					<Controller
						control={control}
						name="ads"
						rules={{ validate: (v) => !isEmpty(v.value) }}
						render={({ field }) => (
							<Select
								label="Classified Ads"
								hasError={!!errors.ads}
								placeholder="Select Classified Ad"
								options={[]}
								{...field}
								ref={null}
							/>
						)}
					/>
					<Controller
						control={control}
						rules={validators.isRequiredString}
						name="commission_rate"
						render={({ field: { value, onChange, ref } }) => (
							<Input
								label="Commission Rate ( % )"
								containerClassName="w-full"
								placeholder="10"
								ref_={ref}
								value={value}
								hasFilterIcon={false}
								onChange={onChange}
								hasError={!!errors.commission_rate}
							/>
						)}
					/>
				</div>
				<p className="mt-[17px] text-12 text-575555">
					This update shall be applied to all agents for all classified ads,
					click update commission to apply changes
				</p>
				<div className="mt-12">
					<button
						type="submit"
						className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
						Update Commission
					</button>
				</div>
			</form>
		</div>
	);
};

export default ManageCommission;
