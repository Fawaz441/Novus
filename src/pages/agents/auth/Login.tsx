import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ReactComponent as Google } from 'assets/icons/google.svg';
import { Input } from 'components/inputs';
import { validators } from 'utils/validation';
import { Welcome } from 'components/agents/auth';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';

interface LoginValues {
	email: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginValues>();

	const onSubmit = (data: LoginValues) => {
		console.log(data);
	};

	return (
		<div className="flex w-full h-full bg-white">
			<Welcome />
			<div className="ml-[50%] py-[60px] pr-[124px] w-1/2 h-full pl-[10px] mt-[67px]">
				<div className="max-w-[500px] rounded-6 border border-EEEEEE bg-F9F9F9 px-10 pb-4 pt-[39px]">
					<h4 className="font-bold text-xl leading-[33.48px] text-black mb-[9px]">
						NOVUS
					</h4>
					<p className="text-[12px] leading-[15.6px] text-575555 mb-[55px]">
						Welcome to Novus, sign in <span className="font-bold">agent</span>
					</p>
					<button className="bg-white justify-center w-full h-[50px] flex items-center space-x-[17px]">
						<div className="h-8 w-8 flex items-center rounded-6 justify-center rounded-full border-[0.5px] border-EEEEEE bg-white">
							<Google />
						</div>
						<span className="text-575555 text-[12px] leading-[15.6px]">
							Sign in with Google
						</span>
					</button>
					<div className="mt-8 flex items-center mb-[37px]">
						<div className="border-[0.5px] border-D9D9D9 flex-1" />
						<span className="text-[12px] leading-[15.6px] text-575555 mx-1">
							or
						</span>
						<div className="border-[0.5px] border-D9D9D9 flex-1" />
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col space-y-4">
							<Controller
								control={control}
								name="email"
								rules={validators.isRequiredEmail}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										ref_={ref}
										label="Email"
										placeholder="email@email.com"
										wrapperClassName="!border-[0.5px] bg-white !border-[#CFCFCF]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.email}
										hasRequiredIcon
									/>
								)}
							/>
							<Controller
								control={control}
								name="password"
								rules={validators.isRequiredString}
								render={({ field: { value, onChange, ref } }) => (
									<Input
										value={value}
										onChange={onChange}
										ref_={ref}
										label="Password"
										placeholder="Password"
										wrapperClassName="!border-[0.5px] bg-white !border-[#CFCFCF]"
										hasFilterIcon={false}
										labelClassName="!text-black"
										hasError={!!errors.password}
										hasRequiredIcon
									/>
								)}
							/>
						</div>
						<button
							type="submit"
							className="mt-[50px] w-full bg-7108F6 h-[55px] flex items-center justify-center text-center rounded-sm text-white text-base font-bold leading-[20.8px]"
						>
							Sign In
						</button>
						<div className="mt-6 flex flex-col space-y-[23px]">
							<p className="text-12 leading-[15.6px] text-575555 text-center">
								Dont have an account?,{' '}
								<button
									title="Register"
									onClick={() => navigate(routes.agents.registration)}
								>
									<span className="font-bold text-black">Register</span>
								</button>
							</p>
							<div className="items-center flex justify-center space-x-2">
								<div className="h-[14px] w-[14px] border-[0.2px] border-575555 bg-white rounded-full flex items-center justify-center">
									<span className="text-black text-[10px] leading-[13px]">
										c
									</span>
								</div>
								<span className="text-575555 text-[10px] leading-[13px]">
									Novus, {new Date().getFullYear()}
								</span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
