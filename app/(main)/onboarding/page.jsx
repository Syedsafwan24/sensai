import { industries } from '@/data/industries';
import OnboardingForm from './_components/onboarding-form';
import { getUserOnBoardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

async function Onboardingpage() {
	const { isOnboarded } = await getUserOnBoardingStatus();
	if (isOnboarded) {
		redirect('/dashboard');
	}
	return (
		<main>
			<OnboardingForm industries={industries} />
		</main>
	);
}

export default Onboardingpage;
