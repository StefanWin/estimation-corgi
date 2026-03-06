'use client';

import NextLink, { type LinkProps } from 'next/link';
import {
	type AnchorHTMLAttributes,
	type FocusEvent,
	forwardRef,
	type MouseEvent,
	type TouchEvent,
	useState,
} from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
	LinkProps;

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
	{ onFocus, onMouseEnter, onTouchStart, prefetch, ...props },
	ref,
) {
	const [intentDetected, setIntentDetected] = useState(false);
	const intentPrefetch = prefetch ?? (intentDetected ? null : false);

	const handleIntent = () => {
		if (!intentDetected) {
			setIntentDetected(true);
		}
	};

	return (
		<NextLink
			{...props}
			ref={ref}
			prefetch={intentPrefetch}
			onFocus={(event: FocusEvent<HTMLAnchorElement>) => {
				handleIntent();
				onFocus?.(event);
			}}
			onMouseEnter={(event: MouseEvent<HTMLAnchorElement>) => {
				handleIntent();
				onMouseEnter?.(event);
			}}
			onTouchStart={(event: TouchEvent<HTMLAnchorElement>) => {
				handleIntent();
				onTouchStart?.(event);
			}}
		/>
	);
});
