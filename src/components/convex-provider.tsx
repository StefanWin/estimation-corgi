'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import type { ReactNode } from 'react';
import { env } from '@/env';

const convex = new ConvexReactClient(env.VITE_CONVEX_URL);

export function ConvexClientProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
