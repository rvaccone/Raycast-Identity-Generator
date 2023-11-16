import {
	getPreferenceValues,
	closeMainWindow,
	showHUD,
	showInFinder,
} from "@raycast/api";
import axios from "axios";
import fs from "fs";

interface Preferences {
	PictureLocation: string;
	PictureName: string;
	OverwriteProfilePicture: boolean;
}

export default async function Command() {
	try {
		await closeMainWindow();
		const { PictureLocation, PictureName } =
			getPreferenceValues<Preferences>();
		const response = await axios({
			url: "https://thispersondoesnotexist.com/",
			method: "GET",
			responseType: "stream",
		});
		const filePath = PictureLocation + `/${PictureName}.png`;
		response.data.pipe(fs.createWriteStream(filePath));
		showInFinder(filePath);
		showHUD("Profile picture downloaded to " + PictureLocation);
	} catch (e) {
		console.error(String(e));
	}
}
