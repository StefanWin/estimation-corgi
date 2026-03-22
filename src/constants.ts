import blepCorgi from '../public/blep-corgi.webp';
import chillaxCorgi from '../public/ChillaxCorgi.webp';
import cuteCorgi from '../public/cute-corgi.webp';
import dabbingCorgi from '../public/dabbing-corgi.webp';
import laptopCorgi from '../public/laptop-corgi.webp';
import fatAssCorgi from '../public/phatasscorgi.webp';
import runningCorgi from '../public/running-corgi.webp';
import sadCorgi from '../public/sad-corgi.webp';

export const ESTIMATION_HOURS = Array.from(
	{ length: 40 },
	(_, index) => index + 1,
);

export const CORGI_IMAGES = [
	{
		id: 'fat-ass-corgi',
		src: fatAssCorgi,
		alt: 'A round and happy corgi',
		attribution: null,
	},
	{
		id: 'chillax-corgi',
		src: chillaxCorgi,
		alt: 'A relaxed corgi laying down',
		attribution: null,
	},
	{
		id: 'running-corgi',
		src: runningCorgi,
		alt: 'A fast running corgi',
		attribution: {
			name: 'Corgi PNG',
			href: 'https://www.pngmart.com/image/169777/png/169776',
		},
	},
	{
		id: 'cute-corgi',
		src: cuteCorgi,
		alt: 'A cute looking corgi',
		attribution: {
			name: 'Cute Corgi PNG',
			href: 'https://www.pngmart.com/image/169825/png/169824',
		},
	},
	{
		id: 'blep-corgi',
		src: blepCorgi,
		alt: 'A corgi sticking its tongue out',
		attribution: {
			name: 'Blep Corgi PNG',
			href: 'https://www.pngmart.com/image/169829/png/169828',
		},
	},
	{
		id: 'laptop-corgi',
		src: laptopCorgi,
		alt: 'A corgi sitting in front of a laptop',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'sad-corgi',
		src: sadCorgi,
		alt: 'A corgi sitting at a desk looking at a monitor',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'dabbing-corgi',
		src: dabbingCorgi,
		alt: 'A corgi dabbing',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
];
