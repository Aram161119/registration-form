import { useRef, useState } from 'react';
import { useStore, useValidation } from '@/utils';
import ErrorMessages from '@/components/ErrorMessages/ErorMessages';
import styles from './form.module.css';
import Label from '@/UI/Label/Label';

const postRequest = async (data) => {
	console.log('Sent data', data);
};

const validationSchema = {
	email: {
		validation: 'required|email|min:5|max:30',
		messages: {
			required: 'Email is required',
			email: 'Please enter a valid email address',
			min: 'Email must be at least 4 characters',
			max: 'Email must be 30 characters max',
		},
	},
	password: {
		validation: 'required|min:4|max:20|match:confirmPassword',
		messages: {
			required: 'Password is required',
			min: 'Password must be at least 4 characters',
			max: 'Password must be 30 characters max',
		},
	},
	confirmPassword: {
		validation: 'required|match:password',
		messages: {
			required: 'Please confirm your password',
			match: 'Passwords do not match',
		},
	},
};

const Form = () => {
	const buttonRef = useRef(null);
	const [showErrors, setShowErrors] = useState({
		email: false,
		password: false,
		confirmPassword: false,
	});

	const { resetState, updateState, state } = useStore();
	const { errors, validateField, clearErrors, isValid } =
		useValidation(validationSchema);

	const { email, password, confirmPassword } = state;
	const formHasEmptyField = !email || !password || !confirmPassword;

	const handleChange = ({ name, value }) => {
		const { isValidForm: isValidForm } = validateField(name, value, state);

		if (!formHasEmptyField && isValidForm) {
			clearErrors();

			// Use setTimeout to wait for DOM updates,
			// otherwise focus() might be called before the element is rendered
			setTimeout(() => {
				buttonRef.current?.focus();
			}, 0);
		}

		updateState(name, value);
	};

	const showError = (name) => {
		const newArr = {};
		newArr[name] = true;

		setShowErrors({ ...showErrors, ...newArr });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postRequest(state);
		resetState();
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form} noValidate>
			{showErrors?.email && <ErrorMessages errors={errors?.email ?? []} />}
			<div className={styles.miniBlock}>
				<Label name={'email'}>Email *</Label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email is required"
					value={email}
					onChange={(e) => handleChange(e.target)}
					onBlur={(e) => showError(e.target.name)}
				/>
			</div>

			<div className={styles.miniBlock}>
				{showErrors?.password && (
					<ErrorMessages errors={errors?.password ?? []} />
				)}
				<Label name={'Password'}>Password *</Label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Password is required"
					value={password}
					onChange={(e) => handleChange(e.target)}
					onBlur={(e) => showError(e.target.name)}
				/>
			</div>

			<div className={styles.miniBlock}>
				{showErrors?.confirmPassword && (
					<ErrorMessages errors={errors?.confirmPassword ?? []} />
				)}
				<Label name={'confirmPassword'}>Confirm Password *</Label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					placeholder="Confirm password is required"
					value={confirmPassword}
					onChange={(e) => handleChange(e.target)}
					onBlur={(e) => showError(e.target.name)}
				/>
			</div>

			<button
				ref={buttonRef}
				type="submit"
				disabled={formHasEmptyField || !isValid}
			>
				Send
			</button>
		</form>
	);
};

export default Form;
