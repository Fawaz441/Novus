import adminAPI from 'api/admin';
import { EpitomeBox, Loader } from 'components/general';
import { Input, TextArea } from 'components/inputs';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { validators } from 'utils/validation';

interface NewsCreationValues {
	title: string;
	content: string;
}

const NISSettings = () => {
	const [loading, setLoading] = useState(false)
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<NewsCreationValues>();

	const onSubmit = async(data: NewsCreationValues) => {
		setLoading(true)
		try{
			await adminAPI.createNews({
				title:data.title,
				category:"immigration",
				media:{
					content:data.content
				}
			})
			setLoading(false)
			setValue("content","")
			setValue("title","")
			toast.success("News created successfully")
		}
		catch(e){
			setLoading(false)
			toast.error("Failed to create news.")
		}
	};


	return (
		<div className="flex justify-center w-full pb-5">
			<Loader loading={loading}/>
			<div className="flex flex-col space-y-[29px]">
				<p className="text-575555 text-12 leading-[22.2px]">
					Add publication for Nigerian Immigration Service
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-[501px] pt-[27px] pb-[57px] px-[35px] bg-white shadow-[1px_1px_10px_1px_rgba(217,217,217,1)] flex flex-col space-y-[27.86px]">
					<EpitomeBox />
					<div className="flex flex-col space-y-5">
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="title"
							render={({ field: { value, onChange, ref } }) => (
								<Input
									label="Publication Heading"
									containerClassName="w-full"
									placeholder="Enter a brief heading of the publication"
									ref_={ref}
									value={value}
									hasFilterIcon={false}
									onChange={onChange}
									hasError={!!errors.title}
								/>
							)}
						/>
						<Controller
							control={control}
							rules={validators.isRequiredString}
							name="content"
							render={({ field: { value, onChange, ref } }) => (
								<TextArea
									label="Publication Body"
									containerClassName="w-full"
									ref_={ref}
									value={value}
									onChange={onChange}
									hasError={!!errors.content}
								/>
							)}
						/>
					</div>
					<div className="mt-[70px]">
						<button
							type="submit"
							className="w-full py-[15px] text-white font-semibold text-12 bg-black rounded-[2px]">
							Add Publication
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NISSettings;