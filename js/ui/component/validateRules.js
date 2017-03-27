import validate from 'validate.js';

export const constraints = {
	name: {
		presence: true,
		format: {
			pattern: '[A-Za-z ]+',
			message: value => validate.format('^%{num} is not allowed. name can only contain letters.', {
				num: value,
			}),
		},
	},

	phone: {
		presence: true,
		format: {
			pattern: '^[0-9 +]+$',
			message: value => validate.format('^%{num} is not a valid phone number. Ex:+60 17655XXXX', {
				num: value,
			}),
		},
		length: {
			minimum: 5,
			tooShort: 'is too short',
		},
	},

	sixDigitPIN: {
		presence: { message: '^PIN is required' },
		format: {
			pattern: '^[0-9]{6}$',
			message: '^PIN must be 6 numerical digits.',
		},
	},

	fourDigitPIN: {
		presence: { message: '^Fin Code is required' },
		format: {
			pattern: '^[0-9]{4}$',
			message: '^Fin Code must be 4 numerical digits',
		},
	},
	postcode: {
		presence: true,
		format: {
			pattern: '^[0-9]{4,10}$',
			message: 'must be 4-10 numerical degits.',
		},
	},

	address: {
		presence: true,
		length: {
			minimum: 3,
			message: 'is too short',
		},
	},

	city: {
		presence: true,
		length: {
			minimum: 3,
			message: 'is too short',
		},
	},

	state: {
		presence: true,
		length: {
			minimum: 3,
			message: 'is too short',
		},
	},

	country: {
		presence: true,
		length: {
			minimum: 2,
			message: 'is too short',
		},
	},

	price: {
		presence: true,
		length: {
			minimum: 1,
			message: 'must be at least RM 5',
		},
	},
	email: {
		presence: true,
		email: {
			message: "doesn't look like a valid email.",
		},
	},

};
