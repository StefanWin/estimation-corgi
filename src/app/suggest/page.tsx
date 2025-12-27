import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SuggestForm } from './suggest-form';

export const metadata: Metadata = {
	title: 'Suggest a message',
	description: 'Suggest a new estimation message for the corgi',
};

export default function SuggestPage() {
	return (
		<Suspense>
			<SuggestForm />
		</Suspense>
	);
}
