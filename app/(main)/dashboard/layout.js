import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';

function Layout({ children }) {
	return (
		<div className='px-5'>
			<div className='flex justify-between items-center mb-5'>
				<h1 className='text-6xl font-bold gradient-title'>Industry Insights</h1>
			</div>
			<Suspense
				fallback={<BarLoader className='mt-4' width={'100%'} color='grey' />}
			>
				{children}
			</Suspense>
		</div>
	);
}

export default Layout;
