import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'pages/main';
import {
	PublicationList,
	PublicationDetail,
	ChangeOfNameForm,
} from 'pages/publications';
import { routes } from 'utils/constants';
import { NotFound } from 'pages/misc';

const AppRoutes: React.FC = () => {
	const router = createBrowserRouter([
		{ path: routes.home, element: <Home /> },
		{ path: routes.change_of_name_publications, element: <PublicationList /> },
		{ path: routes.publication_detail, element: <PublicationDetail /> },
		{ path: routes.pub_forms.change_of_name, element: <ChangeOfNameForm /> },
		{ path: '*', element: <NotFound /> },
	]);
	return <RouterProvider router={router} />;
};

export default AppRoutes;
