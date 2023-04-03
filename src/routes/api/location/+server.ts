export async function GET({ request }) {
	const location = request.headers.get('x-vercel-ip-city') || 'world';

	return new Response(JSON.stringify({ data: `Hello ${location}` }));
}
