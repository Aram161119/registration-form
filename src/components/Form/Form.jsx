import styles from './form.module.css';
import { useForm } from 'react-hook-form';
import Label from '@/UI/Label/Label';
import ErrorMessages from '@/components/ErrorMessages/ErorMessages';
import { useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const postRequest = async (data) => {
	console.log('Sent data', data);
};

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email address')
		.min(5, 'Email must be at least 5 characters')
		.max(30, 'Email must be 30 characters max')
		.required('Email is required'),
	password: yup
		.string()
		.min(4, 'Password must be at least 4 characters')
		.max(20, 'Password must be 20 characters max')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords do not match')
		.required('Confirm password is required'),
});

const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
		watch,
		trigger,
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: yupResolver(schema),
	});

	const submitRef = useRef(null);

	const password = watch('password');

	useEffect(() => {
		trigger('confirmPassword');
	}, [password]);

	useEffect(() => {
		if (isValid) {
			setTimeout(() => {
				submitRef.current?.focus();
			}, 0);
		}
	}, [isValid]);

	const onSubmit = (data) => {
		postRequest(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
			<Label name={'email'}>Email</Label>
			<input type="email" placeholder="Email is required" {...register('email')} />
			{touchedFields.email && <ErrorMessages errors={errors} name="email" />}
			<Label name={'password'}>Password</Label>
			<input
				type="password"
				placeholder="Password is required"
				{...register('password')}
			/>
			{touchedFields.password && <ErrorMessages errors={errors} name="password" />}
			<Label name={'confirmPassword'}>Confirm password</Label>
			<input
				type="password"
				placeholder="Confirm password is required"
				{...register('confirmPassword')}
			/>
			{touchedFields.confirmPassword && (
				<ErrorMessages errors={errors} name="confirmPassword" />
			)}
			<button ref={submitRef} type="submit" disabled={!isValid}>
				Send
			</button>
		</form>
	);
};

export default Form;
