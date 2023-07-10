import { Pagination, Loader, ErrorToast } from 'components/general';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { MobileFormsNavigation, PublicNoticePublication } from 'components/publications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { publicationSlice } from 'store/publications';
import toast from 'react-hot-toast';

const { actions } = publicationSlice;

const PublicNoticeList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const {
		publicNoticePublications,
		publicNoticePublicationsError,
		loadingPublicNoticePublications,
		publicNoticePublicationsMeta,
	} = useSelector((state: RootState) => state.publications);

	const getPublications = (params?: any) => {
		dispatch(
			actions.getPublicNoticePublications({
				params: {
					sort: JSON.stringify({
						createdAt: 'DESC',
						...params,
					}),
				},
			})
		);
	};

	useEffect(() => {
		getPublications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (publicNoticePublicationsError) {
			toast.custom((t) => <ErrorToast t={t} retry={getPublications} />);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [publicNoticePublicationsError]);

	return (
		<Wrapper isPublications>
			<Loader loading={loadingPublicNoticePublications} />
			<div className="mini:hidden">
				<MobileFormsNavigation isForm={false} />
			</div>
			<div className="hidden mini:block">
				<FilterAndSearch
					searchIconClassName="!fill-7108F6"
					searchPlaceholder="Reference Number, Keywords, e.t.c"
				/>
			</div>
			<div className="mt-[90px] mid:mt-[120px] relative flex flex-col">
				<div className="flex flex-col overflow-x-hidden mid:grid mid:gap-x-10 space-y-[26px] mid:space-y-0 w-full pub-list mid:gap-y-[30px] h-full mini:h-[calc(100vh_-_291px)] overflow-y-auto scrollbar-hide">
					{publicNoticePublications.map((publication) => (
						<PublicNoticePublication data={publication} key={publication.id} id={publication.id} />
					))}
				</div>
				<div className="flex items-center justify-center h-[81px] flex-shrink-0">
					{!!publicNoticePublicationsMeta?.totalItems && <Pagination
						onPrevClick={() =>
							getPublications({
								page: (publicNoticePublicationsMeta?.currentPage || 0) - 1,
							})
						}
						onNextClick={() =>
							getPublications({
								page: (publicNoticePublicationsMeta?.currentPage || 0) + 1,
							})
						}
						prevDisabled={
							publicNoticePublicationsMeta?.currentPage === 1 ||
							!publicNoticePublicationsMeta?.currentPage
						}
						nextDisabled={
							!publicNoticePublicationsMeta?.currentPage ||
							publicNoticePublicationsMeta.totalPages === publicNoticePublicationsMeta.currentPage
						}
					/>}
				</div>
			</div>
		</Wrapper>
	);
};

export default PublicNoticeList;
