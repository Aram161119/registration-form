import PropTypes from 'prop-types';
import styles from './errorMessages.module.css';

const ErrorMessages = ({ errors }) => (
	<>
		{errors.length > 0
			? errors.map((message, index) => (
					<div key={index}>
						<p key={index} className={styles.errorMessage}>
							{Object.values(message)[0]}
						</p>
					</div>
				))
			: null}
	</>
);

ErrorMessages.propTypes = {
	errors: PropTypes.object,
};

export default ErrorMessages;
