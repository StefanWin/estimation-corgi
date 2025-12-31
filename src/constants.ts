import blepCorgi from '../public/blep-corgi.png';
import chillaxCorgi from '../public/ChillaxCorgi.png';
import cuteCorgi from '../public/cute-corgi.png';
import fatAssCorgi from '../public/phatasscorgi.png';
import runningCorgi from '../public/running-corgi.png';

export type EstimationUnit = {
	id: string;
	name: string;
	values: (number | string)[];
	suffix?: string;
};

export const ESTIMATION_UNITS: EstimationUnit[] = [
	{
		id: 'hours',
		name: 'Hours',
		values: Array.from({ length: 40 }, (_, i) => i + 1),
		suffix: 'hours',
	},
	{
		id: 'story-points',
		name: 'Story Points',
		values: [1, 2, 3, 5, 8, 13, 21, 34],
		suffix: 'story points',
	},
	{
		id: 'fibonacci',
		name: 'Fibonacci',
		values: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
	},
	{
		id: 't-shirt',
		name: 'T-Shirt Sizes',
		values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
	},
	{
		id: 'days',
		name: 'Days',
		values: [1, 2, 3, 5, 8, 13, 21],
		suffix: 'days',
	},
];

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
];
