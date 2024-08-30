import db from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";

const loginSchema = z.object({
	email: z.string().email().trim(),
	password: z
		.string()
		.min(4, { message: "password must be 4 or more characters" }),
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(await request.formData());

		// validate the incoming data
		const { data, error, success } = loginSchema.safeParse(form);
		if (!success) {
			const errors = error.flatten().fieldErrors;
			return fail(400, { message: Object.values(errors)[0] });
		}

		// check if the user exists in the database
		const user = await db.user.findUnique({
			where: { email: data.email },
		});

		try {
			// if no user found or password does not match then return error message
			if (!user || !(await bcrypt.compare(data.password, user.password))) {
				return fail(400, { message: "Invalid username or password!!" });
			}

			const payload = jwt.sign(
				{ id: user.id, email: user.email, name: user.name },
				JWT_SECRET_KEY,
			);

			cookies.set("user", payload, { path: "/", secure: true });
		} catch (_e) {
			// @ts-ignore
			return fail(400, { message: _e.message });
		}

		redirect(307, "/ideas");
	},
};
