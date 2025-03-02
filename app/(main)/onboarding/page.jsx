import { industries } from '@/data/industries';
import OnboardingForm from './_components/onboarding-form';

function page() {
	return (
		<main>
			<OnboardingForm industries={industries} />
		</main>
	);
}

export default page;
