import { Wrapper } from 'components/admin/navigation';
import { Outlet } from 'react-router-dom';
import AdminSummaryCards from 'components/admin/dashboard/AdminSummaryCard';


const AdminAgentOutlet = () => {
	return (
		<Wrapper>
			<div className="flex flex-col space-y-[37.38px] pt-[50px]">
				<AdminSummaryCards/>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</Wrapper>
	);
};

export default AdminAgentOutlet;
