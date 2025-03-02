import { Button } from '@/components/ui/button';
import Link from 'next/link';

function notFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[100vh] px-4 text-center'>
			<h1 className='text-6xl font-bold gradient-title mb-4'>404</h1>
			<h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
			<p className='text-gray-600 mb-8'>
				Oops! The Page You're looking for doesn't exist or has been removed.
			</p>
			<Link href='/'>
				<Button>Return Home</Button>
			</Link>
		</div>
	);
}

export default notFound;
