import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { routes } from 'utils/constants';

interface AdminRouteProps {
	children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const { token } = useSelector((state: RootState) => state.admin);

	useEffect(() => {
		if (!token) {
			navigate(routes.home);
		}
	}, [token, navigate]);

	if (token) {
		return <div>{children}</div>;
	}
	return <div />;
};

export default AdminRoute;
