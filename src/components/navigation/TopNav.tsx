import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as NigerianFlag } from 'assets/icons/nigerian-flag.svg';
import { ReactComponent as Check } from 'assets/icons/publications/check.svg';
import { ReactComponent as Add } from 'assets/icons/publications/add.svg';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'classnames';
import { toggleHiddenElement } from 'utils/ui-functions';
import { useModal } from 'hooks';
import { MODALS, routes } from 'utils/constants';
interface TopNavProps {
	showPublicationsButton?: boolean;
	isPublications?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({
	showPublicationsButton,
	isPublications,
}) => {
	const publicationButtonRef = useRef<HTMLDivElement>(null);
	const [fetched, setFetched] = useState(false);
	const { showModal } = useModal();
	const navigate = useNavigate();

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
			<div className="fixed w-full left-0 top-0 h-[90px] flex items-center pr-[38px] z-[12] bg-white">
				<div className="w-[199px] pl-[52px]">
					<Link to={routes.home}>
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
							<Link to={routes.agents.login}>
								<span className="font-semibold text-08F692 text-sm">Agent</span>
							</Link>
						</li>
					</ul>
					<div className="flex items-center">
						<div
							className={clsx(
								'w-[149px] h-[37px] flex items-center justify-center bg-7108F62 rounded-6',
								{ '!bg-transparent': showPublicationsButton }
							)}
						>
							<span className="text-7108F6 font-bold text-12">News Feed</span>
						</div>
						<div className="w-[149px] h-[37px] flex items-center justify-center bg-white rounded-6">
							<span className="text-black font-medium text-12">
								Classified Ads
							</span>
						</div>
						{showPublicationsButton && (
							<div
								className="ml-[30px] extra:ml-[97px] relative"
								id="publication-button-wrapper"
								ref={publicationButtonRef}
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										if (!isPublications) {
											navigate(routes.change_of_name_publications);
										} else {
											toggleHiddenElement('.topnav-publication-actions');
										}
									}}
									className="bg-7108F6 rounded-6 h-10 w-[150px] text-white font-bold text-10"
								>
									PUBLICATION
								</button>
							</div>
						)}
					</div>
					<div className="flex items-center space-x-[11px]">
						<NigerianFlag />
						<span className="font-bold text-12 text-black">
							Thursday, 3rd March, 2023
						</span>
					</div>
				</div>
			</div>
			{fetched && (
				<div
					style={getPublicationsActionsStyles()}
					className="flex transition-all duration-300 opacity-0 pointer-vents-none translate-x-[10px] translate-y-[10px] pr-[11px] pl-[23px] items-center justify-between fixed topnav-publication-actions bg-white border-[#CFCFCF] border-[0.5px] rounded-6 w-[308px] h-[45px] z-[100]"
				>
					<button
						className="items-center space-x-2 flex"
						onClick={() => showModal(MODALS.CHECK_PUBLICATIONS)}
					>
						<span className="text-black text-10 font-medium">
							Check Publication
						</span>
						<Check className="stroke-black" />
					</button>
					<button
						className="items-center space-x-2 flex"
						onClick={() => navigate(routes.pub_forms.change_of_name)}
					>
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
