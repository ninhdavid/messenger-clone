import prisma from '@/app/libs/prismadb';

const getMEssages = async (conversationID: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: { conversationId: conversationID },
			include: { sender: true, seen: true },
			orderBy: { createdAt: 'asc' },
		});
		return messages;
	} catch (err: any) {
		return [];
	}
};

export default getMEssages;
