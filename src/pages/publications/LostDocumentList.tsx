import { Pagination, Loader, ErrorToast } from 'components/general';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { LosttDocument, MobileFormsNavigation } from 'components/publications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { publicationSlice } from 'store/publications';
import toast from 'react-hot-toast';

const { actions } = publicationSlice;

const LostDocumentList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const {
		LODPublications,
		loadingLODPublications,
		LODPublicationsError,
		LODPublicationsMeta,
	} = useSelector((state: RootState) => state.publications);

	const getPublications = (params?:any) => {
		dispatch(
			actions.getLostDocumentPublications({
				params: {
					sort: JSON.stringify({
						createdAt: 'DESC',
						...params
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
		if (LODPublicationsError) {
			toast.custom((t) => <ErrorToast t={t} retry={getPublications} />);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [LODPublicationsError]);

	return (
		<Wrapper isPublications>
			<Loader loading={loadingLODPublications} />
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
				<div className="flex flex-col overflow-x-hidden space-y-[26px] mid:grid mid:gap-x-10 w-full pub-list mid:gap-y-[30px] h-full mini:h-[calc(100vh_-_291px)] overflow-y-auto scrollbar-hide">
					{LODPublications.map((publication) => (
						<LosttDocument data={publication} id={publication.id} />
					))}
				</div>
				<div className="flex items-center justify-center h-[81px] flex-shrink-0">
					<Pagination
						onPrevClick={() =>
							getPublications({
								page: JSON.stringify((LODPublicationsMeta?.currentPage || 0) - 1)
							})
						}
						onNextClick={() =>
							getPublications({
								page: JSON.stringify((LODPublicationsMeta?.currentPage || 0) + 1)
							})
						}
						prevDisabled={
							LODPublicationsMeta?.currentPage === 1 ||
							!LODPublicationsMeta?.currentPage
						}
						nextDisabled={
							!LODPublicationsMeta?.currentPage ||
							LODPublicationsMeta.totalPages === LODPublicationsMeta.currentPage
						}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default LostDocumentList;
