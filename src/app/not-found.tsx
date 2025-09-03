import NextLink from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.css';
import notFoundImage from '../../public/404.jpg';

export default function NotFound() {
	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<h4>404 - not found</h4>
			<Image
				suppressHydrationWarning
				className={styles.image}
				src={notFoundImage}
				alt="corgi"
				loading="lazy"
				sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
			/>
			<NextLink href={'/'}>go home</NextLink>
		</div>
	);
}
