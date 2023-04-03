import { OPENAI_API_KEY } from '$env/static/private';

interface Arguments {
	model?: string;
	prompt: string;
	initialContext?: string;
	stream?: boolean;
}

export const getChatCompletion = async ({
	model = 'gpt-3.5-turbo-0301',
	prompt,
	initialContext = 'You are a helpful assistant.',
	stream = false
}: Arguments) => {
	// Send the initial message to the OpenAI API

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_API_KEY}`
		},
		body: JSON.stringify({
			model: model,
			stream: stream,
			messages: [
				{ role: 'system', content: initialContext },
				{ role: 'user', content: prompt }
			]
		})
	});

	return response.json();
};
