import blepCorgi from './assets/blep-corgi.webp';
import chillaxCorgi from './assets/ChillaxCorgi.webp';
import cuteCorgi from './assets/cute-corgi.webp';
import dabCorgi1 from './assets/dab-corgi-1.webp';
import dabCorgi2 from './assets/dab-corgi-2.webp';
import dabCorgi3 from './assets/dab-corgi-3.webp';
import laptopCorgi from './assets/laptop-corgi.webp';
import officeCorgi1 from './assets/office-corgi-1.webp';
import officeCorgi2 from './assets/office-corgi-2.webp';
import officeCorgi3 from './assets/office-corgi-3.webp';
import officeCorgi4 from './assets/office-corgi-4.webp';
import officeCorgi5 from './assets/office-corgi-5.webp';
import officeCorgi6 from './assets/office-corgi-6.webp';
import fatAssCorgi from './assets/phatasscorgi.webp';
import runningCorgi from './assets/running-corgi.webp';

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
		alt: 'A smiling corgi wearing glasses and using a laptop',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'office-corgi-1',
		src: officeCorgi1,
		alt: 'A corgi standing on a conference room table',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'office-corgi-2',
		src: officeCorgi2,
		alt: 'A corgi working on a laptop in an office',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'office-corgi-3',
		src: officeCorgi3,
		alt: 'A corgi reviewing color swatches at a desk',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'office-corgi-4',
		src: officeCorgi4,
		alt: 'A corgi presenting charts in a boardroom',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'office-corgi-5',
		src: officeCorgi5,
		alt: 'A corgi monitoring dashboards in a control room',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'office-corgi-6',
		src: officeCorgi6,
		alt: 'A corgi working at multiple monitors in a server room',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'dab-corgi-1',
		src: dabCorgi1,
		alt: 'A corgi dabbing in a modern office lobby',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'dab-corgi-2',
		src: dabCorgi2,
		alt: 'A corgi in a vest dabbing in a conference room',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
	{
		id: 'dab-corgi-3',
		src: dabCorgi3,
		alt: 'A corgi dabbing in a high-tech control room',
		attribution: {
			name: 'generated with ChatGPT',
			href: 'https://chatgpt.com',
		},
	},
];
