export interface Users {
	[key: string]: string;
}

export interface Out {
	text: string;
	user: string;
	attachments: string[];
	timestamp: string;
	chars: number;
}

export const users: Users = {
	U02G0MYNY: 'Sam Dodson',
	U02G798BA: 'Alex Sieke',
	U02G8Q66U: 'Schuyler Laird',
	U02G8SNVD: 'Erik Anderson',
	U02GDKVGQ: 'Solon Aposhian',
	U04F8D1R0V7: 'Ava'
};

//write a function that takes a string, if it finds the pattern <@USER_ID> replace it with users[USER_ID]
export const replaceUserIDs = (text: string) => {
	const matches = text.match(/<@.*?>/g);
	if (matches) {
		for (let i = 0; i < matches.length; i++) {
			const userID = matches[i].replace(/<|@|>/g, '');
			const name = users[userID];
			text = text.replace(matches[i], name);
		}
	}
	return text;
};

//trim any newlines from the beginning or end of a string, but not the middle of the string
export const stripNewLines = (text: string) => {
	return text.replace(/^\n+|\n+$/g, '');
};

//write a function to convert a timestamp to a date
export const timestampToDate = (timestamp: string) => {
	const date = new Date(parseFloat(timestamp) * 1000);
	return date.toLocaleString();
};

// Convert the messages array into a string

export const messagesToString = (messages: Out[]) => {
	const str = messages
		.map((message) => {
			const { text, user, attachments, timestamp } = message;
			const attachmentStr = attachments.length > 0 ? '\nAttachments:' + attachments.join('\n') : '';
			return `[${timestamp}] (${user}): ${text}${attachmentStr}`;
		})
		.join('\n');

	return str;
};
