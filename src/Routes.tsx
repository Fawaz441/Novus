import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'pages/main';
import { PublicationList } from 'pages/publications';

const AppRoutes: React.FC = () => {
	const router = createBrowserRouter([
		{ path: '/', element: <Home /> },
		{ path: '/publications', element: <PublicationList /> },
	]);
	return <RouterProvider router={router} />;
};

export default AppRoutes;
