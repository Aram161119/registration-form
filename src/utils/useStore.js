import { useState } from 'react';

const initialValues = {
	email: '',
	password: '',
	confirmPassword: '',
};

const useStore = () => {
	const [state, setState] = useState(initialValues);

	return {
		updateState: (name, value) => setState((prev) => ({ ...prev, [name]: value })),
		state,
		resetState: () => setState(initialValues),
	};
};

export default useStore;
