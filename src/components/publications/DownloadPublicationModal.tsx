import { Modal } from 'components/general';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { useModal } from 'hooks';
import clsx from 'classnames';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MODALS } from 'utils/constants';
import { Calendar } from 'components/inputs';
import { fakeAPICall, getRandomBoolean } from 'utils/ui-functions';
import FilterDownloads from './FilterDownloads';
import { ReactComponent as Success } from 'assets/icons/publications/success.svg';

const DownloadPublicationModal: React.FC = () => {
	const { isVisible } = useModal();
	const [activeCalendar, setActiveCalendar] = useState<
		'start_date' | 'end_date' | null
	>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [referenceNo, setReferenceNo] = useState('');
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [publications, setPublications] = useState<number>(0);
	const [downloaded, setDownloaded] = useState(false);

	const modalIsVisible = isVisible(MODALS.DOWNLOAD_PUBLICATION);

	const hideCalendar = () => setActiveCalendar(null);

	useEffect(() => {
		if (modalIsVisible) {
			inputRef?.current?.focus();
		} else {
			setReferenceNo('');
			setFetching(false);
			setStartDate(null);
			setEndDate(null);
			setError(null);
			setDownloaded(false);
			setPublications(0);
		}
	}, [modalIsVisible]);

	const getPublications = useCallback(() => {
		setFetching(true);
		fakeAPICall(() => {
			const callType = startDate && endDate ? 'date' : 'referenceNo';
			const errorEncountered = getRandomBoolean();
			if (errorEncountered) {
				const errorMessage =
					callType === 'date'
						? '0 publication(s) reached'
						: 'No publication for this number exist';
				setError(errorMessage);
			} else {
				setPublications(getRandomBoolean() ? 200 : 1);
			}
			setFetching(false);
		});
	}, [startDate, endDate]);

	const showCalendar = (calendarType: 'start_date' | 'end_date') => {
		setActiveCalendar(calendarType);
		if (referenceNo) {
			setReferenceNo('');
		}
	};

	const clearStatus = () => {
		if (error) {
			setError(null);
		}
		if (publications) {
			setPublications(0);
		}
	};

	const onReferenceNumberChange = (value: string) => {
		setReferenceNo(value);
		clearStatus();
		const trimmedValue = value?.trim();
		if (trimmedValue?.length > 0) {
			if (startDate) {
				setStartDate(null);
			}
			if (endDate) {
				setEndDate(null);
			}
		}
		if (trimmedValue.length === 12) {
			getPublications();
		}
	};

	useEffect(() => {
		if (startDate && endDate) {
			getPublications();
		}
		clearStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, endDate, getPublications]);

	return (
		<Modal name={MODALS.DOWNLOAD_PUBLICATION}>
			<Calendar
				value={startDate}
				visible={activeCalendar === 'start_date'}
				onChange={setStartDate}
				onClose={hideCalendar}
			/>
			<Calendar
				value={endDate}
				visible={activeCalendar === 'end_date'}
				onChange={setEndDate}
				onClose={hideCalendar}
			/>
			<div
				className={clsx(
					'transition-all duration-300 max-w-[644px] rounded-6 px-[30px] py-[35px] bg-white border border-9B9B9B lg:w-[644px]',
					{
						'!max-w-[522px] lg:!w-[522px]': downloaded,
					}
				)}
			>
				{downloaded ? (
					<div className="flex flex-col justify-center items-center">
						<h3 className="text-7108F6 font-bold text-xl leading-[23.48px] text-center mb-[23px]">
							NOVUS
						</h3>
						<p className="max-w-[203px] text-12 text-center mb-[13.08px] font-medium text-9B9B9B leading-[20.09px]">
							<span className="font-bold text-black">Congratulations,</span> 200
							publications downloaded successfully
						</p>
						<div className="flex items-center justify-center">
							<Success />
						</div>
					</div>
				) : (
					<div>
						<div className="flex items-center justify-between">
							<h3 className="font-bold text-xl leading-[23.48px] text-black">
								NOVUS
							</h3>
							<div className="flex space-x-[6px] items-center">
								<span className="text-9B9B9B text-sm font-medium leading-[16.44px]">
									Download Publication(s)
								</span>
							</div>
						</div>
						<div className="mt-[34px] flex">
							<div className="flex flex-col space-y-[7px]">
								<span className="text-575555 text-12 leading-[14.09px]">
									Enter a publication reference number to download
								</span>
								<div className="flex-shrink-0 h-12 w-full flex items-center px-[15px] lg:w-[291px] max-w-[291px] bg-F9F9F9 rounded-6">
									<input
										placeholder={'RRT989XXXXX'}
										ref={inputRef}
										value={referenceNo}
										onChange={({ target: { value } }) =>
											onReferenceNumberChange(value)
										}
										className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-9B9B9B text-black text-12 font-medium"
									/>
									<button
										className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
										type="button"
									>
										<Filter className="fill-08F692 stroke-EEEEEE" />
									</button>
								</div>
							</div>
							<div className="mx-3 flex flex-col flex-shrink-0 space-y-[7px]">
								<span className="text-575555 text-12 leading-[14.09px] opacity-0">
									or
								</span>
								<div className="flex items-center justify-center h-[38px] w-[38px] rounded-full border border-EEEEEE">
									<span className="uppercase font-medium text-12 text-9B9B9B">
										Or
									</span>
								</div>
							</div>
							<div className="flex flex-col space-y-[7px]">
								<span className="text-575555 text-12 leading-[14.09px] text-right">
									Select a range of publication dates
								</span>
								<div className="flex space-x-[17px]">
									<button
										onClick={() => showCalendar('start_date')}
										className="h-12 w-[102px] text-9B9B9B font-medium text-12 leading-[14.09px] bg-F9F9F9 rounded-6"
									>
										{startDate ? startDate?.toLocaleDateString() : 'Start Date'}
									</button>
									<button
										onClick={() => showCalendar('end_date')}
										className="h-12 w-[102px] text-9B9B9B font-medium text-12 leading-[14.09px] bg-F9F9F9 rounded-6"
									>
										{endDate ? endDate?.toLocaleDateString() : 'End Date'}
									</button>
								</div>
							</div>
						</div>
						{fetching && (
							<div className="mt-[6px] flex items-center justify-center">
								<span className="text-12 text-9B9B9B leading-[14.09px] text-center">
									Loading...
								</span>
							</div>
						)}
						{error && (
							<div className="mt-[11px] flex items-center justify-between">
								<p className="text-FF012F text-12 leading-[14.09px]">
									{referenceNo ? error : ''}
								</p>
								<p className="text-black text-12 leading-[14.09px]">
									{startDate && endDate ? error : ''}
								</p>
							</div>
						)}
						{publications > 0 && (
							<div className="mt-[11px] flex items-center justify-between">
								{referenceNo ? (
									<p className="text-black text-12 leading-[14.09px]">
										<span className="font-semibold">{publications}</span>{' '}
										publication(s) reached
									</p>
								) : (
									<div />
								)}
								{startDate && endDate && (
									<p className="text-black text-12 leading-[14.09px]">
										<span className="font-semibold">{publications}</span>{' '}
										publication(s) reached
									</p>
								)}
							</div>
						)}
						{publications > 0 && (
							<div className="flex items-center justify-between mt-[11px]">
								{publications >= 200 ? <FilterDownloads /> : <div />}
								<button
									onClick={() => setDownloaded(true)}
									className="text-sm bg-08F692 h-12 rounded-6 px-[18px] flex items-center justify-center text-white font-semibold"
								>
									Download Publications
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</Modal>
	);
};

export default DownloadPublicationModal;
