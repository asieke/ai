import { getHistoricalMarketCap } from '$lib/eod';

export const GET = async ({ params }) => {
	const symbol = params.slug;

	console.log(`Fetching historical market cap for symbol: ${symbol}`);
	const data = await getHistoricalMarketCap(symbol);
	return new Response(JSON.stringify(data));
};
