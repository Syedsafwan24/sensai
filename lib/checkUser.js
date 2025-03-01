import { currentUser } from '@clerk/nextjs/dist/types/server';
import { db } from './prisma';

export const checkUser = async () => {
	const user = await currentUser();
	if (!user) {
		return null;
	}
	try {
		const loggedInUser = await db.user.findUnique({
			where: {
				cleckUserId: user.id,
			},
		});
		if (loggedInUser) {
			return loggedInUser;
		}

		const name = `${user.firstName} ${user.lastName}`;
		const newUser = await db.user.create({
			data: {
				cleckUserId: user.id,
				name,
				imageUrl: user.imageUrl,
				email: user.emailAddresses[0].emailAddress,
			},
		});

		return newUser;
	} catch (e) {
		console.log(e);
	}
};
