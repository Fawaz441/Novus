import React, { useState } from 'react';
import clsx from 'classnames';
import { ReactComponent as Check } from 'assets/icons/agents/check.svg';
import { ReactComponent as TransactionIcon } from 'assets/icons/agents/transaction.svg';

const filters = ['Today', 'Yesterday', '1 week'];

const transactions = [
	{
		date: '05/05/2023',
		type: 'credit',
		narration: 'Commission paid by Novus',
		amount: 5600,
	},
	{
		date: '05/05/2023',
		type: 'debit',
		narration: 'Commission withdrawn by Agent',
		amount: 5600,
	},
	{
		date: '05/05/2023',
		type: 'credit',
		narration: 'Commission paid by Novus',
		amount: 5600,
	},
	{
		date: '05/05/2023',
		type: 'debit',
		narration: 'Commission withdrawn by Agent',
		amount: 5600,
	},
	{
		date: '05/05/2023',
		type: 'credit',
		narration: 'Commission paid by Novus',
		amount: 5600,
	},
	{
		date: '05/05/2023',
		type: 'debit',
		narration: 'Commission withdrawn by Agent',
		amount: 5600,
	},
];

const Transactions = () => {
	const [activeFilter, setActiveFilter] = useState(filters[0]);
	return (
		<div className="w-[371px] flex-shrink-0 self-start">
			<div className="flex flex-col space-y-[22px]">
				<div className="flex flex-col space-y-[21px]">
					<h3 className="font-medium text-[18px] leading-[23.4px] text-575555">
						Transactions
					</h3>
					<div className="flex items-center justify-between">
						{filters.map((filter, index) => (
							<button
								key={index}
								onClick={() => setActiveFilter(filter)}
								className={clsx(
									'py-[9px] px-5 text-12 font-medium rounded-6 flex items-center justify-center text-black bg-transparent',
									{
										'font-semibold !bg-black !text-white':
											filter === activeFilter,
									}
								)}
							>
								{filter}
							</button>
						))}
						<div className="flex items-center justify-center bg-F3F3F3 rounded-6 h-[35px] w-10">
							<Check className="h-[18px] w-[18px] fill-black" />
						</div>
					</div>
				</div>
				<div className="p-6 rounded-[3px]  overflow-y-auto w-full border-[0.5px] border-D9D9D9">
					<div className="flex flex-col space-y-[22px]">
						{transactions.map((transaction, index) => (
							<div
								className="w-full flex items-center justify-between"
								key={index}
							>
								<div className="flex items-center space-x-3">
									<div className="h-[52px] w-[52px] rounded-full flex items-center justify-center">
										<TransactionIcon
											className={clsx({
												'rotate-180': transaction.type === 'debit',
											})}
										/>
									</div>
									<div className="flex flex-col space-y-2">
										<span className="text-12 leading-[15.6px] text-575555 font-inter">
											{transaction.date}
										</span>
										<span className="text-[13px] leading-[16.9px] text-575555 font-inter">
											{transaction.narration}
										</span>
									</div>
								</div>
								<h3 className="flex-shrink-0 text-base text-black font-medium font-inter">
									{transaction.amount}
								</h3>
							</div>
						))}
					</div>
					<div className="py-[54px] flex items-center justify-center text-575555 font-medium text-[13px] leading-[16.9px]">
						View History
					</div>
				</div>
			</div>
		</div>
	);
};

export default Transactions;
