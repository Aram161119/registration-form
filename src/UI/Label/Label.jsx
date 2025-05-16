import styles from './label.module.css';

const Label = ({ children, name }) => {
	return (
		<label htmlFor={name} className={styles.label}>
			{children}
		</label>
	);
};

export default Label;
