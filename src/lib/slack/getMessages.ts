import { SLACK_BOT_KEY } from '$env/static/private';
import axios from 'axios';

import {
	users,
	replaceUserIDs,
	stripNewLines,
	timestampToDate,
	messagesToString
} from './functions';
import type { Out } from './functions';

export const getMessages = async (channel = 'C04E7U76C8L') => {
	const res = await axios.get(
		`https://slack.com/api/conversations.history?channel=${channel}&limit=30&pretty=1`,
		{
			headers: {
				Authorization: 'Bearer ' + SLACK_BOT_KEY
			}
		}
	);

	const out: Out[] = [];
	let totalChars = 0;

	for (let i = 0; i < res.data.messages.length; i++) {
		//set a variable called text that replaces ``` with nothing
		const text = stripNewLines(replaceUserIDs(res.data.messages[i].text.replace(/```/g, '')));
		const user = users[res.data.messages[i].user];
		let attachments = [];
		const timestamp = timestampToDate(res.data.messages[i].ts);
		if (res.data.messages[i].attachments) {
			attachments = res.data.messages[i].attachments.map((attachment) => attachment.text || '');
		}

		//write a reducer function that sums the characters in attachments
		const chars =
			attachments.reduce((acc: number, cur: string) => acc + cur?.length || 0, 0) +
			text.length +
			user.length +
			timestamp.length;

		totalChars += chars;

		if (totalChars < 4096) {
			out.unshift({ text, user, attachments, timestamp, chars });
		} else {
			break;
		}
	}

	return { data: out, text: messagesToString(out) };
};
