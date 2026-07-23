import { type AnchorHTMLAttributes, forwardRef } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	prefetch?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
	{ prefetch: _prefetch, ...props },
	ref,
) {
	return <a {...props} ref={ref} />;
});
