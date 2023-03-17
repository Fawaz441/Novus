import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'pages/main';
import { PublicationList, PublicationDetail } from 'pages/publications';
import { routes } from 'utils/constants';

const AppRoutes: React.FC = () => {
	const router = createBrowserRouter([
		{ path: routes.home, element: <Home /> },
		{ path: routes.publications, element: <PublicationList /> },
		{ path: routes.publication_detail, element: <PublicationDetail /> },
	]);
	return <RouterProvider router={router} />;
};

export default AppRoutes;
