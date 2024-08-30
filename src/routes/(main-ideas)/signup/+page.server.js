import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "$env/static/private";
import db from "$lib/prisma";

const signupSchema = z.object({
	name: z.string().trim().min(2, { message: "name is too short" }),
	email: z.string().email(),
	password: z
		.string()
		.min(4, { message: "password must be 4 or more characters" }),
});

/** @type {import("./$types").Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(await request.formData());

		// validate the input data
		const { data, error, success } = signupSchema.safeParse(form);
		if (!success) {
			const errors = error.flatten().fieldErrors;
			return fail(400, { message: Object.values(errors)[0] });
		}

		try {
			// check if the user exists in the database
			const emailExists = await db.user.findUnique({
				where: { email: data.email },
			});
			if (emailExists) {
				return fail(400, { message: "email already taken!!" });
			}
		} catch (_e) {
			console.log(_e);
			// @ts-ignore
			return fail(500, { message: _e.message });
		}

		try {
			const hashedPassword = await bcrypt.hash(data.password, 12);

			const user = await db.user.create({
				data: {
					name: data.name,
					email: data.email,
					password: hashedPassword,
				},
				// omit: {
				// 	password: true,
				// },
			});

			// JWT the user info
			const payload = jwt.sign(user, JWT_SECRET_KEY);

			cookies.set("user", payload, { path: "/", secure: true });
		} catch (_e) {
			// @ts-ignore
			console.log(_e.message);
			// @ts-ignore
			return fail(400, { message: _e.message });
		}

		redirect(307, "/");
	},
};
