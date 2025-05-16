import { useState } from 'react';

// Default error messages
const defaultMessages = {
	required: 'This field is required',
	min: (param) => `Minimum ${param} characters required`,
	max: (param) => `Maximum ${param} characters allowed`,
	email: 'Invalid email address',
	match: 'Values do not match',
};

// Built-in validators
const validators = {
	required: (value) => !!value,
	min: (value, param) => value?.length >= Number(param),
	max: (value, param) => value?.length <= Number(param),
	email: (value) => /\S+@\S+\.\S+/.test(value),
	match: (value, param, allValues) => {
		if (!allValues[param]) {
			return true;
		}

		return value === allValues[param];
	},
};

function parseValidationString(validationString) {
	return validationString.split('|').map((rule) => {
		const [name, param] = rule.split(':');
		return { name, param };
	});
}

export default function useFormValidation(validationSchema) {
	const [errors, setErrors] = useState({});

	const getErrorMessage = (field, ruleName, param) => {
		const fieldSchema = validationSchema[field];
		const customMessage = fieldSchema?.messages?.[ruleName];

		if (customMessage) return customMessage;

		const defaultMsg = defaultMessages[ruleName];
		return typeof defaultMsg === 'function' ? defaultMsg(param) : defaultMsg;
	};

	const validateField = (field, value, values) => {
		const newErrors = {};
		let transformedErrors = { ...errors };

		const fieldRule = validationSchema[field];

		if (!fieldRule || !fieldRule.validation) return false;

		const parsedRules = parseValidationString(fieldRule.validation);

		for (let { name: ruleName, param } of parsedRules) {
			const validator = validators[ruleName];

			if (validator) {
				const isValid = validator(value, param, values);

				if (!isValid) {
					const error = getErrorMessage(field, ruleName, param);
					newErrors[field] = newErrors[field] || [];
					newErrors[field].push({ [ruleName]: error });
				} else if (ruleName === 'match' && param) {
					// Clean up previous 'match' errors on the referenced param field
					const matchErrors = transformedErrors[param];

					if (Array.isArray(matchErrors)) {
						const filtered = matchErrors.filter(
							(errorObj) => !errorObj.hasOwnProperty('match'),
						);

						if (filtered.length > 0) {
							transformedErrors[param] = filtered;
						} else {
							delete transformedErrors[param];
						}
					}
				}
			}
		}

		const isValidField = Object.keys(newErrors).length === 0;

		if (isValidField) {
			delete transformedErrors[field];
		} else {
			transformedErrors = { ...errors, ...newErrors };
		}

		const isValidForm = Object.keys(transformedErrors).length === 0;

		setErrors({ ...transformedErrors });

		return { isValidField, isValidForm };
	};

	const isValid = Object.keys(errors).length === 0;

	const clearErrors = () => setErrors({});

	return {
		errors,
		validateField,
		clearErrors,
		isValid,
	};
}
