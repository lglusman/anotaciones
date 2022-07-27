import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

const createUser = () => {
	const { subscribe, set } = writable<User | null>(null);

	return {
		subscribe,
		setUser: (us: User | null) => {
			set(us);
		},
		logout: () => {
			set(null);
		}
	};
};

export const user = createUser();
