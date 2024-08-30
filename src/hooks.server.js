import { JWT_SECRET_KEY } from "$env/static/private";
import jwt from "jsonwebtoken";

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get("user");

	if (!token) {
		return await resolve(event);
	}

	try {
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		// @ts-ignore
		event.locals.user = payload;
	} catch (_e) {
		console.log(_e);
		return await resolve(event);
	}

	return await resolve(event);
};
