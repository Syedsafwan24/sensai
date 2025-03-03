'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

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

				const updatedUser = await tx.user.update({
					where: {
						id: user.id,
					},
					data: {
						industry: data.industry,
						experience: data.experience,
						bio: data.bio,
						skills: data.skills,
					},
				});

				return { updatedUser, industryInsight };
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
}

export async function getUserOnBoardingStatus() {
	const { userId } = await auth();
	if (!userId) throw new Error('User not found');

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});
	if (!user) throw new Error('User not found');

	try {
		const user = await db.user.findUnique({
			where: {
				clerkUserId: userId,
			},
			select: {
				industry: true,
			},
		});

		return {
			isOnboarded: !!user.industry,
		};
	} catch (error) {
		console.error('Error getting user onboarding status', error.message);
		throw new Error('Error getting user onboarding status');
	}
}
