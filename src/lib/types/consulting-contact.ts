export type ContactFormValues = {
	projectType: string;
	name: string;
	email: string;
	message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues | 'form', string>>;

export type ContactFormState = {
	success: boolean;
	message: string;
	errors?: ContactFormErrors;
	values?: ContactFormValues;
};
