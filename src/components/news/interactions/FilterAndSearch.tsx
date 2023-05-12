import React from 'react';
import clsx from 'classnames';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';

interface FilterAndSearchProps {
	searchPlaceholder?: string;
	searchIconClassName?: string;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({
	searchPlaceholder,
	searchIconClassName,
}) => (
	<div className="flex left-0 mini:left-[239px] px-[26px] mini:px-0 top-[60px] mini:top-[90px] fixed h-[90px] bg-white w-full mini:pr-12 1235px:items-center z-[12]">
		<div className="flex 1235px:items-center w-full mid:flex-col mid:space-y-5  1235px:flex-row 1235px:space-x-[100px] 1235px:space-y-0">
			<div className="flex items-center space-x-[10px] 550px:space-x-3 flex-1 mid:flex-none">
				<div className="flex flex-col space-y-[7px] flex-1 550px:flex-none">
					<span className="text-575555 text-12 font-medium hidden 550px:block">
						Filter by
					</span>
					<div className="h-12 w-full 550px:w-[291px] flex items-center px-[15px] bg-F9F9F9 rounded-6">
						<input
							placeholder="Publication Type"
							className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-9B9B9B text-black text-12 font-medium"
						/>
						<button
							className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
							type="button">
							<Filter className="fill-08F692 stroke-EEEEEE" />
						</button>
					</div>
				</div>
				<div className="flex flex-col space-y-[7px] flex-1 550px:flex-none">
					<span className="text-575555 text-12 font-medium opacity-0 pointer-events-none hidden 550px:block">
						Filter by
					</span>
					<div className="h-12 w-full 550px:w-[170px] flex items-center px-3 bg-F9F9F9 rounded-6">
						<input
							placeholder="Duration"
							className="border-none w-full outline-none bg-transparent flex-1 placeholder:text-9B9B9B text-black text-12 font-medium"
						/>
						<button
							className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
							type="button">
							<Filter className="fill-FBBC05 stroke-white" />
						</button>
					</div>
				</div>
			</div>
			<div className="hidden items-center space-x-[46px] flex-1 mini:flex">
				<div className="flex flex-col space-y-[7px] max-w-[400px] flex-1">
					<span className="text-12 font-medium text-575555">Search By</span>
					<div className="h-12 w-full flex items-center px-[15px] bg-F9F9F9 rounded-6">
						<input
							placeholder={searchPlaceholder ?? 'Lands in Epe'}
							className="w-full border-none outline-none bg-transparent flex-1 placeholder:text-9B9B9B text-black text-12 font-medium"
						/>
						<button
							className="border-none outline-none h-7 w-7 bg-white rounded-[3px] flex-shrink-0 flex items-center justify-center"
							type="button">
							<Filter
								className={clsx(
									'fill-7108F6 stroke-EEEEEE',
									searchIconClassName
								)}
							/>
						</button>
					</div>
				</div>
				<div className="flex flex-col space-y-[7px]">
					<span className="text-12 font-medium text-575555 opacity-0 pointer-events-none">
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
