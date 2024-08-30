import db from "$lib/prisma.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const ideas = await db.idea.findMany({
		orderBy: {
			id: "desc",
		},
	});

	return { ideas, user: locals.user };
}
