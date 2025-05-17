import PropTypes from 'prop-types';
import styles from './errorMessages.module.css';
import { ErrorMessage } from '@hookform/error-message';

const ErrorMessages = ({ errors, name }) => (
	<>
		<ErrorMessage
			errors={errors}
			name={name}
			render={({ messages }) =>
				messages &&
				Object.entries(messages).map(([type, message]) => (
					<p key={type} className={styles.errorMessage}>
						{message}
					</p>
				))
			}
		/>
	</>
);

ErrorMessages.propTypes = {
	errors: PropTypes.object,
};

export default ErrorMessages;
