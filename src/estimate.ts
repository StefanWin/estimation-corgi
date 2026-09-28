import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';

export const MAX_TASK_LENGTH = 80;

export const normalizeTask = (value: string) =>
	value.trim().replaceAll(/\s+/g, ' ').slice(0, MAX_TASK_LENGTH);

export const formatHours = (valueIndex: number) =>
	`${ESTIMATION_HOURS[valueIndex]} hours`;

export const formatEstimate = (
	task: string,
	displayValue: string,
	message: string,
) =>
	task
		? `${task}: ${displayValue} - ${message}`
		: `${displayValue} - ${message}`;

const parseIndex = (value: string | null, length: number) => {
	if (value === null || !/^\d+$/.test(value)) return undefined;
	const index = Number.parseInt(value, 10);
	return index < length ? index : undefined;
};

/** The estimate encoded in a share link (`?i=&m=&v=&t=`). */
export interface SharedEstimate {
	imageIndex: number | undefined;
	messageId: string | null;
	task: string;
	valueIndex: number | undefined;
}

export const parseSharedEstimate = (
	searchParams: URLSearchParams,
): SharedEstimate => ({
	imageIndex: parseIndex(searchParams.get('i'), CORGI_IMAGES.length),
	messageId: searchParams.get('m'),
	task: normalizeTask(searchParams.get('t') ?? ''),
	valueIndex: parseIndex(searchParams.get('v'), ESTIMATION_HOURS.length),
});
