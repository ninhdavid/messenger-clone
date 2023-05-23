import Sidebar from '../(site)/components/Sidebar/SideBar';
import getConversations from '../actions/getConversations';
import ConversationList from './components/ConversationList';

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getConversations();
	return (
		//@ts-expect-error  @server component
		<Sidebar>
			<div className='h-full'>
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}
