import EmptyState from '@/app/(site)/components/EmptyState';
import getConversationById from '@/app/actions/getConversationById';
import getMEssages from '@/app/actions/getMessages';
import type { FC } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';

interface ConversationIDProps {}

interface IParams {
	conversationId: string;
}
// eslint-disable-next-line no-empty-pattern
const ConversationID = async ({ params }: { params: IParams }) => {
	const conversation = await getConversationById(params.conversationId);
	const messages = await getMEssages(params.conversationId);

	if (!conversation) {
		return (
			<div className='lg:pl-80 h-full'>
				<div className='h-full flex flex-col'>
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className='lg:pl-80 h-full'>
			<div className='h-full flex flex-col'>
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default ConversationID;
