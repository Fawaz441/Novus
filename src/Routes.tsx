import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'pages/main';
import {
	PublicationList,
	PublicationDetail,
	ChangeOfNameForm,
	ChangeOfNamePreview,
	Payment,
	LossOfDocument,
	LossOfDocumentPreview,
	LossOfDocumentPublicationPayment,
	LostDocumentList,
} from 'pages/publications';
import { routes, STORAGE_KEYS } from 'utils/constants';
import { NotFound } from 'pages/misc';
import { retrieveFromLS } from 'utils/functions';
import { AppDispatch } from 'store';

import { useDispatch } from 'react-redux';
import { addNewConPublication, addNewLodPublication } from 'store/publications';
import { Login, Registration } from 'pages/agents/auth';

const AppRoutes: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		const newPublication = retrieveFromLS(STORAGE_KEYS.NEW_CON_PUBLICATION);
		const newLODPublication = retrieveFromLS(STORAGE_KEYS.NEW_LOD_PUBLICATION);
		if (newPublication) {
			dispatch(addNewConPublication(newPublication));
		}
		if (newLODPublication) {
			dispatch(addNewLodPublication(newLODPublication));
		}
		setLoading(false);
	}, [dispatch]);

	const router = createBrowserRouter([
		{ path: routes.home, element: <Home /> },
		{ path: routes.change_of_name_publications, element: <PublicationList /> },
		{ path: routes.lost_document_publications, element: <LostDocumentList /> },
		{ path: routes.publication_detail, element: <PublicationDetail /> },
		{ path: routes.pub_forms.change_of_name, element: <ChangeOfNameForm /> },
		{
			path: routes.pub_forms.change_of_name_preview,
			element: <ChangeOfNamePreview />,
		},
		{
			path: routes.pub_forms.loss_of_document_preview,
			element: <LossOfDocumentPreview />,
		},
		{
			path: routes.pub_forms.payment,
			element: <Payment />,
		},
		{
			path: routes.pub_forms.loss_of_document_payment,
			element: <LossOfDocumentPublicationPayment />,
		},
		{
			path: routes.pub_forms.loss_of_document,
			element: <LossOfDocument />,
		},
		{
			path: routes.agents.login,
			element: <Login />,
		},
		{
			path: routes.agents.registration,
			element: <Registration />,
		},
		{ path: '*', element: <NotFound /> },
	]);
	return loading ? <div /> : <RouterProvider router={router} />;
};

export default AppRoutes;
