import HeroSection from '@/components/hero';
import FeatureSection from '@/components/landing/FeatureSection';
import Link2Dashboard from '@/components/landing/Link2Dashboard';
import Numbers from '@/components/landing/Numbers';
import Questions from '@/components/landing/Questions';
import Steps from '@/components/landing/Steps';
import Testimon from '@/components/landing/Testimon';

function page() {
	return (
		<div>
			<div className='grid-background'></div>
			<HeroSection />

			{/* features */}
			<FeatureSection />
			{/* numbers */}
			<Numbers />
			{/* how it works */}
			<Steps />
			{/* testimonial */}
			<Testimon />
			{/* questions */}
			<Questions />
			{/* link */}
			<Link2Dashboard />
		</div>
	);
}

export default page;
