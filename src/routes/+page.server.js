import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	logout: ({ cookies }) => {
		cookies.delete("user", { path: "/" });
		redirect(307, "/ideas");
	},
};
