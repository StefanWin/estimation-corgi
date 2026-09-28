const colors = {
	ink: '#24211d',
	paper: '#fffdf6',
	canvas: '#f4f0e6',
	muted: '#716a60',
	accent: '#e96840',
	accentDeep: '#9b452d',
	mustard: '#f4bf55',
	portrait: '#eebc59',
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

// Roughly two lines of the task at 28px. Truncating up front keeps the
// ellipsis predictable; lineClamp only guards against overflow.
const MAX_CARD_TASK_LENGTH = 64;

const truncate = (value: string, length: number) =>
	value.length > length ? `${value.slice(0, length - 1).trimEnd()}…` : value;

interface EstimateCardProps {
	/** Data URI of the corgi portrait. */
	imageSrc: string;
	hours: string;
	/** Sequence number shown in the ticket heading. */
	number: number;
	task: string;
	message: string | null;
}

export function EstimateCard({
	imageSrc,
	hours,
	number,
	task,
	message,
}: Readonly<EstimateCardProps>) {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				padding: '44px 56px 56px 44px',
				backgroundColor: colors.canvas,
				fontFamily: 'Geist',
				color: colors.ink,
			}}
		>
			<div
				style={{
					display: 'flex',
					flex: 1,
					border: `4px solid ${colors.ink}`,
					backgroundColor: colors.paper,
					boxShadow: `12px 12px 0 ${colors.ink}`,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 440,
						padding: 24,
						borderRight: `4px solid ${colors.ink}`,
						backgroundColor: colors.portrait,
					}}
				>
					<img
						src={imageSrc}
						alt=""
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							border: `3px solid ${colors.ink}`,
						}}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						padding: '36px 44px',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							paddingBottom: 16,
							borderBottom: `3px solid ${colors.ink}`,
							color: colors.muted,
							fontSize: 20,
							fontWeight: 600,
							letterSpacing: 2,
						}}
					>
						<span>OFFICIAL ESTIMATE</span>
						<span>NO. {String(number).padStart(3, '0')}</span>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							flex: 1,
						}}
					>
						{task && (
							<div
								style={{
									display: 'block',
									marginBottom: 12,
									fontSize: 28,
									fontWeight: 600,
									lineClamp: 2,
								}}
							>
								{truncate(task, MAX_CARD_TASK_LENGTH)}
							</div>
						)}
						<div
							style={{
								display: 'flex',
								fontSize: task ? 112 : 132,
								fontWeight: 900,
								letterSpacing: -8,
								lineHeight: 1,
							}}
						>
							{hours}
						</div>
						{message && (
							<div
								style={{
									display: 'block',
									marginTop: 20,
									color: colors.accentDeep,
									fontSize: 34,
									fontWeight: 600,
									lineHeight: 1.3,
									lineClamp: 3,
								}}
							>
								{message}
							</div>
						)}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							fontSize: 22,
							fontWeight: 600,
						}}
					>
						<span>estimation-corgi.com</span>
						<span
							style={{
								padding: '6px 14px',
								border: `3px solid ${colors.ink}`,
								backgroundColor: colors.mustard,
							}}
						>
							100% CERTAIN
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
