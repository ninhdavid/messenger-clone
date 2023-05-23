import Sidebar from '../(site)/components/Sidebar/SideBar';
import getUser from '../actions/getUsers';
import UserList from './UserList';

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const users = await getUser();

	return (
		//@ts-expect-error Server Component
		<Sidebar>
			<div className='h-full'>
				<UserList items={users} />
				{children}
			</div>
		</Sidebar>
	);
}
