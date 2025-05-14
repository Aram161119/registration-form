import styles from './app.module.css';
import { useStore, useValidation } from './utils';

const postRequest = async (data) => {
	console.log('Sended data', data);
};

const App = () => {
	const { resetState, updateState, getState } = useStore();
	const {
		validateEmail,
		validatePassword,
		validateConfirmPassword,
		getErrors,
		resetValidationState,
		isValid,
	} = useValidation();

	const onChange = (target) => {
		updateState(target.name, target.value);

		switch (target.name) {
			case 'email':
				!!errors.email.length && validateEmail(target.value);
				break;
			case 'password':
				!!errors.password.length && validatePassword(target.value);
				break;
			case 'confirmPassword':
				!!errors.confirmPassword.length &&
					validateConfirmPassword(target.value, password);
				break;
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		postRequest(getState());
		resetState();
		resetValidationState();
	};

	const { email, password, confirmPassword } = getState();

	const errors = getErrors();

	const disableSubmitButton = () => {
		if (!email || !password || !confirmPassword) {
			return true;
		}

		return !isValid;
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit} className={styles.form}>
				{
					<div className={styles.errorLabel}>
						{Object.entries(errors).map(([key, messages]) =>
							messages.length > 0 ? (
								<div key={key}>
									{messages.map((msg, i) => (
										<p key={i} className={styles.errorMessage}>
											{msg}
										</p>
									))}
								</div>
							) : null,
						)}
					</div>
				}
				<div className={styles.miniBlock}>
					<label htmlFor="email" className={styles.label}>
						Email *
					</label>
					<input
						type="email"
						name="email"
						placeholder="Email is required"
						value={email}
						onChange={(e) => onChange(e.target)}
						onBlur={(e) => validateEmail(e.target.value)}
					/>
				</div>
				<div className={styles.miniBlock}>
					<label htmlFor="password" className={styles.label}>
						Password *
					</label>
					<input
						type="password"
						name="password"
						placeholder="Password is required"
						value={password}
						onChange={(e) => onChange(e.target)}
						onBlur={(e) => validatePassword(e.target.value)}
					/>
				</div>

				<div className={styles.miniBlock}>
					<label htmlFor="confirmPassword" className={styles.label}>
						Confirm password *
					</label>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm password is reuqired"
						value={confirmPassword}
						onChange={(e) => onChange(e.target)}
						onBlur={(e) => validateConfirmPassword(e.target.value, password)}
					/>
				</div>
				<button type="submit" disabled={disableSubmitButton()}>
					Send
				</button>
			</form>
		</div>
	);
};

export default App;
