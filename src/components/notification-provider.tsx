import Alert, { type AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';

type Notify = (message: string, severity: AlertColor) => void;

const NotificationContext = createContext<Notify | null>(null);

export function NotificationProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	const nextId = useRef(0);
	const [notification, setNotification] = useState<{
		id: number;
		message: string;
		severity: AlertColor;
	} | null>(null);
	const [open, setOpen] = useState(false);
	const notify = useCallback<Notify>((message, severity) => {
		setNotification({ id: nextId.current++, message, severity });
		setOpen(true);
	}, []);

	return (
		<NotificationContext value={notify}>
			{children}
			{notification && (
				<Snackbar
					key={notification.id}
					open={open}
					autoHideDuration={4000}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					onClose={(_, reason) => {
						if (reason !== 'clickaway') setOpen(false);
					}}
				>
					<Alert
						severity={notification.severity}
						variant="filled"
						onClose={() => setOpen(false)}
					>
						{notification.message}
					</Alert>
				</Snackbar>
			)}
		</NotificationContext>
	);
}

export function useNotification() {
	const notify = useContext(NotificationContext);
	if (!notify)
		throw new Error('useNotification must be used within NotificationProvider');
	return notify;
}
