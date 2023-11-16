import { closeMainWindow } from "@raycast/api";
import { faker } from "@faker-js/faker";
import { primaryAction, toTitleCase } from "./util";

export default async function Command() {
	try {
		await closeMainWindow();
		let delimiter = ["", "-", "_"][faker.number.int({ min: 0, max: 2 })];
		const username =
			(faker.number.int({ min: 0, max: 1 })
				? toTitleCase(faker.word.adverb()) + delimiter
				: "") +
			toTitleCase(faker.word.adjective()) +
			delimiter +
			toTitleCase(faker.word.noun()) +
			faker.number.int({ min: 10, max: 999 });
		await primaryAction(username);
	} catch (e) {
		console.error(String(e));
	}
}
