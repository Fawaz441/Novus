import { PublicationPhoto } from 'interfaces/publications';
import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'classnames';
import { API_URL } from 'api/rootAxios';
import { Loader } from 'components/general';
import { toast } from 'react-hot-toast';

interface AdminPublicationDocumentProps {
	documents: PublicationPhoto[];
	onClose: () => void;
	startIndex?: number | null;
}

const AdminPublicationDocument = ({
	documents,
	onClose,
	startIndex,
}: AdminPublicationDocumentProps) => {
	const [currIndex, setCurrIndex] = useState<number | null | undefined>(0);
	const [loadingImage, setLoadingImage] = useState(false);

	useEffect(() => {
		if (startIndex !== null) {
			setCurrIndex(startIndex);
		} else {
			setCurrIndex(0);
		}
	}, [startIndex]);

	const navigate = (direction: 'left' | 'right') => {
		if (direction === 'left' && currIndex) {
			setCurrIndex(currIndex - 1);
		}
		if (
			direction === 'right' &&
			currIndex !== null &&
			currIndex !== undefined
		) {
			setCurrIndex(currIndex + 1);
		}
	};

	const docUrl = useMemo(()=>`${API_URL}/images/${documents[currIndex || 0]?.url}`,[currIndex, documents]);

    useEffect(()=>{
        setLoadingImage(true)
    },[docUrl])

	return (
		<div
			className={clsx(
				'fixed h-screen left-0 top-0 w-full z-[100000] overflow-y-auto flex items-center justify-center pointer-events-none opacity-0',
				{
					'bg-black/[.1] opacity-100 cursor-pointer !pointer-events-auto':
						startIndex !== null,
				}
			)}
			role="presentation"
			onClick={(e) => {
				e.stopPropagation();
				onClose();
			}}>
			<div className="absolute top-0 left-0 w-full min-h-screen py-[40px] flex items-center justify-center">
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-white pt-[81px] pb-[124px] px-[110px]">
					<div className="flex items-center justify-center w-full mb-[33.66px] mini:w-[393px] bg-7108F6 rounded-3 py-3">
						<span className="font-medium text-white text-base">
							{documents[currIndex || 0]?.url}
						</span>
					</div>
					<div className="flex items-center justify-center">
						{loadingImage && (
							<div className="h-[381.67px] flex items-center justify-center">
								<Loader mini loading />
							</div>
						)}
						<img
							src={docUrl}
							onError={() => {
								toast.error('There was an error');
								setLoadingImage(false);
							}}
							alt={documents[currIndex || 0]?.publishType}
							className={clsx('h-[381.67px] max-w-[367.89px] object-contain', {
								'opacity-0 absolute pointer-events-none': loadingImage,
							})}
							onLoad={() => setLoadingImage(false)}
						/>
					</div>
					{documents.length > 0 && (
						<div className="flex items-center justify-center mt-[77.66px]">
							<div className="flex">
								<div className="flex h-[35px]">
									<button
										onClick={() => navigate('left')}
										type="button"
										title="Previous"
										disabled={currIndex === 0 || loadingImage}
										className="w-[91px] disabled:cursor-not-allowed rounded-tl-6 rounded-bl-6 font-semibold text-12 text-black">
										Prev
									</button>
									<button
										onClick={() => navigate('right')}
										type="button"
										title="Next"
										disabled={
											currIndex === documents.length - 1 || loadingImage
										}
										className="w-[91px] disabled:cursor-not-allowed rounded-tr-6 rounded-br-6 font-semibold text-12 text-white bg-black">
										Next
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminPublicationDocument;
