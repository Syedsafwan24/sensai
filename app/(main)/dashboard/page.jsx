import { getUserOnBoardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

async function page() {
	const { isOnboarded } = await getUserOnBoardingStatus();
	if (!isOnboarded) {
		redirect('/onboarding');
	}
	return <div>Industry Insights</div>;
}

export default page;
