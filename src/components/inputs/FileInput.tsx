import React, { RefCallback, useEffect } from 'react';
import clsx from 'classnames';
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg';

interface FileInputProps {
	onLoadError?: () => void;
	removeError?: () => void;
	hasError?: boolean;
	onChange?: (e: any) => void;
	ref_?: RefCallback<any>;
	fileValue?: any;
	accepts?: string;
}

const FileInput: React.FC<FileInputProps> = ({
	onLoadError,
	removeError,
	hasError,
	accepts,
	onChange,
	ref_,
	fileValue,
}) => {
	const [blob, setBlob] = React.useState<any>(null);
	const [pdfFile, setPdfFile] = React.useState<any>(null);
	const [mounted, setMounted] = React.useState<boolean>(false)
	const handleSelectedFile = (e: any) => {
		let file = e.target.files[0];
		const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
		if (validFileTypes.includes(file?.type)) {
			const fileIsPDF = file?.type === 'application/pdf';
			if (fileIsPDF) {
				setBlob(null);
				setPdfFile(fileIsPDF ? file : null);
				const reader = new FileReader();
				reader.onload = () => {
					const dataURL = reader.result;
					setPdfFile(dataURL);
				};
				reader.readAsDataURL(file);
			} else {
				const url = URL.createObjectURL(file);
				setBlob(url);
				return;
			}
		}
	};

	useEffect(() => {
		try {
			if (fileValue && !mounted && fileValue?.includes('application/pdf')) {
				setPdfFile(fileValue);
			}
		} catch (e) {}
		setMounted(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<div
			className={clsx(
				'h-[150px] relative bg-EEEEEE cursor-pointer rounded-6 w-full flex flex-col space-y-[11px] pt-[15px] justify-center',
				{
					'!border-[red] border': hasError,
				}
			)}>
			<span className="text-center text-7108F6 text-12 leading-[14.09px] font-semibold">
				Click to upload Document
			</span>
			<div className="flex items-center justify-center">
				<DocumentIcon className="h-[66px] w-[66px]" />
			</div>
			{(blob || fileValue || pdfFile) && (
				<div>
					{(pdfFile||fileValue?.includes("application/pdf")) ? (
						<iframe
							className="absolute h-full w-full top-0 left-0"
							src={pdfFile??fileValue}
							title="PDF Viewer"
							onError={() => {
								onLoadError && onLoadError();
							}}
						/>
					) : (
						<img
							onError={() => {
								onLoadError && onLoadError();
							}}
							src={blob ?? fileValue}
							className="absolute top-0 left-0 h-full w-full object-contain bg-575555/[.7] rounded-6"
							alt="user"
							id="selected-file"
						/>
					)}
				</div>
			)}
			<input
				ref={ref_}
				type="file"
				className="opacity-0 absolute top-0 left-0 h-full w-full"
				// accept={accepts ?? 'image/jpeg,image/png,application/pdf'}
				accept='image/jpeg,image/png'
				onChange={(x) => {
					removeError && removeError();
					onChange && onChange(x);
					handleSelectedFile(x);
				}}
			/>
		</div>
	);
};

export default FileInput;
