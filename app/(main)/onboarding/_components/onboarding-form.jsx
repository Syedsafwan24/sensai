'use client';

import { updateUser } from '@/actions/user';
import { onboardingSchema } from '@/app/lib/schema';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function OnboardingForm({ industries }) {
	const [selectedIndustry, setSelectedIndustry] = useState(null);

	const router = useRouter();

	const {
		loading: updateLoading,
		fn: updateUserFn,
		data: updateResult,
	} = useFetch(updateUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(onboardingSchema),
	});

	const watchIndustry = watch('industry');
	async function onSubmit(values) {
		try {
			const formattedIndustry = `${values.industry}-${values.subIndustry
				.toLowerCase()
				.replace(/ /g, '-')}`;
			await updateUserFn({
				...values,
				industry: formattedIndustry,
			});
		} catch (e) {
			console.log('onboarding error: ', e);
		}
	}

	useEffect(() => {
		if (updateResult?.success && !updateLoading) {
			toast.success('Profile updated successfully');
			router.push('/dashboard');
			router.refresh();
		}
	}, [updateResult, updateLoading]);

	return (
		<div className='flex items-center justify-center bg-background'>
			<Card className='w-full max-w-lg mt-10 mx-2'>
				<CardHeader>
					<CardTitle className='gradient-title text-4xl'>
						Complete Your Profile
					</CardTitle>
					<CardDescription>
						Select your industry to get personalized career insights and
						recommendations.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-2'>
							<Label htmlFor='industry'>Industry</Label>
							<Select
								onValueChange={(value) => {
									setValue('industry', value);
									setSelectedIndustry(
										industries.find((ind) => ind.id === value)
									);
									setValue('subIndustry', '');
								}}
							>
								<SelectTrigger id='industry'>
									<SelectValue placeholder='Select an Industry' />
								</SelectTrigger>
								<SelectContent>
									{industries.map((ind) => {
										return (
											<SelectItem value={ind.id} key={ind.id}>
												{ind.name}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							{errors.industry && (
								<p className='text-red-500 text-sm'>
									{errors.industry.message}
								</p>
							)}
						</div>
						{watchIndustry && (
							<div className='space-y-2'>
								<Label htmlFor='subIndustry'>Specialization</Label>
								<Select
									onValueChange={(value) => setValue('subIndustry', value)}
								>
									<SelectTrigger id='subIndustry'>
										<SelectValue placeholder='Select an Industry' />
									</SelectTrigger>
									<SelectContent>
										{selectedIndustry?.subIndustries.map((ind) => {
											return (
												<SelectItem value={ind} key={ind}>
													{ind}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								{errors.subIndustry && (
									<p className='text-red-500 text-sm'>
										{errors.subIndustry.message}
									</p>
								)}
							</div>
						)}

						<div className='space-y-2'>
							<Label htmlFor='experience'>Years of Experience</Label>
							<Input
								id='experience'
								type='number'
								min='0'
								max='50'
								placeholder='Enter your years of experience'
								{...register('experience')}
							/>
							{errors.experience && (
								<p className='text-red-500 text-sm'>
									{errors.experience.message}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='skills'>Skills</Label>
							<Input
								id='skills'
								placeholder='e.g. JavaScript, React, Node.js , etc.'
								{...register('skills')}
							/>
							<p className='text-sm text-muted-foreground'>
								Separate each skill with a comma. e.g. JavaScript, React,
								Node.js
							</p>
							{errors.experience && (
								<p className='text-red-500 text-sm'>
									{errors.experience.message}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='bio'>Professional Bio</Label>
							<Textarea
								id='bio'
								placeholder='Tell us about professional background...'
								className='h-32'
								{...register('bio')}
							/>

							{errors.bio && (
								<p className='text-red-500 text-sm'>{errors.bio.message}</p>
							)}
						</div>
						<Button type='submit' className='w-full' disabled={updateLoading}>
							{updateLoading ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Saving...
								</>
							) : (
								'Complete Profile'
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default OnboardingForm;
