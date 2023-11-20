import { check } from 'express-validator';

export let readId;

export const setReadId = (val) => {
	readId = val;
};

// Helper function for common string field validations that are mandatory

export const stringValidation = (
	field,
	fieldName,
	length = 255,
	minLength = 0
) => [
	check(field)
		.isString()
		.withMessage(`${fieldName} must be a non empty string!`)
		.trim()
		.notEmpty()
		.withMessage(`${fieldName} must be a non empty string!`)
		.isLength({ max: length, min: minLength })
		.withMessage(`${fieldName} cannot exceed ${length} characters!`),
];

// Helper function for common string field validations (convert number to  stirng first) that are optional

export const opNtoStringValidation = (field, fieldName, length = 255) => [
	check(field)
		.optional()
		.trim()
		.isString()
		.withMessage(`${fieldName} must be a string!`)
		.isLength({ max: length })
		.withMessage(`${fieldName} cannot exceed ${length} characters!`),
];

// Helper function for common string field validations that are optional

export const opStringValidation = (field, fieldName, length = 255) => [
	check(field)
		.optional()
		.isString()
		.withMessage(`${fieldName} must be a string!`)
		.trim()
		.isLength({ max: length })
		.withMessage(`${fieldName} cannot exceed ${length} characters!`),
];

// Helper function for common alphabetic string field validations that are mandatory

export const alphaStringValidation = (field, fieldName, length = 255) => [
	check(field)
		.isString()
		.withMessage(`${fieldName} must be a string!`)
		.trim()
		.notEmpty()
		.isLength({ max: length })
		.withMessage(`${fieldName} cannot exceed ${length} characters!`)
		// .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/).withMessage(`${fieldName} must contain characters!`),
		.matches(/^[A-Za-z\s]+$/)
		.withMessage(`${fieldName} can only contain alphabetic characters!`),
];

// Helper function for common alphabetic string field validations that are optional

export const opAlphaStringValidation = (field, fieldNmae, length = 255) => [
	check(field)
		.optional()
		.isString()
		.withMessage(`${fieldNmae} must be a string!`)
		.trim()
		.isLength({ max: length })
		.withMessage(`${fieldNmae} cannot exceed ${length} characters!`)
		// .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/).withMessage(`${fieldNmae} must contain characters!`),
		.matches(/^[A-Za-z\s]+$/)
		.withMessage(`${fieldNmae} can only contain alphabetic characters!`),
];

// Hleper finction for only numeric string validation that is mandetory

export const numStringValidation = (field, fieldName, length = 255) => [
	check(field)
		.isString()
		.withMessage(`${fieldName} must be a string!`)
		.trim()
		.notEmpty()
		.isLength({ max: length })
		.withMessage(`${fieldName} cannot exceed ${length} characters!`)
		.matches(/^\d+$/)
		.withMessage(`${fieldName} can only be a numeric string!`),
];

// Hleper finction for only numeric string validation

export const opNumStringValidation = (field, fieldName, length = 255) => [
	check(field)
		.isString()
		.withMessage(`${fieldName} must be a string!`)
		.trim()
		.optional()
		.isLength({ max: length })
		.withMessage(`${fieldName} cannot exceed ${length} characters!`)
		.matches(/^\d+$/)
		.withMessage(`${fieldName} can only be a numeric string!`),
];

// Helper function for common alphaNumeric string field validations that are mandatory

export const alphaNumStringValidation = (field, fieldName, length = 255) => [
	check(field)
		.isString()
		.withMessage(`${fieldName} must be a string!`)
		.trim()
		.notEmpty()
		.isLength({ max: length })
		.withMessage(`${fieldName} cannot exceed 255 characters!`)
		.matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/)
		.withMessage(`${fieldName} must contain characters!`),
];

// Helper function for common alphaNumeric string field validations that are optional

export const opAlphaNumStringValidation = (field, fieldNmae, length = 255) => [
	check(field)
		.optional()
		.isString()
		.withMessage(`${fieldNmae} must be a string!`)
		.trim()
		.isLength({ max: length })
		.withMessage(`${fieldNmae} cannot exceed 255 characters!`)
		.matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/)
		.withMessage(`${fieldNmae} must contain characters!`),
];

// Helper function for numeric field validations that are mandatory

export const numericValidation = (
	field,
	fieldName,
	maxDigits = 100,
	maxValue = 9999999999,
	minValue = 0
) => [
	check(field)
		.trim()
		.notEmpty()
		.isNumeric()
		.withMessage(`${fieldName} must be numeric!`)
		.isFloat({ min: minValue, max: maxValue })
		.withMessage(`${fieldName} has invalid value`)
		.isLength({ max: maxDigits })
		.withMessage(`${fieldName} can not exceed ${maxDigits} digits!`),
];

// Helper function for numeric field validations that are optional

export const opNumericValidation = (
	field,
	fieldName,
	maxDigits = 100,
	maxValue = 99999999999999,
	minValue = 0
) => [
	check(field)
		.trim()
		.optional()
		.isNumeric({ max: maxValue })
		.withMessage(`${fieldName} must be numeric!`)
		.isFloat({ min: minValue, max: maxValue })
		.withMessage(`${fieldName} has invalid value`)
		.isLength({ max: maxDigits })
		.withMessage(`${fieldName} can not exceed ${maxDigits} digits!`),
];

// Helper function for validating a mandatory object field

export const objectValidation = (field, fieldName) => [
	check(field)
		.notEmpty()
		.isObject()
		.withMessage(`${fieldName} must be a non empty object!`),
];

// Helper function for validating an optional object field

export const opObjectValidation = (field, fieldName) => [
	check(field)
		.optional()
		.isObject()
		.withMessage(`${fieldName} must be an object!`),
];

// Helper function for validating a mandatory arrayfield

export const arrayValidation = (field, fieldName) => [
	check(field)
		.notEmpty()
		.isArray({ min: 1 })
		.withMessage(`${fieldName} must be a non empty array!`),
];

// Helper function for validating an arrayfield

export const opArrayValidation = (field, fieldName) => [
	check(field)
		.optional()
		.isArray()
		.withMessage(`${fieldName} must be an array!`),
];

// Helper function for validating a mandatory email

export const emailValidation = (field, fieldName) => [
	check(field)
		.notEmpty()
		.isEmail()
		.withMessage(`${fieldName} must be a valid email address!`)
		.trim(),
];

// Helper function for validating an email

export const opEmailValidation = (field, fieldName) => [
	check(field)
		.optional()
		.isEmail()
		.withMessage(`${fieldName} must be a valid email address!`)
		.trim(),
];

// Helper function for validating a mandatory datefield

export const dateValidation = (field, fieldName, range = null) => [
	check(field)
		.notEmpty()
		.isDate()
		.withMessage(`${fieldName} must be a valid Date!`),
];

// Helper function for validating an optional datefield

export const opDateValidation = (field, fieldName, range = null) => [
	check(field)
		.optional()
		.isDate()
		.withMessage(`${fieldName} must be a valid Date!`),
];

// Helper function for validating a mandatory date-time field

export const dateTimeValidation = (field, fieldName, range = null) => [
	check(field)
		.notEmpty()
		.matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
		.withMessage(
			`${fieldName} must be a valid datetime in 'YYYY-MM-DD HH:mm:ss' format!`
		),
];

// Helper function for validating an optional date-time field

export const opDateTimeValidation = (field, fieldName, range = null) => [
	check(field)
		.optional()
		.matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
		.withMessage(
			`${fieldName} must be a valid datetime in 'YYYY-MM-DD HH:mm:ss' format!`
		),
];

// Validation chain for invoice_items.*.item_id
export const itemIDValidationChain = [
	check('invoice_items.*.item_id')
		.trim()
		.notEmpty()
		.withMessage('Item id of every invoice item is required!')
		.isNumeric()
		.withMessage('Item id of every invoice item must be numeric!'),
];

// Validation chain for invoice_items.*.quantity
export const quantityValidationChain = [
	check('invoice_items.*.quantity')
		.trim()
		.notEmpty()
		.withMessage('Item quantity of every invoice item is required!')
		.isNumeric()
		.withMessage('Item quantity values must be numeric!'),
];

export const isRead = (field) => [
	check(field).custom((value) => {
		value = value.map((value) => parseInt(value));
		if (value.length > 0 && !value.includes(readId)) {
			throw new Error(`View is required to perform any other operation!`);
		}
		return true;
	}),
];
