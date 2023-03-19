import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'pages/main';
import {
	PublicationList,
	PublicationDetail,
	ChangeOfNameForm,
	ChangeOfNamePreview,
	Payment,
} from 'pages/publications';
import { routes, STORAGE_KEYS } from 'utils/constants';
import { NotFound } from 'pages/misc';
import { retrieveFromLS } from 'utils/functions';
import { AppDispatch } from 'store';

import { useDispatch } from 'react-redux';
import { addNewConPublication } from 'store/publications';

const AppRoutes: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		const newPublication = retrieveFromLS(STORAGE_KEYS.NEW_CON_PUBLICATION);
		if (newPublication) {
			dispatch(addNewConPublication(newPublication));
		}
		setLoading(false);
	}, [dispatch]);

	const router = createBrowserRouter([
		{ path: routes.home, element: <Home /> },
		{ path: routes.change_of_name_publications, element: <PublicationList /> },
		{ path: routes.publication_detail, element: <PublicationDetail /> },
		{ path: routes.pub_forms.change_of_name, element: <ChangeOfNameForm /> },
		{
			path: routes.pub_forms.change_of_name_preview,
			element: <ChangeOfNamePreview />,
		},
		{
			path: routes.pub_forms.payment,
			element: <Payment />,
		},
		{ path: '*', element: <NotFound /> },
	]);
	return loading ? <div /> : <RouterProvider router={router} />;
};

export default AppRoutes;
