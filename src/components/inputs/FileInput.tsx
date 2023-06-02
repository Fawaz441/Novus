import React from 'react';
import clsx from 'classnames'
import { ReactComponent as Document } from 'assets/icons/document.svg';


const FileInput = (props:any) => {
	const {ref_,fileValue, ...rest} = props;
	const [blob, setBlob] = React.useState<any>(null)
	const handleSelectedFile = (e:any, isProp?:boolean) => {
		let file;
		if(isProp){
			file = e
		}
		else{
			 file = e.target.files[0]
		}
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
			if(validImageTypes.includes(file?.type)){
				const url = URL.createObjectURL(file)
				setBlob(url)
			}
	}

	return (
		<div
			className={clsx("h-[150px] relative bg-EEEEEE cursor-pointer rounded-6 w-full flex flex-col space-y-[11px] pt-[15px] justify-center",{
				"!border-[red] border":props.hasError
			})}
		>
			<span className="text-center text-7108F6 text-12 leading-[14.09px] font-semibold">
				Click to upload Document
			</span>
			<div className="flex items-center justify-center">
				<Document className="h-[66px] w-[66px]" />
			</div>
			{(blob||fileValue)&&
			<img
			src={blob ?? fileValue}
			className="absolute top-0 left-0 h-full w-full object-contain bg-575555/[.7] rounded-6"
			alt="user"
			id="selected-file"
			/>
			}
			<input
				ref={ref_}
				type="file"
				className="opacity-0 absolute top-0 left-0 h-full w-full"
				accept="image/jpeg,image/png,application/pdf"
				{...rest}
				onChange={(x) => {
					props.onChange(x)
					handleSelectedFile(x)
				}}
			/>
		</div>
	);
};

export default FileInput;
