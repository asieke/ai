import { getMessages } from '$lib/slack/';

export async function GET({ request }) {
	console.log(request.url);
	const data = await getMessages();
	return new Response(JSON.stringify(data));
}
