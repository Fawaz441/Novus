import { EpitomeBox } from 'components/general';
import { FileInput, Input, TextArea } from 'components/inputs';
import { isEmpty } from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { validators } from 'utils/validation';

interface RoleCreationValues {
	heading: string;
	body: string;
	image: any;
}

const NISSettings = () => {
	const {
		control,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<RoleCreationValues>();

	const onSubmit = (data: RoleCreationValues) => {
		console.log(data);
	};

	const setDocument = async (e: any) => {
		const selectedFile = e.target.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			const fileData = event?.target?.result;
			setValue('image', fileData);
		};
		reader.readAsDataURL(selectedFile);
	};

	return (
		<div className="flex justify-center w-full pb-5">
			<div className="flex flex-col space-y-[29px]">
				<p className="text-575555 text-12 leading-[22.2px]">
					Edit and Update publication for Nigerian Immigration Service
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
					<EpitomeBox />
					<div className="flex flex-col space-y-5">
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="heading"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="Publication Heading"
									containerClassName="w-full"
									placeholder="Enter a brief heading of the publication"
									ref_={ref}
									value={value}
									hasFilterIcon={false}
									onChange={onChange}
									hasError={!!errors.heading}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="body"
							render={({ field: { value, onChange, ref } }) => (
								<TextArea
									label="Publication Body"
									containerClassName="w-full"
									ref_={ref}
									value={value}
									onChange={onChange}
									hasError={!!errors.body}
								/>
							)}
						/>
						<div className="flex flex-col space-y-[7px]">
							<span className="text-12 text-575555 font-medium leading-[14.09px]">
								Publication Image
							</span>
							<Controller
								control={control}
								rules={{ validate: (v) => !isEmpty(v) }}
								name="image"
								render={({ field: { value, onChange, ref } }) => (
									<FileInput
										label="Attach a supporting image for publication"
										hasError={!!errors.image}
										onChange={(e: any) => setDocument(e)}
										ref_={ref}
										fileValue={getValues('image')}
									/>
								)}
							/>
						</div>
					</div>
					<div className="mt-[70px]">
						<button
							type="submit"
							className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
							Update Publication
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NISSettings;
