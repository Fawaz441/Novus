import React from 'react';
import { ReactComponent as Document } from 'assets/icons/document.svg';

const FileInput = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	return (
		<div
			onClick={() => inputRef?.current?.click()}
			className="h-[150px] relative bg-EEEEEE cursor-pointer rounded-6 w-full flex flex-col space-y-[11px] pt-[15px] justify-center"
		>
			<span className="text-center text-7108F6 text-12 leading-[14.09px] font-semibold">
				Click or Drag to upload Document
			</span>
			<div className="flex items-center justify-center">
				<Document className="h-[66px] w-[66px]" />
			</div>
			<input
				ref={inputRef}
				type="file"
				className="opacity-0 absolute top-0 left-0 pointer-events-none"
			/>
		</div>
	);
};

export default FileInput;
