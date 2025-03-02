'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/dist/types/server';

export async function updateUser(data) {
	const { userId } = await auth();
	if (!userId) throw new Error('User not found');

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});
	if (!user) throw new Error('User not found');

	try {
		const result = await db.$transaction(
			async (tx) => {
				// find if industry exists
				let industryInsight = await tx.industryInsight.findUnique({
					where: {
						industry: data.industry,
					},
				});

				// if industry does not exist, create it
				if (!industryInsight) {
					industryInsight = await tx.industryInsight.create({
						data: {
							industry: data.industry,
							salaryRanges: [],
							growthRate: 0,
							demandLevel: 'Medium',
							topSkills: [],
							marketOutlook: 'neutral',
							keyTrends: [],
							recommendedSkills: [],
							nextUpdate: new Date(Date.now() + 7 * 24`*60*60*1000)`),
						},
					});
				}
			},
			{
				timeout: 10000,
			}
		);

		return result.user;
	} catch (error) {
		console.error('Error updating user', error.message);
		throw new Error('Error updating user');
	}

	return <div></div>;
}
