import AgentPublication from 'components/agents/dashboard/AgentPublication';
import { Pagination } from 'components/general';
import { PublicationStatus } from 'interfaces/publications';
import React from 'react';

const publications: { id: string; text: string; status: PublicationStatus }[] =
	[
		{
			id: 'CON2345JHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'declined',
		},
		{
			id: 'CON2345JHFHGHIH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
		{
			id: 'CON2345JHFHGAGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'approved',
		},
		{
			id: 'CON2345JH2FHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'declined',
		},
		{
			id: 'CON2345JH4FHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
		{
			id: 'CON2345J9HFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'approved',
		},
		{
			id: 'CON23045JHFHGHGH',
			text: 'I ,formerly known as Emmanuel Martins , wish to be known and ',
			status: 'pending',
		},
	];

const AdminPublications = () => {
	return (
		<div className="bg-white border-[0.5px] rounded-[3px] border-D9D9D9 px-[18px] py-4">
			<div className="flex flex-col space-y-4">
				{publications.map((publication, index) => (
					<AgentPublication
						key={index}
						status={publication.status}
						text={publication.text}
						id={publication.id}
					/>
				))}
			</div>
			<div className="mt-[37px] flex items-center justify-center">
				<Pagination />
			</div>
		</div>
	);
};

export default AdminPublications;
