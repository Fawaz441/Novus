import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="h-screen font-semibold flex flex-col space-y-6 items-center justify-center">
			<span>Not Found</span>
			<button className="bg-7108F6 py-3 px-4 rounded-lg text-white"
			onClick={()=>navigate(routes.home)}
			>Go home</button>
		</div>
	);
};

export default NotFound;
