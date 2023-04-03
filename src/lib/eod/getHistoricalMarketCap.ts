import { EOD_HISTORICAL_KEY } from '$env/static/private';

export const getHistoricalMarketCap = async (symbol: string) => {
	const priceURL = `https://eodhistoricaldata.com/api/eod/${symbol}.US?api_token=${EOD_HISTORICAL_KEY}&fmt=json`;
	const marketCapURL = `https://eodhistoricaldata.com/api/historical-market-cap/${symbol}?api_token=${EOD_HISTORICAL_KEY}&fmt=json`;

	const [priceResponse, marketCapResponse] = await Promise.all([
		fetch(priceURL),
		fetch(marketCapURL)
	]);

	const [priceJSON, marketCapJSON] = await Promise.all([
		priceResponse.json(),
		marketCapResponse.json()
	]);

	const marketCapData = {};
	Object.keys(marketCapJSON).forEach((k) => {
		console.log(marketCapJSON[k].date, marketCapJSON[k].value);
		marketCapData[marketCapJSON[k].date] = marketCapJSON[k].value;
	});

	const priceData = priceJSON.reverse().map((d) => ({
		date: d.date,
		shares: null,
		ratio: null,
		price: d.adjusted_close
	}));

	priceData.forEach((x, i) => {
		if (marketCapData[x.date]) {
			priceData[i].shares = marketCapData[x.date] / x.price;
			priceData[i].ratio = x.price / marketCapData[x.date];
		}
	});

	return {
		priceJSON,
		marketCapJSON,
		priceData,
		marketCapData
	};
};
