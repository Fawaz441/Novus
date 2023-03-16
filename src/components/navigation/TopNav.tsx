import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as NigerianFlag } from 'assets/icons/nigerian-flag.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { ReactComponent as Add } from 'assets/icons/publications/add.svg';
import { Link } from 'react-router-dom';
import { toggleHiddenElement } from 'utils/ui-functions';
interface TopNavProps {
	isPublications?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ isPublications }) => {
	const publicationButtonRef = useRef<HTMLDivElement>(null);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		setFetched(true);
	}, []);

	const getPublicationsActionsStyles = () => {
		if (!fetched) {
			setFetched(true);
		}
		return {
			left: `${(publicationButtonRef.current?.offsetLeft || 0) - 158}px`,
			top: `${(publicationButtonRef.current?.offsetTop || 0) + 45}px`,
		};
	};

	return (
		<div>
			<div className="fixed w-full left-0 top-0 h-[90px] flex items-center pr-[38px] z-[12] bg-white max-w-extra">
				<div className="w-[199px] pl-[52px]">
					<Link to="/">
						<h4 className="uppercase font-bold text-black text-base">NOVUS</h4>
					</Link>
				</div>
				<div className="flex-1 flex items-center justify-between px-11">
					<ul className="flex items-center space-x-10">
						<li>
							<span className="font-medium text-black text-sm">
								About Novus
							</span>
						</li>
						<li>
							<span className="font-medium text-black text-sm">Products</span>
						</li>
						<li>
							<span className="font-semibold text-green text-sm">Agent</span>
						</li>
					</ul>
					<div className="flex items-center">
						<div className="w-[149px] h-[37px] flex items-center justify-center bg-primary2 rounded-6">
							<span className="text-primary font-bold text-12">News Feed</span>
						</div>
						<div className="w-[149px] h-[37px] flex items-center justify-center bg-white rounded-6">
							<span className="text-black font-medium text-12">
								Classified Ads
							</span>
						</div>
						{isPublications && (
							<div
								className="ml-[30px] extra:ml-[97px] relative"
								id="publication-button-wrapper"
								ref={publicationButtonRef}
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										toggleHiddenElement('.topnav-publication-actions');
									}}
									className="bg-primary rounded-6 h-10 w-[150px] text-white font-bold text-10"
								>
									PUBLICATION
								</button>
							</div>
						)}
					</div>
					<div className="flex items-center space-x-[11px]">
						<NigerianFlag />
						<span className="font-oswald font-regular text-12 text-black">
							Thursday, 3rd March, 2023
						</span>
					</div>
				</div>
			</div>
			{isPublications && fetched && (
				<div
					style={getPublicationsActionsStyles()}
					className="flex transition-all duration-300 opacity-0 pointer-vents-none translate-x-[10px] translate-y-[10px] pr-[11px] pl-[23px] items-center justify-between fixed topnav-publication-actions bg-white border-[#CFCFCF] border-[0.5px] rounded-6 w-[308px] h-[45px] z-[100]"
				>
					<button className="items-center space-x-2 flex">
						<span className="text-black text-10 font-medium">
							Check Publication
						</span>
						<Check />
					</button>
					<button className="items-center space-x-2 flex">
						<span className="text-black text-10 font-medium">
							Create Publication
						</span>
						<Add />
					</button>
				</div>
			)}
		</div>
	);
};

export default TopNav;
