import styles from './app.module.css';
import Form from './components/Form/Form';

const AppLayout = () => {
	return (
		<div className={styles.app}>
			<Form />
		</div>
	);
};

export default AppLayout;
