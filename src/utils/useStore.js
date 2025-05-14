import { useState } from 'react';

const initialValues = {
	email: '',
	password: '',
	confirmPassword: '',
};

const useStore = () => {
	const [state, setState] = useState(initialValues);

	return {
		updateState: (name, value) => setState({ ...state, [name]: value }),
		getState: () => state,
		resetState: () => setState(initialValues),
	};
};

export default useStore;
