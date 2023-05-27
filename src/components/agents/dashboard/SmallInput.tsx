import React from 'react';

interface SmallInputProps {
	icon: React.ReactNode;
	placeholder: string;
}

const SmallInput: React.FC<SmallInputProps> = ({ icon, placeholder }) => {
	return (
		<div className="h-[41px] px-[14px] border-[0.2px] rounded-sm flex items-center">
			<input
				className="flex-1 text-12 h-full outline-none overflow-ellipsis w-full font-medium
                 placeholder:text-575555 text-black leading-[14.09px]"
				placeholder={placeholder}
			/>
			<div className="flex-shrink-0">{icon}</div>
		</div>
	);
};

export default SmallInput;
