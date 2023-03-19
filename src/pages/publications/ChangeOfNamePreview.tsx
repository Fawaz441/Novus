import { Wrapper } from 'components/navigation';
import { ReactComponent as PublicationSample } from 'assets/images/publications/sample.svg';
import { ReactComponent as Camera } from 'assets/images/publications/camera.svg';
import React, { useEffect } from 'react';
import { PublicationCreationSteps } from 'components/publications';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const ChangeOfNamePreview = () => {
	const navigate = useNavigate();
	const { new_con_publication } = useSelector(
		(state: RootState) => state.publications
	);

	useEffect(() => {
		if (!new_con_publication) {
			navigate(-1);
		}
	}, [navigate, new_con_publication]);

	const getTitle = () =>
		new_con_publication?.gender === 'female' ? 'Mrs' : 'Mr';

	return (
		<Wrapper isPublications showPublicationsButton={false}>
			<PublicationCreationSteps active_step="preview" />
			<div className="mt-[33px] flex space-x-[31px]">
				<div className="flex-shrink-0 h-[175px] w-[169px] bg-F4F4F4 flex flex-col items-center justify-center space-y-[14.91px]">
					<Camera />
					<p className="max-w-[82px] text-12 text-center text-black">
						Passport Photograph
					</p>
				</div>
				<div>
					<h3 className="font-medium text-xl leading-[23.48px] text-black">
						<span className="font-bold">CHANGE OF NAME :</span> {getTitle()}{' '}
						{new_con_publication?.old_first_name}{' '}
						{new_con_publication?.old_last_name}
					</h3>
					<div className="flex items-center justify-between mt-[21px] mb-[23px]">
						<div className="flex items-center space-x-10">
							<div className="flex items-center space-x-[7px]">
								<span className="text-12 leading-[14.09px] text-black">
									Date :
								</span>
								<span className="text-sm font-bold leading-[16.44px] text-575555">
									13 Jan 2023
								</span>
							</div>
							<div className="flex items-center space-x-[7px]">
								<span className="text-12 leading-[14.09px] text-black">
									By :
								</span>
								<span className="text-sm font-bold leading-[16.44px] text-575555">
									Novus News
								</span>
							</div>
							<div className="flex items-center space-x-[7px]">
								<span className="text-12 leading-[14.09px] text-black">
									Paper :
								</span>
								<span className="text-sm font-bold leading-[16.44px] text-575555">
									Vanguard, 4 weeks from approval
								</span>
							</div>
						</div>
						<div className="flex items-center space-y-2 flex-col 2xl:flex-row 2xl:space-x-2 2xl:space-y-0">
							<button
								type="button"
								onClick={() => navigate(routes.pub_forms.change_of_name)}
								className=" text-575555 font-semibold text-12 py-[10px] px-[35px] rounded-3 bg-EEEEEE flex items-center justify-center"
							>
								Edit Publication
							</button>
							<button
								type="button"
								onClick={() => navigate(routes.pub_forms.payment)}
								className=" text-white font-semibold ml-6 text-12 py-[10px] px-[35px] rounded-3 bg-08F692 flex items-center justify-center"
							>
								Confirm Publication
							</button>
						</div>
					</div>
					<p className="max-w-[960px] text-black leading-6">
						“I, formerly known and addressed as {getTitle()}{' '}
						{new_con_publication?.old_first_name}{' '}
						{new_con_publication?.old_middle_name}{' '}
						{new_con_publication?.old_last_name}, henceforth wish to be known
						and addressed as {getTitle()}. {new_con_publication?.new_first_name}{' '}
						{new_con_publication?.new_middle_name}
						{new_con_publication?.new_last_name}. All former documents remain
						valid. {new_con_publication?.concerned_parties} and the general
						public to take note”
					</p>
				</div>
			</div>
			<div className="mt-8 flex mb-8">
				<PublicationSample className="flex-shrink-0" />
			</div>
		</Wrapper>
	);
};

export default ChangeOfNamePreview;
