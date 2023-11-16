import { getPreferenceValues, closeMainWindow } from "@raycast/api";
import { faker } from "@faker-js/faker";
import { primaryAction, toTitleCase } from "./util";

interface Preferences {
	gender: "mixture" | "female" | "male";
}

export default async function Command() {
	try {
		await closeMainWindow();
		const { gender } = getPreferenceValues<Preferences>();
		let fakerGender = gender === "mixture" ? undefined : gender;
		const fullName = toTitleCase(
			faker.person.firstName(fakerGender) + " " + faker.person.lastName()
		);
		await primaryAction(fullName);
	} catch (e) {
		console.error(String(e));
	}
}
