import { useState } from 'react';
import clsx from 'classnames';
import {
	AddNewsPaperForm,
	ManageNewsPaperForm,
} from 'components/admin/settings';

const tabs = ['Add Newspaper', 'Manage Newspaper'];

const ThirdPartyNewsPaper = () => {
	const [activeTab, setActiveTab] = useState<string>(tabs[0]);
	return (
		<div className="flex justify-center w-full pb-5">
			<div className="flex flex-col space-y-[27px]">
				<div className="flex flex-col space-y-[30px]">
					<p className="text-575555 text-12 leading-[22.2px] text-center">
						Add and manage fees for 3rd party newspaper publication
					</p>
					<div className="flex space-x-[14px] items-center justify-center">
						{tabs.map((tab, index) => (
							<button
								onClick={() => setActiveTab(tab)}
								key={index}
								className={clsx(
									'h-10 flex items-center justify-center px-[31px] rounded-3 bg-white text-black text-12',
									{
										'bg-EADAFF font-semibold !text-7108F6': tab === activeTab,
									}
								)}>
								{tab}
							</button>
						))}
					</div>
				</div>
				{activeTab === tabs[0] ? <AddNewsPaperForm /> : <ManageNewsPaperForm />}
			</div>
		</div>
	);
};

export default ThirdPartyNewsPaper;
