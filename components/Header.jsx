import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
	return (
		<header>
			<nav>
				<Link href='/'>
					<Image src='/logo.png' width={200} height={60} alt='Sensai Logo' />
				</Link>
			</nav>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</header>
	);
}

export default Header;
