import { Wrapper } from 'components/agents/navigation';
import { Input, Select } from 'components/inputs';
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { nigerianBanks } from 'utils/constants';
import { validators } from 'utils/validation';

interface WithdrawCommissionValues {
	amount: string;
	bank: string;
	account_number: string;
	withdraw_pin: string;
}

const WithdrawCommission = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<WithdrawCommissionValues>();
	const onSubmit = (data: WithdrawCommissionValues) => {
		console.log(data);
	};

	const banks = useMemo(
		() => nigerianBanks.map((bank) => ({ value: bank.name, label: bank.name })),
		[]
	);

	return (
		<Wrapper>
			<div className="mt-[14px] flex justify-between">
				<button
					type="button"
					className="self-start font-bold text-sm text-[16.44px] text-black"
				>
					Back
				</button>
				<div className="flex flex-col space-y-[27px] w-[566px]">
					<div className="h-[90px] bg-7108F6 rounded-6 flex items-center justify-between py-[22px] px-[30px]">
						<p className="w-[101px] text-base leading-[21.76px] text-white">
							Commission <span className="font-bold">Balance</span>
						</p>
						<span className="text-base leading-[27.2px] font-semibold text-white">
							&#8358;30,000
						</span>
					</div>
					<div className="border-[0.5px] py-10 px-[49px] rounded-6 bg-white border-D9D9D9">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col space-y-[49px]">
								{/* amount */}
								<Controller
									control={control}
									name="amount"
									rules={validators.isRequiredString}
									render={({ field: { onChange, ref, value } }) => (
										<Input
											label="Amount"
											value={value}
											ref_={ref}
											onChange={onChange}
											hasFilterIcon={false}
											labelClassName="!font-inter !text-sm"
											wrapperClassName="bg-white !border-7108F6/[.2]"
											hasError={!!errors.amount}
											inputClassName="!text-sm !text-black !font-inter"
										/>
									)}
								/>
								{/* bank */}
								<Controller
									control={control}
									name="bank"
									rules={validators.isRequiredString}
									render={() => (
										<Select
											options={banks}
											onChange={(value: any) => setValue('bank', value.value)}
											label="Bank"
											labelClassName="!font-inter !text-sm"
											ClassNames={{
												control: (state) =>
													`h-12 !border-[0.2px] outline-none !border-575555/[.2] !rounded-3 !text-12 font-inter font-semibold ${
														state.isFocused
															? 'outline-none border-none shadow-none'
															: errors.bank
															? '!border-[red]'
															: ''
													}`,
											}}
										/>
									)}
								/>
								{/* account_number */}
								<Controller
									control={control}
									name="account_number"
									rules={validators.isRequiredString}
									render={({ field: { onChange, ref, value } }) => (
										<Input
											label="Account Number"
											value={value}
											ref_={ref}
											onChange={onChange}
											hasFilterIcon={false}
											labelClassName="!font-inter !text-sm"
											wrapperClassName="bg-white !border-7108F6/[.2]"
											inputClassName="!text-sm !text-black !font-inter"
											hasError={!!errors.account_number}
										/>
									)}
								/>
								{/* withdraw pin */}
								<Controller
									control={control}
									name="withdraw_pin"
									rules={validators.isRequiredString}
									render={({ field: { onChange, ref, value } }) => (
										<Input
											label="Withdraw Pin"
											value={value}
											placeholder="****"
											ref_={ref}
											onChange={onChange}
											hasFilterIcon={false}
											labelClassName="!font-inter !text-sm"
											wrapperClassName="bg-white !border-7108F6/[.2]"
											inputClassName="!text-sm !text-black !font-inter"
											hasError={!!errors.withdraw_pin}
										/>
									)}
								/>
							</div>
							<div className="flex items-center justify-center mt-[46px]">
								<button
									type="submit"
									className="h-[50px] px-[64px] bg-7108F6 rounded flex items-center justify-center"
								>
									<span className="text-white text-base leading-[20.8px]">
										Withdraw <span className="font-bold">Commission</span>
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
				<button
					type="button"
					className="self-start opacity-0 pointer-events-none font-bold text-sm text-[16.44px] text-black"
				>
					Back
				</button>
			</div>
		</Wrapper>
	);
};

export default WithdrawCommission;
