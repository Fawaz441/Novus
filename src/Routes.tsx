import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from 'pages/main';
import {
	PublicationList,
	PublicationDetail,
	ChangeOfNameForm,
	LossOfDocument,
	LostDocumentList,
	CheckOrCreatePublication,
	Affidavit,
	Obituary,
	ObituaryList,
	PublicNotice,
	PublicNoticeList,
} from 'pages/publications';
import { PUBLICATION_TYPES, routes, STORAGE_KEYS } from 'utils/constants';
import { NotFound } from 'pages/misc';
import { retrieveFromLS } from 'utils/functions';
import { AppDispatch } from 'store';

import { useDispatch } from 'react-redux';
import {
	addNewConPublication,
	addNewLodPublication,
	addNewObituaryPublication,
	addNewPublicNoticePublication,
} from 'store/publications';
import { Login, Registration } from 'pages/agents/auth';
import { Dashboard, EnlistAgent, Settings } from 'pages/agents/main';

import { Commissions, WithdrawCommission } from 'pages/agents/commission';
import {
	AgentPublications,
	AgentPublicationDetails,
	CheckPublications,
	CreatePublication,
} from 'pages/agents/publications';
import {
	Dashboard as AdminDashboard,
	Login as AdminLogin,
} from 'pages/admin/main';
import { useWindowSize } from 'hooks';
import { setToken } from 'api/rootAxios';
import { adminSlice } from 'store/admin';
import { AdminUserDetails } from 'interfaces/admin';
import { AdminRoute } from 'components/navigation';
import Preview from 'components/publications/Preview';
import { PublicationPayment } from 'components/publications';
import {
	AdminSettingsOutlet,
	CreateRoles,
	EditRoles,
	NISSettings,
	Security,
	ThirdPartyNewsPaper,
} from 'pages/admin/settings';

const { actions } = adminSlice;

const AppRoutes: React.FC = () => {
	const { width } = useWindowSize();
	const [loading, setLoading] = useState(true);
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		const newPublication = retrieveFromLS(STORAGE_KEYS.NEW_CON_PUBLICATION);
		const newLODPublication = retrieveFromLS(STORAGE_KEYS.NEW_LOD_PUBLICATION);
		const newObituaryPublication = retrieveFromLS(
			STORAGE_KEYS.NEW_OBITUARY_PUBLICATION
		);
		const newPublicNoticePublication = retrieveFromLS(
			STORAGE_KEYS.NEW_PUBLIC_NOTICE_PUBLICATION
		);
		const adminToken = retrieveFromLS(STORAGE_KEYS.ADMIN_KEY);
		const isAdmin = retrieveFromLS(STORAGE_KEYS.IS_ADMIN);
		const adminInfo: AdminUserDetails | null = retrieveFromLS(
			STORAGE_KEYS.ADMIN_DETAILS
		);

		if (adminToken && isAdmin && adminInfo) {
			setToken(adminToken);
			dispatch(
				actions.authenticateDirectly({ user: adminInfo, token: adminToken })
			);
		}
		if (newPublication) {
			dispatch(addNewConPublication(newPublication));
		}
		if (newLODPublication) {
			dispatch(addNewLodPublication(newLODPublication));
		}
		if (newObituaryPublication) {
			dispatch(addNewObituaryPublication(newObituaryPublication));
		}
		if (newPublicNoticePublication) {
			dispatch(addNewPublicNoticePublication(newPublicNoticePublication));
		}
		setLoading(false);
	}, [dispatch]);

	const mobileRoutes =
		width! > 1332
			? []
			: [
					{
						path: routes.pub_forms.mobile_check_or_create,
						element: <CheckOrCreatePublication />,
					},
			  ];

	const router = createBrowserRouter([
		{ path: routes.home, element: <Home /> },
		{ path: routes.change_of_name_publications, element: <PublicationList /> },
		{ path: routes.lost_document_publications, element: <LostDocumentList /> },
		{ path: routes.obituary_publications, element: <ObituaryList /> },
		{ path: routes.public_notice_publications, element: <PublicNoticeList /> },
		{ path: routes.publication_detail, element: <PublicationDetail /> },
		{
			path: routes.pub_forms.change_of_name,
			element: <ChangeOfNameForm />,
		},
		{
			path: routes.pub_forms.change_of_name_preview,
			element: <Preview publicationType={PUBLICATION_TYPES.CHANGE_OF_NAME} />,
		},
		{
			path: routes.pub_forms.loss_of_document_preview,
			element: <Preview publicationType={PUBLICATION_TYPES.LOSS_OF_DOCUMENT} />,
		},
		{
			path: routes.pub_forms.obituary_preview,
			element: <Preview publicationType={PUBLICATION_TYPES.OBITUARY} />,
		},
		{
			path: routes.pub_forms.public_notice_preview,
			element: <Preview publicationType={PUBLICATION_TYPES.PUBLIC_NOTICE} />,
		},
		{
			path: routes.pub_forms.payment,
			element: (
				<PublicationPayment
					publicationType={PUBLICATION_TYPES.CHANGE_OF_NAME}
				/>
			),
		},
		{
			path: routes.pub_forms.loss_of_document_payment,
			element: (
				<PublicationPayment
					publicationType={PUBLICATION_TYPES.LOSS_OF_DOCUMENT}
				/>
			),
		},
		{
			path: routes.pub_forms.obituary_payment,
			element: (
				<PublicationPayment publicationType={PUBLICATION_TYPES.OBITUARY} />
			),
		},
		{
			path: routes.pub_forms.public_notice_payment,
			element: (
				<PublicationPayment publicationType={PUBLICATION_TYPES.PUBLIC_NOTICE} />
			),
		},
		{
			path: routes.pub_forms.loss_of_document,
			element: <LossOfDocument />,
		},
		{
			path: routes.pub_forms.obituary,
			element: <Obituary />,
		},
		{
			path: routes.pub_forms.affidavit,
			element: <Affidavit />,
		},
		{
			path: routes.pub_forms.public_notice,
			element: <PublicNotice />,
		},
		...mobileRoutes,
		{
			path: routes.agents.login,
			element: <Login />,
		},
		{
			path: routes.agents.registration,
			element: <Registration />,
		},
		{ path: routes.agents.dashboard, element: <Dashboard /> },
		{ path: routes.agents.settings, element: <Settings /> },
		{ path: routes.agents.commission, element: <Commissions /> },
		{ path: routes.agents.check_publications, element: <CheckPublications /> },
		{ path: routes.agents.publications, element: <AgentPublications /> },
		{ path: routes.agents.new_publication, element: <CreatePublication /> },
		{
			path: routes.agents.agent_publication_detail,
			element: <AgentPublicationDetails />,
		},
		{
			path: routes.agents.withdraw_commission,
			element: <WithdrawCommission />,
		},
		{
			path: routes.agents.enlist,
			element: <EnlistAgent />,
		},
		{ path: '*', element: <NotFound /> },
		{
			path: routes.admin.dashboard,
			element: (
				<AdminRoute>
					<AdminDashboard />
				</AdminRoute>
			),
		},
		{ path: routes.admin.login, element: <AdminLogin /> },
		{
			path: routes.admin.settings.index,
			element: <AdminSettingsOutlet />,
			children: [
				{ path: routes.admin.settings.roles, element: <CreateRoles /> },
				{ path: routes.admin.settings.edit_role, element: <EditRoles /> },
				{ path: routes.admin.settings.nis_settings, element: <NISSettings /> },
				{ path: routes.admin.settings.third_party_newspaper, element: <ThirdPartyNewsPaper /> },
				{ path: routes.admin.settings.security, element: <Security /> },
			],
		},
	]);
	return loading ? <div /> : <RouterProvider router={router} />;
};

export default AppRoutes;
