import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { consultingSite } from '$lib/content/consulting-prototype';
import type { ContactFormErrors, ContactFormState, ContactFormValues } from '$lib/types/consulting-contact';
import type { Actions } from './$types';

const projectTypes = new Set<string>(consultingSite.finalCta.options);

function readField(data: FormData, key: string, maxLength: number) {
	const value = data.get(key);
	return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validate(values: ContactFormValues) {
	const errors: ContactFormErrors = {};
	if (!projectTypes.has(values.projectType)) errors.projectType = 'Choose the closest project type.';
	if (values.name.length < 2) errors.name = 'Enter your name.';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
	if (values.message.length < 10) errors.message = 'Tell us a little about what exists today.';
	return errors;
}

export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		const values: ContactFormValues = {
			projectType: readField(data, 'projectType', 80),
			name: readField(data, 'name', 100),
			email: readField(data, 'email', 254),
			message: readField(data, 'message', 4000)
		};

		if (readField(data, 'company', 200)) {
			return fail(400, {
				success: false,
				message: `We could not send that form. Email ${consultingSite.contactEmail} instead.`,
				errors: { form: 'Submission rejected.' },
				values
			} satisfies ContactFormState);
		}

		const errors = validate(values);
		if (Object.keys(errors).length) {
			return fail(400, {
				success: false,
				message: 'Check the highlighted fields and try again.',
				errors,
				values
			} satisfies ContactFormState);
		}

		const apiKey = env.RESEND_API_KEY?.trim();
		const from = env.LCG_CONTACT_FROM?.trim();
		const to = env.LCG_CONTACT_TO?.trim() || consultingSite.contactEmail;
		if (!apiKey || !from) {
			return fail(503, {
				success: false,
				message: `The form is not connected in this preview yet. Email ${consultingSite.contactEmail} instead.`,
				errors: { form: 'Email delivery is not configured.' },
				values
			} satisfies ContactFormState);
		}

		try {
			const resend = new Resend(apiKey);
			const { error } = await resend.emails.send({
				from,
				to: [to],
				replyTo: values.email,
				subject: `${values.projectType} inquiry from ${values.name} | Lutz Consulting Group`,
				text: [
					'New Lutz Consulting Group project inquiry',
					'',
					`Project type: ${values.projectType}`,
					`Name: ${values.name}`,
					`Email: ${values.email}`,
					'',
					values.message
				].join('\n')
			});

			if (error) {
				console.error('Contact form email failed:', error.name ?? 'unknown Resend error');
				return fail(502, {
					success: false,
					message: `The message did not send. Email ${consultingSite.contactEmail} instead.`,
					errors: { form: 'Email delivery failed.' },
					values
				} satisfies ContactFormState);
			}
		} catch (error) {
			console.error('Contact form email failed:', error instanceof Error ? error.name : 'unknown error');
			return fail(502, {
				success: false,
				message: `The message did not send. Email ${consultingSite.contactEmail} instead.`,
				errors: { form: 'Email delivery failed.' },
				values
			} satisfies ContactFormState);
		}

		return {
			success: true,
			message: 'Thanks. Your project brief was sent. We’ll reply by email.'
		} satisfies ContactFormState;
	}
} satisfies Actions;
