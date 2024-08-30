import db from "$lib/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const ideaSchema = z.object({
	title: z.string().trim().min(5, { message: "title is too short" }),
	description: z
		.string()
		.trim()
		.min(10, { message: "description is too short" }),
	userId: z
		.string({ required_error: "userId is required" })
		.min(6, "userId is too short"),
});

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	// @ts-ignore
	if (!locals.user) {
		redirect(307, "/");
	}

	// @ts-ignore
	return { user: locals.user };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());

		const { data, error, success } = ideaSchema.safeParse({
			...form,
			// @ts-ignore
			userId: locals.user.id,
		});

		if (!success) {
			const errors = error.flatten().fieldErrors;
			return fail(400, { message: Object.values(errors).flat()[0] });
		}

		try {
			await db.idea.create({
				data: {
					title: data.title,
					description: data.description,
					userId: data.userId,
				},
			});
		} catch (/** @type {*} */ _e) {
			console.log("ERROR:", _e.message);
			return fail(400, { message: _e.message });
		}

		redirect(307, "/ideas");
	},
};
