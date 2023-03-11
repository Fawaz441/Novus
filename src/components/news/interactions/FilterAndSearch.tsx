import React from 'react';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';

const FilterAndSearch: React.FC = () => (
	<div className="flex left-[239px] top-[90px] fixed h-[90px] bg-white w-full pr-12 items-center z-[12]">
		<div className="flex items-center space-x-[100px] w-full">
			<div className="flex items-center space-x-3">
				<div className="flex flex-col space-y-[7px]">
					<span className="text-boldGrey text-12 font-medium">Filter by</span>
					<div className="h-12 w-[291px] flex items-center px-[15px] bg-gray rounded-6">
						<input
							placeholder="Publication Type"
							className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-faintGray text-black text-12 font-medium"
						/>
						<button
							className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
							type="button"
						>
							<Filter className="fill-green stroke-border" />
						</button>
					</div>
				</div>
				<div className="flex flex-col space-y-[7px]">
					<span className="text-boldGrey text-12 font-medium opacity-0 pointer-events-none">
						Filter by
					</span>
					<div className="h-12 w-[170px] flex items-center px-3 bg-gray rounded-6">
						<input
							placeholder="Duration"
							className="border-none w-full outline-none bg-transparent flex-1 placeholder:text-faintGray text-black text-12 font-medium"
						/>
						<button
							className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
							type="button"
						>
							<Filter className="fill-[#FBBC05] stroke-white" />
						</button>
					</div>
				</div>
			</div>
			<div className="flex items-center space-x-[46px] flex-1">
				<div className="flex flex-col space-y-[7px] max-w-[400px] flex-1">
					<span className="text-12 font-medium text-boldGray">Search By</span>
					<div className="h-12 w-full flex items-center px-[15px] bg-gray rounded-6">
						<input
							placeholder="Lands in Epe"
							className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-faintGray text-black text-12 font-medium"
						/>
						<button
							className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
							type="button"
						>
							<Filter className="fill-green stroke-border" />
						</button>
					</div>
				</div>
				<div className="flex flex-col space-y-[7px]">
					<span className="text-12 font-medium text-boldGray opacity-0 pointer-events-none">
						Search By
					</span>
					<div className="h-12 w-[52px] flex-shrink-0 flex items-center justify-center bg-[#ECEEF2] rounded">
						<Search />
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default FilterAndSearch;
