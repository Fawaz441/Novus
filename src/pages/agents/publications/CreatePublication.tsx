import { Wrapper } from 'components/agents/navigation';
import { PublicationCreationSteps } from 'components/publications';
import React, { useState } from 'react';
import clsx from 'classnames';
import { ChangeOfNameForm } from 'components/agents/publications';

const forms = [
	{ name: 'change_of_name', text: 'Change Of Name' },
	{ name: 'loss_of_documents', text: 'Loss of Documents' },
	{ name: 'obituary', text: 'Obituary' },
	{ name: 'affidavit', text: 'Affidavit' },
];

const CreatePublication = () => {
	const [activeForm, setActiveForm] = useState(forms[0]);
	return (
		<Wrapper>
			<div className="mt-7 flex flex-col space-y-[47px]">
				<PublicationCreationSteps isAgent activeStep="fill_forms" />
			</div>
			<div className="flex space-x-[122px] mt-[47px]">
				<div className="flex flex-col space-y-[30px] ml-[-33px]">
					{forms.map((form) => (
						<button
							key={form.name}
							className={clsx(
								'h-[24px] border-l-[7px] border-l-transparent px-[30px] text-sm leading-[18.2px] text-black text-left',
								{
									'!border-l-7108F6': form.name === activeForm.name,
								}
							)}
							onClick={() => {
								if (activeForm.name !== form.name) {
									setActiveForm(form);
								}
							}}
						>
							{form.text}
						</button>
					))}
				</div>
				<div>
					{activeForm.name === 'change_of_name' && <ChangeOfNameForm />}
				</div>
			</div>
		</Wrapper>
	);
};

export default CreatePublication;
