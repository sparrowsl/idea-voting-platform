import db from "$lib/prisma.js";
import { error, fail } from "@sveltejs/kit";

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
	idea.votersId = idea.votersId.split(",");

	// @ts-ignore
	return { user: locals.user, idea };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals, params }) => {
		const idea = await db.idea.findUnique({
			where: { id: params.id },
		});

		/** @type {string[]} */
		let voters = [];

		if (idea?.votersId) {
			const splitted = idea?.votersId.split(",");

			voters = voters.concat(splitted);
		}

		voters.push(locals.user?.id);

		try {
			const updated = await db.idea.update({
				where: { id: params.id },
				data: {
					votersId: voters.join(","),
					votes: Number(idea?.votes) + 1,
				},
			});
		} catch (/** @type {*} */ _e) {
			console.log(_e);
			return fail(400, { message: _e.message });
		}
	},
};
