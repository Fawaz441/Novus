import { Wrapper } from 'components/agents/navigation';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Monitor } from 'assets/images/agents/monitor.svg';
import { Input } from 'components/inputs';
import { ReactComponent as Correct } from 'assets/icons/agents/correct.svg';

const CheckPublications = () => {
	const [refNo, setRefNo] = useState('');
	const [error, setError] = useState<string | null>(null);
	const isValidRefNo = refNo?.trim()?.length === 16;

	const onSubmit = () => {
		setError('You dont have access to this publication');
	};

	useEffect(() => {
		if (!isValidRefNo) {
			if (error) {
				setError(null);
			}
		}
	}, [isValidRefNo, error]);

	return (
		<Wrapper>
			<div className="mt-[131px] flex items-center justify-center">
				<div className="p-[23px] pb-[62px] border-D9D9D9 bg-white border-[0.5px] rounded-6">
					<div className="flex items-center space-x-[300px] py-5 bg-7108F6 px-[30px] rounded-6">
						<div className="w-[101px] flex flex-col">
							<span className="text-base leading-[21.76px] text-white">
								Check
							</span>
							<span className="text-base leading-[21.76px] text-white font-bold">
								Publication
							</span>
						</div>
						<Monitor />
					</div>
					<div className="mt-[43px]">
						<Input
							label="Ref No"
							value={refNo}
							autoFocus
							onChange={({ target: { value } }) => setRefNo(value)}
							labelClassName="!text-575555"
							wrapperClassName="!border-[0.2px] !border-575555/[.5]"
							hasFilterIcon={false}
							{...(isValidRefNo && !error && { icon: <Correct /> })}
						/>
						{error && (
							<p className="mt-4 text-FF012F text-base leading-[20.8px]">
								{error}
							</p>
						)}
						{isValidRefNo && !error && (
							<div className="mt-[57px] flex items-center justify-center">
								<button
									onClick={onSubmit}
									type="button"
									className="bg-7108F6 rounded flex items-center justify-center py-3 px-[77px] text-white font-semibold"
								>
									Go To Publication
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default CheckPublications;
