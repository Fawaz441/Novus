/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from 'components/admin/navigation';
import { AdminSummaryCard } from 'components/admin/dashboard';
import {
	AdminPublicationsFilter,
	AdminPublicationsTabs,
	AdminPublications,
	AdminPublicationPreview,
} from 'components/admin/main';
import { useEffect, useMemo, useState } from 'react';
import { AdminPublicationsFilterDuration } from 'interfaces/admin';
import { PUBLICATION_TYPES } from 'utils/constants';
import { toast } from 'react-hot-toast';
import { ErrorToast, Loader } from 'components/general';
import adminAPI, { DashboardSummaryResponse } from 'api/admin';
import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
	PublicationsListMeta,
} from 'interfaces/publications';
import { ApproveOrRejectValues } from 'interfaces/admin';

const Dashboard = () => {
	const [summary, setSummary] = useState<DashboardSummaryResponse|null>(null)
	const [currentFilter, setCurrentFilter] =
		useState<AdminPublicationsFilterDuration>('today');
	const [activeTab, setActiveTab] = useState<PUBLICATION_TYPES>(
		PUBLICATION_TYPES.CHANGE_OF_NAME
	);
	const [date, setDate] = useState<Date | null>(null);
	const [loading, setLoading] = useState(false);
	const [selectedPublication, setSelectedPublication] = useState<string | null>(
		null
	);
	const [data, setData] = useState<
		ChangeOfNamePublicationValues[] | LossOfDocumentPublicationValues[]
	>([]);
	const [meta, setMeta] = useState<PublicationsListMeta | null>(null);
	const [status, setStatus] = useState<'Pending' | 'Published' | null>(null);

	const getSummary = async() => {
		try{
			const info = await adminAPI.getSummary()
			setSummary(info.data)
			// setSummary(info.data.data)
		}
		catch(e){
			toast.custom((t) => <ErrorToast message='There was an error fetching the summary' retry={() => getSummary()} t={t} />);
		}
	}

	const getData = async (filter: PUBLICATION_TYPES, params?: any) => {
		setLoading(true);
		try {
			const response = await adminAPI.getAdminPublications(filter, params);
			setData(response.data.items);
			setMeta(response.data.meta);
			setLoading(false);
			const body = document.body;
			if (body) {
				body.scrollTop = 0;
			}
		} catch (e) {
			setLoading(false);
			toast.custom((t) => <ErrorToast retry={() => getData(filter)} t={t} />);
		}
	};

	const filters = useMemo(() => {
		const items = {
			activeTab,
			date,
			status,
			currentFilter,
		};
		let availableQueries: any = {};
		if (items.status) {
			availableQueries.status =
				status === 'Pending'
					? 'pending-payment'
					: status === 'Published'
					? 'approve'
					: null;
		}
		if (items.date) {
			availableQueries.createdAt = date?.toISOString();
		}
		const query = {
			publicationType: items.activeTab,
			others: { filter: JSON.stringify(availableQueries) },
		};
		return query;
	}, [activeTab, date, status, currentFilter]);

	useEffect(() => {
		getData(filters.publicationType, {
			sort: JSON.stringify({
				createdAt: 'DESC',
			}),
			...filters.others,
		});
	}, [filters]);

	const approveOrRejectPublication = async (
		publicationId: number,
		data: ApproveOrRejectValues
	) => {
		setLoading(true);
		try {
			await adminAPI.declineOrApprovePublication(publicationId, data);
			setLoading(false);
			if (data.approvePublication) {
				toast.success('Publication approved successfully');
			} else {
				toast.success('Publication rejected successfully');
			}
			getData(filters.publicationType, {
				sort: JSON.stringify({
					createdAt: 'DESC',
				}),
				...filters.others,
			});
		} catch (e) {
			toast.custom((t) => (
				<ErrorToast
					t={t}
					retry={() => approveOrRejectPublication(publicationId, data)}
				/>
			));
			setLoading(false);
		}
	};

	const activePublication = useMemo(() => {
		const query = (data as ChangeOfNamePublicationValues[]).find(
			(x) => x?.reference === selectedPublication
		);
		return query ?? null;
	}, [data, selectedPublication]);

	useEffect(() => {
		if (!activePublication) {
			setSelectedPublication(null);
		}
	}, [activePublication]);

	const navigate = (direction: 'left' | 'right') => {
		const currIndex = (data as ChangeOfNamePublicationValues[]).findIndex(
			(item) => item.reference === selectedPublication
		);
		if (direction === 'left') {
			if (currIndex !== 0) {
				const prevItem = data[currIndex - 1];
				prevItem && setSelectedPublication(prevItem?.reference || '');
			}
		}
		if (direction === 'right') {
			if (currIndex !== data.length - 1) {
				const nextItem = data[currIndex + 1];
				nextItem && setSelectedPublication(nextItem?.reference || '');
			}
		}
	};

	useEffect(()=>{
		getSummary()
	},[])

	return (
		<Wrapper>
			<Loader loading={loading} transparent />
			<div className="mt-[26px] lg:mt-[50px] pb-[30px]">
				<div className="w-full lg:w-auto flex lg:flex-row lg:space-x-[10.8px] flex-col lg:space-y-0 space-y-[14px]">
					<AdminSummaryCard value={summary?.totalPublications} text="Total" bold_text="Publications" />
					<AdminSummaryCard value={summary?.totalRevenue} text="Total" bold_text="Revenue" />
					<AdminSummaryCard value={summary?.totalAgent} text="Agents" bold_text="Network" />
					<AdminSummaryCard value={summary?.totalCoordinator} text="Total" bold_text="Coordinators" />
				</div>
				<div className="mt-[45px]">
					<AdminPublicationsFilter
						currentFilter={currentFilter}
						onFilterChange={(filter: AdminPublicationsFilterDuration) =>
							setCurrentFilter(filter)
						}
						date={date}
						setDate={setDate}
						status={status}
						setStatus={setStatus}
					/>
					<div className="mt-[42px]">
						<AdminPublicationsTabs
							currentTab={activeTab}
							onTabChange={(tab) => setActiveTab(tab)}
						/>
					</div>
				</div>
				<div className="mt-7 flex space-x-[68px]">
					<div className="flex-1">
						<AdminPublications
							activePublication={selectedPublication}
							onPublicationSelect={(ref: string) => setSelectedPublication(ref)}
							publicationType={activeTab}
							publications={data}
							onNextButtonClick={() =>
								getData(activeTab, {
									page: (meta?.currentPage || 0) + 1,
								})
							}
							onPrevButtonClick={() =>
								getData(activeTab, {
									page: (meta?.currentPage || 0) - 1,
								})
							}
							prevButtonDisabled={meta?.currentPage === 1 || !meta?.currentPage}
							nextButtonDisabled={
								!meta?.currentPage || meta?.totalPages === meta?.currentPage
							}
						/>
					</div>
					<div className="w-[501px] flex-shrink-0">
						{selectedPublication && activePublication && (
							<AdminPublicationPreview
								publication={activePublication}
								publicationType={activeTab}
								approveOrRejectPublication={approveOrRejectPublication}
								navigate={navigate}
							/>
						)}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Dashboard;
