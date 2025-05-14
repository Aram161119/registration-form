import { useState } from 'react';

const initialValues = {
	email: [],
	password: [],
	confirmPassword: [],
};

const useValidation = () => {
	const [errors, setErrors] = useState(initialValues);

	return {
		getErrors: () => errors,
		resetValidationState: () => setErrors(initialValues),
		validateEmail: (value) => {
			let newEmailError = [];

			if (!value.length) {
				newEmailError.push('Email is required field!');
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
				newEmailError.push('Please enter a valid email (e.g. name@example.com)');
			} else if (value.length > 30) {
				newEmailError.push('Invalid email: must not exceed 30 characters.');
			} else if (value.length < 5) {
				newEmailError.push('Invalid email: must be at least 5 characters long.');
			}

			setErrors({ ...errors, email: newEmailError });
		},
		validatePassword: (value) => {
			let newPasswordError = [];

			if (!value.length) {
				newPasswordError.push('Password is required field!');
			} else if (value.length > 20) {
				newPasswordError.push('Invalid password: must not exceed 20 characters.');
			} else if (value.length < 5) {
				newPasswordError.push(
					'Invalid password: must be at least 5 characters long.',
				);
			}

			setErrors({ ...errors, password: newPasswordError });
		},
		validateConfirmPassword: (value, checkValue) => {
			let newConfirmPasswordError = [];

			if (!value.length) {
				newConfirmPasswordError.push('Confirm password is required field!');
			} else if (value !== checkValue) {
				newConfirmPasswordError.push('Passwords do not match.');
			}

			setErrors({ ...errors, confirmPassword: newConfirmPasswordError });
		},
		isValid:
			!errors.email.length &&
			!errors.password.length &&
			!errors.confirmPassword.length,
	};
};

export default useValidation;
