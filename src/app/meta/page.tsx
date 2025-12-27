import type { Metadata } from 'next';
import { MetaContent } from './meta-content';

export const metadata: Metadata = {
	title: 'Available Messages & Images',
	description: 'List of all approved estimation messages and corgi images',
};

export default function Meta() {
	return <MetaContent />;
}
