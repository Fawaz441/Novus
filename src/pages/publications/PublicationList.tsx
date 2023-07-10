import { ErrorToast, Loader, Pagination } from 'components/general';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { MobileFormsNavigation, Publication } from 'components/publications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { publicationSlice } from 'store/publications';
import toast from 'react-hot-toast';

const { actions } = publicationSlice;

const PublicationList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const {
		CONPublications,
		CONPublicationsMeta,
		loadingCONPublications,
		CONPublicationsError,
	} = useSelector((state: RootState) => state.publications);

	const getPublications = (filter?: any) => {
		dispatch(
			actions.getChangeOfNamePublications({
				params: {
					sort: JSON.stringify({
						createdAt: 'DESC',
					}),
					...filter,
				},
			})
		);
	};

	useEffect(() => {
		getPublications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (CONPublicationsError) {
			toast.custom((t) => <ErrorToast t={t} retry={getPublications} />);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [CONPublicationsError]);

	return (
		<Wrapper isPublications>
			<Loader loading={loadingCONPublications} />
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
				<div className="flex flex-col overflow-x-hidden mid:grid space-y-[26px] mid:space-y-0 mid:gap-x-10 w-full pub-list mid:gap-y-[30px] h-full mini:h-[calc(100vh_-_291px)] overflow-y-auto scrollbar-hide">
					{CONPublications.map((publication) => (
						<Publication data={publication} id={publication.id} key={publication.id} />
					))}
				</div>
				<div className="flex items-center justify-center h-[81px] flex-shrink-0">
					{!!CONPublicationsMeta?.totalItems && <Pagination
						onPrevClick={() =>
							getPublications({
								page: JSON.stringify((CONPublicationsMeta?.currentPage || 0) - 1),
							})
						}
						onNextClick={() =>
							getPublications({
								page: JSON.stringify((CONPublicationsMeta?.currentPage || 0) + 1),
							})
						}
						prevDisabled={
							CONPublicationsMeta?.currentPage === 1 ||
							!CONPublicationsMeta?.currentPage
						}
						nextDisabled={
							!CONPublicationsMeta?.currentPage ||
							CONPublicationsMeta.totalPages === CONPublicationsMeta.currentPage
						}
					/>}
				</div>
			</div>
		</Wrapper>
	);
};

export default PublicationList;
