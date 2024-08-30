import { invalidateAll } from "$app/navigation";
import db from "$lib/prisma.js";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const idea = await db.idea.findUnique({
		where: { id: params.id },
		include: { user: true },
	});

	if (!idea) {
		error(404, { message: "Idea does not exists anymore" });
	}

	// @ts-ignore
	return { user: locals.user, idea };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals, params }) => {
		const idea = await db.idea.findUnique({
			where: { id: params.id },
		});

		const updated = await db.idea.update({
			where: { id: params.id },
			data: {
				votes: Number(idea?.votes) + 1,
			},
		});
	},
};
