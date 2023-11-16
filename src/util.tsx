import { getPreferenceValues, Clipboard, showHUD } from "@raycast/api";

interface Preferences {
	primaryAction: "copy" | "paste" | "both";
}

export const primaryAction = async (content: string) => {
	try {
		const { primaryAction } = getPreferenceValues<Preferences>();
		const actionMessage = {
			copy: `Copied ${content} to clipboard`,
			paste: `Pasted ${content} to active app`,
			both: `Copied and pasted ${content}`,
		};
		if (primaryAction !== "copy") await Clipboard.paste(content);
		if (primaryAction !== "paste") await Clipboard.copy(content);
		showHUD(actionMessage[primaryAction]);
	} catch (e) {
		console.error(String(e));
	}
};

export const toTitleCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
